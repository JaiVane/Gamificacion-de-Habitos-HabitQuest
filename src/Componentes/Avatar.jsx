export default function Avatar({ usuario, size = 48 }) {
  if (usuario?.imagenPerfil) {
    return (
      <img
        src={`http://localhost:5050${usuario.imagenPerfil}`}
        alt="Avatar"
        className="avatar-imagen"
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <div className="avatar-letras" style={{ width: size, height: size }}>
      {usuario?.nombre?.slice(0, 2).toUpperCase() || "??"}
    </div>
  );
}
