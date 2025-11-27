import * as signalR from "@microsoft/signalr";

let connection = null;
let leaderboardHandler = null;

export function createConnection(token) {
  if (connection && connection.state !== signalR.HubConnectionState.Disconnected) {
    return connection;
  }

  connection = new signalR.HubConnectionBuilder()
    .withUrl(`${import.meta.env.VITE_HUB_URL}/hub/notificaciones?access_token=${token}`, {
      transport: signalR.HttpTransportType.WebSockets,
    })
    .withAutomaticReconnect()
    .configureLogging(signalR.LogLevel.Warning)
    .build();

  connection.onclose((error) => {
    console.warn("SignalR connection closed", error);
  });

  return connection;
}

export async function startConnection() {
  if (!connection) throw new Error("Connection not created");

  const state = connection.state;
  console.log("🔍 Estado actual de la conexión:", state);

  if (state !== signalR.HubConnectionState.Disconnected) {
    console.warn("⏳ Conexión ya iniciada o en progreso:", state);
    return;
  }

  try {
    await connection.start();
    console.log("✅ Conexión SignalR iniciada");

    await connection.invoke("UnirseLeaderboard");
    console.log("📡 Cliente unido al grupo leaderboard");
  } catch (err) {
    console.error("❌ Error iniciando SignalR:", err);
    throw err;
  }
}


export function onLeaderboardEvent(handler) {
  if (!connection) throw new Error("Connection not created");

  if (leaderboardHandler) {
    connection.off("LeaderboardEvent", leaderboardHandler);
  }

  leaderboardHandler = handler;
  connection.on("LeaderboardEvent", leaderboardHandler);

  return () => {
    if (connection && leaderboardHandler) {
      connection.off("LeaderboardEvent", leaderboardHandler);
      leaderboardHandler = null;
    }
  };
}

export async function stopConnection() {
  if (!connection) return;

  try {
    if (connection.state === signalR.HubConnectionState.Connected) {
      await connection.invoke("SalirLeaderboard");
    }
    await connection.stop();
  } catch (err) {
    console.warn("Error stopping SignalR connection:", err);
  } finally {
    connection = null;
    leaderboardHandler = null;
  }
}

export function getConnection() {
  return connection;
}

export function isConnected() {
  return connection && connection.state === signalR.HubConnectionState.Connected;
}
