🔍 **Overview**  
DevFlow is a scalable project and task management system for software teams, featuring modular architecture, secure JWT authentication, and an intuitive React frontend.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🚀 **Features**  
- 👤 **User Accounts**: Registration, login, email verification, and password reset  
- 📁 **Project Management**: Create, edit, delete, and assign projects  
- ✔️ **Task Tracking**: Create tasks, update status, filter by user or status, and assign tasks  
- 🔒 **Security**: JWT-based authentication with access and refresh tokens  
- 🧩 **Validation**: Zod schemas and custom middleware for robust input validation  
- 🌐 **API**: RESTful endpoints consumed by Axios  
- 🎨 **Responsive UI**: Built with React, Vite, TypeScript, and TailwindCSS  
- 🐳 **Containerization**: Docker Compose for development and deployment  
- ⚙️ **CI/CD**: GitHub Actions workflows for automated testing and deployment

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

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📂 **Project Structure**

```bash
DevFlow-Project-Task-Management/
├── ProjectAndTaskManager-Backend/
│   ├── src/
│   │   ├── config/         # DB, CORS, email setup
│   │   ├── controllers/    # Auth, projects, tasks handlers
│   │   ├── emails/         # Email templates
│   │   ├── middleware/     # Auth, validation, error handling
│   │   ├── models/         # User, Project, Task, Token schemas
│   │   ├── routes/         # Route definitions
│   │   └── server.ts       # Application entry point
│   ├── .env                # Environment variables
│   ├── package.json
│   └── tsconfig.json
└── ProjectAndTaskManager-Frontend/
    ├── src/
    │   ├── api/            # Axios API wrappers
    │   ├── components/     # UI components
    │   ├── hooks/          # Custom React hooks
    │   ├── layouts/        # Layout components
    │   ├── router.tsx      # Route definitions
    │   └── main.tsx        # App entry point
    ├── .env.local          # Environment variables
    ├── index.css           # Global styles
    └── vite.config.ts
```

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔑 **JWT Authentication Flow**

1. 📧 **Registration**: User signs up → verification email via Nodemailer  
2. 🔑 **Login**: Issues short-lived access token & long-lived refresh token  
3. 🚪 **Protected Routes**: Access with `Authorization: Bearer <access_token>` header  
4. 🔄 **Token Refresh**: POST to `/auth/refresh` with refresh token → new access token  
5. 🔒 **Logout**: Invalidate refresh token in the database  

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚙️ **Quick Start**

1. **Clone the repository**  
   ```bash
   git clone https://github.com/Sebastian-Zaragoza/DevFlow-Project-Task-Management.git
   cd DevFlow-Project-Task-Management
   ```

2. **Setup Backend**  
   ```bash
   cd ProjectAndTaskManager-Backend
   npm install
   cp .env.example .env
   npm run dev
   ```

3. **Setup Frontend**  
   ```bash
   cd ../ProjectAndTaskManager-Frontend
   npm install
   cp .env.local.example .env.local
   npm run dev
   ```

4. **Access the app**  
   - 🔗 Frontend: http://localhost:3000  
   - 🖥️ Backend API: http://localhost:5000  

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📄 **License**

MIT © Sebastian Zaragoza

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📫 **Contact**

👤 **Sebastian Zaragoza**  
🔗 GitHub: https://github.com/Sebastian-Zaragoza  
✉️ Email: galindozaragozasebastian@gmail.com
