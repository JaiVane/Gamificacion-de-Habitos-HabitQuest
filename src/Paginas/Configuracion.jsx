import React, { useState } from "react";
import "../Estilos/stylesPaginas/Configuracion.css";
import {
  Settings,
  Bell,
  Palette,
  Shield,
  Mail,
  Moon,
  Globe,
  Volume2,
} from "lucide-react";

const Configuracion = () => {
  const [tabActivo, setTabActivo] = useState("notificaciones");

  // Estados para Notificaciones
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [dailySummary, setDailySummary] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [habitReminders, setHabitReminders] = useState(true);

  // Apariencia
  const [colorMode, setColorMode] = useState("system");
  const [animations, setAnimations] = useState(true);
  const [language, setLanguage] = useState("es");
  const [soundEffects, setSoundEffects] = useState(true);

  // Privacidad
  const [profilePublic, setProfilePublic] = useState(true);
  const [showStats, setShowStats] = useState(true);
  const [showAchievements, setShowAchievements] = useState(true);

  // Lista de pestañas
  const tabs = [
    { id: "notificaciones", nombre: "Notificaciones", icono: Bell },
    { id: "apariencia", nombre: "Apariencia", icono: Palette },
    { id: "privacidad", nombre: "Privacidad", icono: Shield },
  ];

  // Componente Toggle
  const ToggleSwitch = ({ checked, onChange, disabled = false }) => (
    <label className={`toggle-switch ${disabled ? "disabled" : ""}`}>
      <input type="checkbox" checked={checked} onChange={onChange} disabled={disabled} />
      <span className="slider"></span>
    </label>
  );

  return (
    <div className="pagina-configuracion">
      <div className="configuracion-contenido">
        {/* Encabezado */}
        <div className="configuracion-header">
          <div className="configuracion-titulo">
            <Settings className="icono-config" size={28} />
            <h1>Configuración</h1>
          </div>
          <button className="btn-guardar">Guardar cambios</button>
        </div>

        {/* Subtítulo */}
        <p className="configuracion-subtitulo">
          Personaliza tu experiencia en <span className="marca">HabitQuest</span>
        </p>

        {/* 🔹 Pestañas dinámicas */}
        <div className="configuracion-tabs">
          {tabs.map((tab) => {
            const Icono = tab.icono;
            return (
              <button
                key={tab.id}
                className={`tab ${tabActivo === tab.id ? "active" : ""}`}
                onClick={() => setTabActivo(tab.id)}
              >
                <Icono size={23} />
                <span >{tab.nombre}</span>
              </button>
            );
          })}
        </div>

        {/* Contenido */}
        <div className="configuracion-cuerpo">
          <div className="config-contenido">
            {/* 🔸 Notificaciones */}
            {tabActivo === "notificaciones" && (
              <>
                <div className="config-card">
                  <div className="card-header">
                    <Mail size={24} color="#212121" />
                    <div>
                      <h2 className="card-titulo">Notificaciones por Email</h2>
                      <p className="card-descripcion">
                        Recibe actualizaciones importantes en tu correo electrónico
                      </p>
                    </div>
                  </div>
                  <div className="config-item">
                    <div className="item-info">
                      <label className="item-label">Notificaciones por email</label>
                      <p className="item-descripcion">
                        Recibe emails sobre tus hábitos y logros
                      </p>
                    </div>
                    <ToggleSwitch
                      checked={emailNotifications}
                      onChange={() => setEmailNotifications(!emailNotifications)}
                    />
                  </div>
                  <div className="config-item">
                    <div className="item-info">
                      <label className="item-label">Resumen diario</label>
                      <p className="item-descripcion">
                        Recibe un resumen de tu progreso cada día
                      </p>
                    </div>
                    <ToggleSwitch
                      checked={dailySummary}
                      onChange={() => setDailySummary(!dailySummary)}
                      disabled={!emailNotifications}
                    />
                  </div>
                </div>

                <div className="config-card">
                  <div className="card-header">
                    <Bell size={24} color="#212121" />
                    <div>
                      <h2 className="card-titulo">Notificaciones Push</h2>
                      <p className="card-descripcion">
                        Recibe alertas en tiempo real en tu dispositivo
                      </p>
                    </div>
                  </div>
                  <div className="config-item">
                    <div className="item-info">
                      <label className="item-label">Notificaciones push</label>
                      <p className="item-descripcion">
                        Permitir notificaciones del navegador
                      </p>
                    </div>
                    <ToggleSwitch
                      checked={pushNotifications}
                      onChange={() => setPushNotifications(!pushNotifications)}
                    />
                  </div>
                  <div className="config-item">
                    <div className="item-info">
                      <label className="item-label">Recordatorios de hábitos</label>
                      <p className="item-descripcion">
                        Te recordaremos completar tus hábitos pendientes
                      </p>
                    </div>
                    <ToggleSwitch
                      checked={habitReminders}
                      onChange={() => setHabitReminders(!habitReminders)}
                      disabled={!pushNotifications}
                    />
                  </div>
                </div>
              </>
            )}

            {/* 🔸 Apariencia */}
            {tabActivo === "apariencia" && (
              <>
                <div className="config-card">
                  <div className="card-header">
                    <Moon size={24} color="#212121" />
                    <div>
                      <h2 className="card-titulo">Tema</h2>
                      <p className="card-descripcion">
                        Personaliza la apariencia de la aplicación
                      </p>
                    </div>
                  </div>
                  <div className="config-item">
                    <div className="item-info">
                      <label className="item-label">Modo de color</label>
                      <select
                        className="select-input"
                        value={colorMode}
                        onChange={(e) => setColorMode(e.target.value)}
                      >
                        <option value="light">Claro</option>
                        <option value="dark">Oscuro</option>
                        <option value="system">Sistema</option>
                      </select>
                    </div>
                  </div>
                  <div className="config-item">
                    <div className="item-info">
                      <label className="item-label">Animaciones</label>
                      <p className="item-descripcion">Efectos visuales y transiciones</p>
                    </div>
                    <ToggleSwitch
                      checked={animations}
                      onChange={() => setAnimations(!animations)}
                    />
                  </div>
                </div>

                <div className="config-card">
                  <div className="card-header">
                    <Globe size={24} color="#212121" />
                    <div>
                      <h2 className="card-titulo">Idioma y Región</h2>
                      <p className="card-descripcion">Configura tu idioma preferido</p>
                    </div>
                  </div>
                  <div className="config-item">
                    <div className="item-info">
                      <label className="item-label">Idioma</label>
                      <select
                        className="select-input"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                      >
                        <option value="es">Español</option>
                        <option value="en">English</option>
                        <option value="pt">Português</option>
                        <option value="fr">Français</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="config-card">
                  <div className="card-header">
                    <Volume2 size={24} color="#212121" />
                    <div>
                      <h2 className="card-titulo">Sonido</h2>
                      <p className="card-descripcion">
                        Controla los efectos de sonido de la aplicación
                      </p>
                    </div>
                  </div>
                  <div className="config-item">
                    <div className="item-info">
                      <label className="item-label">Efectos de sonido</label>
                    </div>
                    <ToggleSwitch
                      checked={soundEffects}
                      onChange={() => setSoundEffects(!soundEffects)}
                    />
                  </div>
                </div>
              </>
            )}

            {/* 🔸 Privacidad */}
            {tabActivo === "privacidad" && (
              <>
                <div className="config-card">
                  <div className="card-header">
                    <Shield size={24} color="#212121" />
                    <div>
                      <h2 className="card-titulo">Privacidad del Perfil</h2>
                      <p className="card-descripcion">
                        Controla qué información es visible para otros usuarios
                      </p>
                    </div>
                  </div>
                  <div className="config-item">
                    <div className="item-info">
                      <label className="item-label">Perfil público</label>
                      <p className="item-descripcion">
                        Permitir que otros usuarios vean tu perfil
                      </p>
                    </div>
                    <ToggleSwitch
                      checked={profilePublic}
                      onChange={() => setProfilePublic(!profilePublic)}
                    />
                  </div>
                  <div className="config-item">
                    <div className="item-info">
                      <label className="item-label">Mostrar estadísticas</label>
                      <p className="item-descripcion">
                        Mostrar tu XP, nivel y rachas en el leaderboard
                      </p>
                    </div>
                    <ToggleSwitch
                      checked={showStats}
                      onChange={() => setShowStats(!showStats)}
                      disabled={!profilePublic}
                    />
                  </div>
                  <div className="config-item">
                    <div className="item-info">
                      <label className="item-label">Mostrar logros</label>
                      <p className="item-descripcion">
                        Permitir que otros vean tus logros desbloqueados
                      </p>
                    </div>
                    <ToggleSwitch
                      checked={showAchievements}
                      onChange={() => setShowAchievements(!showAchievements)}
                      disabled={!profilePublic}
                    />
                  </div>
                </div>

                <div className="config-card zona-peligro">
                  <div className="card-header">
                    <div>
                      <h2 className="card-titulo peligro-titulo">Zona de Peligro</h2>
                      <p className="card-descripcion">
                        Acciones permanentes que no se pueden deshacer
                      </p>
                    </div>
                  </div>
                  <button className="boton-reset">Resetear todo el progreso</button>
                  <button className="boton-eliminar">Eliminar cuenta</button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Configuracion;
