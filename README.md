🔍 **Overview**  
DevFlow is a full-stack web application designed to manage software development projects and tasks collaboratively. It features a modular frontend and backend architecture, secure authentication, and an intuitive UI for creating, editing, and assigning projects and tasks.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✨ **Key Features**  
- 👥 **User Management**: Registration, login, email confirmation, and password recovery  
- 📂 **Project Handling**: Create, edit, delete, and assign projects to team members  
- ✅ **Task Tracking**: Create tasks, update status, filter by user or status, and assign tasks  
- 🔒 **Authentication**: JWT-based authentication and protected routes  
- 🛡️ **Validation**: Server-side data validation with Zod and custom middleware  
- 🔄 **REST API**: Clean RESTful endpoints consumed via Axios  
- 🎨 **Responsive UI**: Built with React, Vite, TypeScript, and TailwindCSS

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🛠️ **Tech Stack**

**Backend**  
- Node.js · Express · TypeScript  
- MongoDB · Mongoose  
- JWT · bcrypt · Nodemailer  
- Zod for schema validation  

**Frontend**  
- React · Vite · TypeScript · TailwindCSS  
- React Router · Axios  

**DevOps**  
- Docker & Docker Compose (optional)  
- GitHub Actions (CI/CD)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📂 **Project Structure**

\`\`\`bash
DevFlow-Project-Task-Management/
├── ProjectAndTaskManager-Backend/
│   ├── src/
│   │   ├── config/         # CORS, DB connection, email setup
│   │   ├── controllers/    # Route handlers (auth, projects, tasks)
│   │   ├── emails/         # Email templates & senders
│   │   ├── middleware/     # Auth, validation, error handling
│   │   ├── models/         # Mongoose schemas (User, Project, Task, Token)
│   │   ├── routes/         # Express route definitions
│   │   ├── utils/          # JWT helpers, token utils
│   │   └── server.ts       # Entry point
│   ├── .env                # Environment variables
│   ├── package.json  
│   └── tsconfig.json
└── ProjectAndTaskManager-Frontend/
    ├── ProjectAndTaskManagerFrontEnd/
    │   ├── public/         # Static assets
    │   ├── src/
    │   │   ├── api/        # Axios API wrappers
    │   │   ├── components/ # UI components
    │   │   ├── hooks/      # Custom hooks (useAuth)
    │   │   ├── layouts/    # App & Auth layouts
    │   │   ├── router.tsx  # Route definitions
    │   │   ├── main.tsx    # App entry
    │   │   └── index.css   # Global styles
    │   ├── .env.local      # Frontend env vars
    │   └── vite.config.ts
\`\`\`

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔑 **JWT Authentication Flow**

1. 🎉 **Registration**: User signs up → confirmation email via Nodemailer  
2. 🔑 **Login**: Issues short‑lived access token & long‑lived refresh token  
3. 🚪 **Protected Routes**: Access with \`Authorization: Bearer <access_token>\`  
4. 🔄 **Token Refresh**: Call \`/auth/refresh\` with refresh token → new access token  
5. 🔒 **Logout**: Invalidate refresh token in database  

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚙️ **Quick Start**

1. **Clone Repo**  
   \`\`\`bash
   git clone https://github.com/Sebastian-Zaragoza/DevFlow-Project-Task-Management.git
   cd DevFlow-Project-Task-Management
   \`\`\`

2. **Backend Setup**  
   \`\`\`bash
   cd ProjectAndTaskManager-Backend
   npm install
   cp .env.example .env
   npm run dev
   \`\`\`

3. **Frontend Setup**  
   \`\`\`bash
   cd ../ProjectAndTaskManager-Frontend/ProjectAndTaskManagerFrontEnd
   npm install
   cp .env.local.example .env.local
   npm run dev
   \`\`\`

4. **Access the App**  
   - 🔗 Frontend: http://localhost:3000  
   - 🖥️ Backend API: http://localhost:5000  

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📄 **License**

MIT © Sebastian Zaragoza

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📫 **Contact**

👤 **Sebastian Zaragoza**  
🔗 GitHub: https://github.com/Sebastian-Zaragoza  
✉️ Email: your.email@example.com
