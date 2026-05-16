<div align="center">

# 🏆 HabitQuest — Plataforma de Gamificación de Hábitos

**Transforma tus hábitos en logros. Gana XP, sube de nivel y mantén rachas mientras construyes los hábitos que siempre quisiste.**

![Version](https://img.shields.io/badge/versión-1.0.0-green?style=flat-square)
![Estado](https://img.shields.io/badge/estado-en%20desarrollo-yellow?style=flat-square)
![Licencia](https://img.shields.io/badge/licencia-MIT-blue?style=flat-square)
![Universidad](https://img.shields.io/badge/UPC-Ingeniería%20de%20Software%20I-darkgreen?style=flat-square)

</div>

---

## 📋 Tabla de Contenidos

- [Descripción](#-descripción)
- [Características](#-características)
- [Tech Stack](#-tech-stack)
- [Arquitectura del Sistema](#-arquitectura-del-sistema)
- [Modelo de Datos](#-modelo-de-datos)
- [Instalación y Configuración](#-instalación-y-configuración)
- [Uso](#-uso)
- [Capturas de Pantalla](#-capturas-de-pantalla)
- [Equipo](#-equipo)
- [Documentación](#-documentación)

---

## 📖 Descripción

**HabitQuest** es una plataforma web interactiva que combina la gestión personal de hábitos con mecánicas de gamificación — niveles, puntos de experiencia (XP), recompensas, rachas y un ranking en tiempo real — para motivar a los usuarios a mantener la constancia en sus metas diarias.

El sistema aplica psicología conductual y gamificación adaptativa para transformar el cumplimiento diario de hábitos en una experiencia divertida, competitiva y gratificante.

> 📌 Proyecto desarrollado como entrega final del curso **Ingeniería de Software I**  
> Universidad Popular del Cesar — Valledupar, Cesar · 2025

---

## ✨ Características

### 👤 Gestión de Usuarios
- Registro e inicio de sesión con autenticación segura (bcrypt)
- Perfil personalizable: imagen, nombre, biografía y rol RPG
- Visualización de estadísticas individuales y progreso acumulado

### 🎯 Gestión de Hábitos
- Creación de hábitos recurrentes con frecuencia diaria, semanal o mensual
- Marcado de hábitos como cumplidos o incumplidos
- Historial de rachas consecutivas y mejor racha personal
- Edición y eliminación de hábitos

### 🎮 Gamificación / RPG
- Sistema de niveles y puntos de experiencia (XP)
- Recompensas desbloqueables: ítems, insignias y logros
- Penalizaciones por incumplimiento de hábitos
- Ranking y tabla de competición en tiempo real entre usuarios

### 📊 Estadísticas y Reportes
- Gráficos de evolución semanal y mensual
- Tasa de éxito, XP promedio, días activos y mejor racha
- Reporte de hábitos más cumplidos y más difíciles de mantener

### 🔔 Notificaciones Internas
- Recordatorios automáticos de hábitos pendientes
- Alertas de racha en peligro
- Notificaciones de logros, niveles y actividad de otros usuarios

### 🏁 Gestión de Metas
- Creación de metas personales con fecha límite
- Seguimiento de progreso por meta
- Categorización por área (salud, estudio, bienestar, etc.)

---

## 🛠 Tech Stack

| Capa | Tecnología |
|------|-----------|
| **Frontend** | React.js |
| **Backend** | ASP.NET Core / API REST |
| **Base de datos** | SQL Server (Entity Framework) |
| **Autenticación** | JWT + bcrypt |
| **Notificaciones** | SignalR (tiempo real) |
| **Arquitectura** | Modelo C4 — MVC + Componentes reutilizables |
| **Control de versiones** | Git + GitHub |
| **Metodología** | Scrum (sprints iterativos) |

---

## 🏗 Arquitectura del Sistema

El sistema fue diseñado y documentado usando el **Modelo C4**, organizando la arquitectura en cuatro niveles de detalle progresivo.

### C1 — Diagrama de Contexto

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│   [Usuario]  ──►  [Plataforma HabitQuest]               │
│                         │                               │
│               ┌─────────┴──────────┐                   │
│               ▼                    ▼                    │
│   [Sistema de Autenticación]  [Sistema de               │
│    Auth · JWT · bcrypt]        Notificaciones]          │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### C2 — Contenedores Principales

| Contenedor | Tecnología | Responsabilidad |
|-----------|-----------|----------------|
| **Frontend (SPA)** | React.js | Interfaz de usuario, navegación, consumo de API |
| **Backend API** | ASP.NET Core | Lógica de negocio, gamificación, endpoints REST |
| **Base de Datos** | SQL Server | Persistencia de usuarios, hábitos, XP, insignias |
| **Auth Service** | JWT + bcrypt | Autenticación, sesiones seguras, cifrado |
| **Notificaciones** | SignalR | Alertas en tiempo real, recordatorios, logros |

### C3 — Componentes del Backend

```
Backend API
├── habitos-controller       → CRUD de hábitos, racha, marcado
├── usuario-controller       → Registro, login, perfil, XP
├── categoria-controller     → Gestión de categorías
├── logros-controller        → Insignias, recompensas, condiciones
├── notificaciones-service   → Envío, lectura, historial
├── estadisticas-service     → Tasas, reportes, rankings
└── autenticacion-controller → JWT, sesiones, encriptación
```

---

## 🗄 Modelo de Datos

Las entidades principales del sistema y sus relaciones:

```
Usuario ──────┬──── Habito ────── Categoria
              │         └──────── RegistroHabito
              ├──── Recompensa
              ├──── Racha
              ├──── Notificacion
              ├──── Estadistica
              └──── Meta ────── HabitoMeta
```

**Tablas principales en SQL Server:**
- `dbo.Usuarios` — Datos de cuenta, nivel, XP, racha
- `dbo.Habito` — Hábitos del usuario con frecuencia y categoría
- `dbo.HabitoLogs` — Historial de cumplimiento diario
- `dbo.Categorias` — Categorías personalizables
- `dbo.Metas` — Objetivos con fecha límite y progreso
- `dbo.RegistroHabito` — Trazabilidad de cada marcado
- `dbo.HabitoMetas` — Relación hábito ↔ meta

---

## 🚀 Instalación y Configuración

### Pre-requisitos

- [Node.js](https://nodejs.org/) v18+
- [.NET SDK](https://dotnet.microsoft.com/) 8.0+
- [SQL Server](https://www.microsoft.com/sql-server) (Express o superior)
- [Git](https://git-scm.com/)

### 1. Clonar el repositorio

```bash
git clone https://github.com/JaiVane/Gamificacion-de-Habitos-HabitQuest.git
cd Gamificacion-de-Habitos-HabitQuest
```

### 2. Configurar la base de datos

```bash
# Abrir SQL Server Management Studio
# Ejecutar el script de creación ubicado en:
/database/HabitosDB_script.sql
```

Actualizar la cadena de conexión en `appsettings.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost\\SQLEXPRESS;Database=HabitosDB;Trusted_Connection=True;"
  }
}
```

### 3. Instalar y ejecutar el Backend

```bash
cd backend
dotnet restore
dotnet ef database update   # aplica migraciones
dotnet run
# API disponible en: http://localhost:5000
```

### 4. Instalar y ejecutar el Frontend

```bash
cd frontend
npm install
npm start
# App disponible en: http://localhost:3000
```

---

## 💻 Uso

1. **Regístrate** con tu correo y contraseña.
2. **Crea tus hábitos** — elige nombre, categoría y frecuencia.
3. **Marca tus hábitos** como cumplidos cada día para ganar XP.
4. **Sube de nivel** acumulando XP y desbloquea insignias automáticamente.
5. **Compite** en el ranking global con otros usuarios.
6. **Revisa tus estadísticas** para identificar patrones y mejorar.

---

## 📸 Capturas de Pantalla

| Panel Principal | Gestión de Hábitos |
|:-:|:-:|
| ![Dashboard](docs/screenshots/dashboard.png) | ![Habits](docs/screenshots/habitos.png) |

| Tabla de Competición | Panel de Estadísticas |
|:-:|:-:|
| ![Ranking](docs/screenshots/ranking.png) | ![Stats](docs/screenshots/estadisticas.png) |

| Panel de Logros | Perfil de Usuario |
|:-:|:-:|
| ![Logros](docs/screenshots/logros.png) | ![Perfil](docs/screenshots/perfil.png) |

> 📁 Agrega las imágenes en la carpeta `docs/screenshots/` para que se visualicen.

---

## 👥 Equipo

| Integrante | Rol | GitHub |
|-----------|-----|--------|
| **Jaider David Vanegas Peña** | Desarrollador Full Stack | [@JaiVane](https://github.com/JaiVane) |
| **Vallery Miranda** | Desarrolladora Full Stack | [@Vallery30](https://github.com/Vallery30) |
| **Johan Briñez** | Desarrollador Backend | — |

**Docente:** Ing. Jhon Jairo Patiño Vanegas  
**Materia:** Ingeniería de Software I — Universidad Popular del Cesar

---

## 📚 Documentación

| Documento | Descripción |
|-----------|-------------|
| 📄 [Documentación del Sistema](docs/DOCUMENTACION_HABIQUEST.pdf) | Arquitectura C4, modelo de datos, requisitos funcionales y no funcionales |
| 📖 [Manual de Usuario](https://github.com/Vallery30/INGENERIA-DE-SOFTWARE---PROYECTOHABIQUEST/blob/main/Manual%20de%20usuario%20Habiquest.pdf) | Guía completa de uso de la plataforma |
| 🔗 [Repositorio de documentación](https://github.com/Vallery30/INGENERIA-DE-SOFTWARE---PROYECTOHABIQUEST) | Repo del equipo con documentación adicional |

---

## 📄 Licencia

Este proyecto fue desarrollado con fines académicos en la Universidad Popular del Cesar.  
Distribuido bajo licencia [MIT](LICENSE).

---

<div align="center">

**HabitQuest** — *"La disciplina es el puente entre metas y logros."*

⭐ Si este proyecto te parece útil, considera darle una estrella en GitHub.

</div>
