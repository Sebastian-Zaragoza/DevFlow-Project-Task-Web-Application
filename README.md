DEVFLOW - Project & Task Management System

DESCRIPCIÓN:
DevFlow es una aplicación web full-stack para la gestión colaborativa de proyectos y tareas. Cuenta con frontend en React (v18) y TypeScript, y backend en Node.js con Express y MongoDB, usando Mongoose para modelado de datos.

ESTRUCTURA DEL PROYECTO:
DevFlow/
├── ProjectAndTaskManager-Backend/
│   ├── src/
│   │   ├── config/ (cors.ts, db.ts, nodemailer.ts)
│   │   ├── controllers/ (authController.ts, projectController.ts, taskController.ts)
│   │   ├── emails/ (authEmails.ts)
│   │   ├── middleware/ (auth.ts, projects.ts, task.ts, validation.ts)
│   │   ├── models/ (project.ts, tasks.ts, token.ts, user.ts)
│   │   ├── routes/ (authRoutes.ts, projectRoutes.ts)
│   │   ├── utils/ (auth.ts, jwt.ts, token.ts)
│   │   ├── index.ts
│   │   └── server.ts
│   ├── .env
│   ├── package.json
│   └── tsconfig.json
├── ProjectAndTaskManager-Frontend/
│   └── ProjectAndTaskManagerFrontEnd/
│       ├── public/ (Logo.png)
│       ├── src/
│       │   ├── api/ (AuthApi.ts, ProjectApi.ts, TaskApi.ts)
│       │   ├── components/ (auth/, projects/, tasks/)
│       │   ├── hooks/ (useAuth.ts)
│       │   ├── layouts/ (AppLayout.tsx, AuthLayout.tsx)
│       │   ├── lib/ (axios.ts)
│       │   ├── types/ (auth.ts, index.ts)
│       │   ├── utils/ (utils.ts)
│       │   ├── views/ (auth/, projects/)
│       │   ├── main.tsx
│       │   ├── router.tsx
│       │   └── index.css
│       ├── .env.local
│       └── vite.config.ts
├── .gitignore
└── README.md

TECH STACK:
Frontend: React 18, TypeScript citeturn3search1
Backend: Node.js, Express citeturn5search0
Base de datos: MongoDB citeturn6search1
ODM: Mongoose citeturn7search0
Autenticación: JWT (RFC 7519) citeturn8search1
Hashing de contraseñas: bcrypt citeturn9search10
HTTP: Axios citeturn10search0
Validación: Zod citeturn11search0

CARACTERÍSTICAS:
- Registro e inicio de sesión de usuarios con verificación por email.
- CRUD de proyectos y tareas, con asignación a usuarios.
- Validación de datos en backend con Zod citeturn11search0.
- Envío de emails mediante nodemailer.
- Rutas protegidas con JWT citeturn8search1.

VARIABLES DE ENTORNO:
Backend (.env):
- PORT
- MONGO_URI
- JWT_SECRET
- EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS
Frontend (.env.local):
- VITE_API_BASE_URL

INSTALACIÓN:
1. Clonar repositorio:
   git clone https://github.com/Sebastian-Zaragoza/DevFlow-Project-Task-Management.git
2. Backend:
   cd ProjectAndTaskManager-Backend
   npm install
   cp .env.example .env
   npm run dev
3. Frontend:
   cd ../ProjectAndTaskManager-Frontend/ProjectAndTaskManagerFrontEnd
   npm install
   npm run dev

USO:
- Accede a http://localhost:5173
- Regístrate y confirma tu email.
- Crea proyectos y tareas, asígnalos y filtra según usuario y estado.

TESTING:
No se han implementado pruebas automatizadas en esta versión.

CONTRIBUCIONES:
- Haz fork y pull request.
- Sigue la convención de commits de tu preferencia.

LICENCIA:
MIT

CONTACTO:
Sebastian Zaragoza - https://github.com/Sebastian-Zaragoza
