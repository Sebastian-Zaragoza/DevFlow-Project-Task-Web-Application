# DevFlow - Project & Task Management System

**DevFlow** is a full-stack web application designed to manage software development projects and tasks collaboratively. It features a modular frontend and backend system with secure authentication and rich UI interactions for creating, editing, and assigning tasks and projects.

---

## 📁 Project Structure

```
DevFlow/
├── ProjectAndTaskManager-Backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── cors.ts
│   │   │   ├── db.ts
│   │   │   └── nodemailer.ts
│   │   ├── controllers/
│   │   │   ├── authController.ts
│   │   │   ├── projectController.ts
│   │   │   └── taskController.ts
│   │   ├── emails/
│   │   │   └── authEmails.ts
│   │   ├── middleware/
│   │   │   ├── auth.ts
│   │   │   ├── projects.ts
│   │   │   ├── task.ts
│   │   │   └── validation.ts
│   │   ├── models/
│   │   │   ├── project.ts
│   │   │   ├── tasks.ts
│   │   │   ├── token.ts
│   │   │   └── user.ts
│   │   ├── routes/
│   │   │   ├── authRoutes.ts
│   │   │   └── projectRoutes.ts
│   │   ├── utils/
│   │   │   ├── auth.ts
│   │   │   ├── jwt.ts
│   │   │   └── token.ts
│   │   ├── index.ts
│   │   └── server.ts
│   ├── .env
│   ├── package.json
│   └── tsconfig.json

├── ProjectAndTaskManager-Frontend/
│   └── ProjectAndTaskManagerFrontEnd/
│       ├── public/
│       │   └── Logo.png
│       ├── src/
│       │   ├── api/
│       │   │   ├── AuthApi.ts
│       │   │   ├── ProjectApi.ts
│       │   │   └── TaskApi.ts
│       │   ├── components/
│       │   │   ├── auth/
│       │   │   ├── projects/
│       │   │   └── tasks/
│       │   ├── hooks/
│       │   │   └── useAuth.ts
│       │   ├── layouts/
│       │   │   ├── AppLayout.tsx
│       │   │   └── AuthLayout.tsx
│       │   ├── lib/
│       │   │   └── axios.ts
│       │   ├── types/
│       │   │   ├── auth.ts
│       │   │   └── index.ts
│       │   ├── utils/
│       │   │   └── utils.ts
│       │   ├── views/
│       │   │   ├── auth/
│       │   │   └── projects/
│       │   ├── main.tsx
│       │   ├── router.tsx
│       │   └── index.css
│       ├── .env.local
│       └── vite.config.ts
├── .gitignore
└── README.md
```

---

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript, TailwindCSS, Vite
- **Backend**: Node.js, Express, MongoDB, Mongoose, TypeScript
- **Security**: JWT, bcrypt, email token verification
- **Communication**: Axios, RESTful API
- **Validation**: Zod

---

## ✅ Features

- 🧑‍💼 User registration, login and protected routes
- 📬 Email confirmation and password recovery
- 🗂️ Project and task creation, editing and assignment
- 📋 Task status and user-based filtering
- ⚙️ Middleware validations for routes
- 🔐 Token-based authentication (JWT)
- 📡 Clean separation between frontend and backend logic

---

## 🚀 Running Locally

1. **Clone the repository**
```bash
git clone https://github.com/Sebastian-Zaragoza/DevFlow-Project-Task-Management.git
```

2. **Setup backend**
```bash
cd ProjectAndTaskManager-Backend
npm install
cp .env.example .env
npm run dev
```

3. **Setup frontend**
```bash
cd ../ProjectAndTaskManager-Frontend/ProjectAndTaskManagerFrontEnd
npm install
npm run dev
```

---

## 📄 License

This project is licensed under the MIT License.

---

Built with 💻 by [Sebastian Zaragoza](https://github.com/Sebastian-Zaragoza)
