🏷️ DEVFLOW - Project & Task Management System

📖 DESCRIPTION
DevFlow es una aplicación web full-stack para la gestión colaborativa de proyectos y tareas en equipos de desarrollo. 
Frontend en React 18 + TypeScript + TailwindCSS, backend en Node.js + Express + MongoDB con Mongoose.

🔑 FEATURES
• 🔐 Registro, login y rutas protegidas con JWT  
• 📧 Confirmación de email y recuperación de contraseña  
• 📁 CRUD de proyectos  
• ✅ CRUD de tareas con asignación a usuarios y seguimiento de estado  
• 🔍 Filtrado de tareas por estado y usuario  
• ⚙️ Validación de datos con Zod  
• 📡 Separación clara entre frontend y backend  
• 📬 Emails transaccionales con Nodemailer  

📂 PROJECT STRUCTURE
DevFlow/
├─ ProjectAndTaskManager-Backend/  
│  ├─ src/  
│  │  ├─ config/ (cors.ts, db.ts, nodemailer.ts)  
│  │  ├─ controllers/ (authController.ts, projectController.ts, taskController.ts)  
│  │  ├─ emails/ (authEmails.ts)  
│  │  ├─ middleware/ (auth.ts, projects.ts, task.ts, validation.ts)  
│  │  ├─ models/ (project.ts, tasks.ts, token.ts, user.ts)  
│  │  ├─ routes/ (authRoutes.ts, projectRoutes.ts, taskRoutes.ts)  
│  │  ├─ utils/ (auth.ts, jwt.ts, token.ts)  
│  │  ├─ index.ts  
│  │  └─ server.ts  
│  ├─ .env  
│  ├─ package.json  
│  └─ tsconfig.json  
│  
├─ ProjectAndTaskManager-Frontend/  
│  └─ ProjectAndTaskManagerFrontEnd/  
│     ├─ public/ (Logo.png)  
│     ├─ src/  
│     │  ├─ api/ (AuthApi.ts, ProjectApi.ts, TaskApi.ts)  
│     │  ├─ components/ (auth/, projects/, tasks/)  
│     │  ├─ hooks/ (useAuth.ts)  
│     │  ├─ layouts/ (AppLayout.tsx, AuthLayout.tsx)  
│     │  ├─ lib/ (axios.ts)  
│     │  ├─ types/ (auth.ts, index.ts)  
│     │  ├─ utils/ (utils.ts)  
│     │  ├─ views/ (auth/, projects/)  
│     │  ├─ main.tsx  
│     │  ├─ router.tsx  
│     │  └─ index.css  
│     ├─ .env.local  
│     └─ vite.config.ts  
│  
├─ .gitignore  
└─ README.md

⚙️ TECH STACK
- Frontend: React 18, TypeScript, TailwindCSS, Vite  
- Backend: Node.js, Express, TypeScript  
- Database: MongoDB, Mongoose  
- Auth: JWT (jsonwebtoken), bcrypt  
- Validation: Zod  
- Emails: Nodemailer  
- HTTP Client: Axios  

🚀 INSTALLATION
1. Clona el repositorio:
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

4. Abre http://localhost:5173 en tu navegador.

🛠️ USAGE
1. Regístrate y confirma tu email.  
2. Crea un proyecto.  
3. Añade y asigna tareas.  
4. Filtra tareas por estado o usuario.  

Ejemplo de cURL:
curl -X POST http://localhost:4000/api/projects \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"name":"Mi Proyecto","description":"Descripción"}'

📄 DOCUMENTATION
Revisa docs/api.md para detalles de endpoints, esquemas de request/response y códigos de error.

🧪 TESTING
Aún no implementado. Próxima versión incluirá Jest & Supertest.

🤝 CONTRIBUTING
1. Haz fork del repositorio.  
2. Crea rama: git checkout -b feature/tu-cambio  
3. Realiza cambios y commit.  
4. Abre pull request.

📄 LICENSE
MIT

✉️ CONTACT
Sebastian Zaragoza — https://github.com/Sebastian-Zaragoza
