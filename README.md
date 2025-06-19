# 🏷️ DevFlow

🌐 **Project & Task Management System**

---

## 📖 Overview
DevFlow is a full‑stack web application for collaborative management of software projects and tasks.  
Built with a React + Tailwind front end and a Node.js + Express + MongoDB back end.  

---

## 🚀 Features
- 🔐 **Authentication**: JWT‑based login, email confirmation & password recovery  
- 🗂️ **Projects**: Create, Read, Update, Delete (CRUD)  
- ✅ **Tasks**: CRUD with assignment, status tracking & filtering  
- ⚙️ **Validation**: Zod middleware for request payloads  
- 📧 **Email Workflows**: Transactional emails via Nodemailer  
- 🔀 **Architecture**: Clear separation of front end and back end  

---

## 🗂️ Architecture
```
DevFlow/
├── ProjectAndTaskManager-Backend/
│   ├── src/config/        # cors.ts, db.ts, nodemailer.ts
│   ├── src/controllers/   # authController.ts, projectController.ts, taskController.ts
│   ├── src/middleware/    # auth.ts, validation.ts, projects.ts, task.ts
│   ├── src/models/        # user.ts, project.ts, task.ts, token.ts
│   ├── src/routes/        # authRoutes.ts, projectRoutes.ts, taskRoutes.ts
│   ├── src/utils/         # jwt.ts, email.ts, token.ts
│   ├── src/index.ts
│   └── src/server.ts
├── ProjectAndTaskManager-Frontend/
│   ├── public/            # Logo.png
│   ├── src/api/           # AuthApi.ts, ProjectApi.ts, TaskApi.ts
│   ├── src/components/    # auth/, projects/, tasks/
│   ├── src/hooks/         # useAuth.ts
│   ├── src/layouts/       # AppLayout.tsx, AuthLayout.tsx
│   ├── src/lib/           # axios.ts
│   ├── src/types/         # index.ts, auth.ts
│   ├── src/utils/         # utils.ts
│   ├── src/views/         # auth/, projects/
│   ├── src/main.tsx
│   ├── src/router.tsx
│   └── src/index.css
├── .gitignore
└── README.md
```

---

## ⚙️ Tech Stack
| Layer            | Technologies                           |
|-----------------:|----------------------------------------|
| **Front End**    | React 18, TypeScript, TailwindCSS, Vite |
| **Back End**     | Node.js, Express, TypeScript            |
| **Database**     | MongoDB (Mongoose)                      |
| **Authentication** | JWT (jsonwebtoken), bcrypt            |
| **Validation**   | Zod                                    |
| **Email**        | Nodemailer                             |
| **HTTP Client**  | Axios                                  |

---

## 🛠️ Installation
1. **Clone**  
   ```bash
   git clone https://github.com/Sebastian-Zaragoza/DevFlow-Project-Task-Management.git
   ```
2. **Back End**  
   ```bash
   cd ProjectAndTaskManager-Backend
   npm install
   cp .env.example .env
   npm run dev
   ```
3. **Front End**  
   ```bash
   cd ../ProjectAndTaskManager-Frontend/ProjectAndTaskManagerFrontEnd
   npm install
   npm run dev
   ```
4. **Open** `http://localhost:5173`

---

## ⚙️ Usage
1. Register & confirm your email.  
2. Create a new project.  
3. Add tasks, assign to users & set statuses.  
4. Filter tasks by user or status.

**Example cURL**  
```bash
curl -X POST http://localhost:4000/api/projects   -H "Authorization: Bearer <YOUR_TOKEN>"   -H "Content-Type: application/json"   -d '{"name":"Project","description":"Descrption"}'
```

---

## 📄 API Reference
See **docs/api.md** for full endpoint details, request/response schemas & error codes.  

---

## 🧪 Testing
Automated tests are not implemented yet and will be added in a future release.  

---

## 🤝 Contributing
1. Fork the repository  
2. Create a feature branch  
3. Commit your changes  
4. Open a Pull Request  

---

## 📄 License
MIT

---

## 📬 Contact
**Sebastian Zaragoza**  
GitHub: https://github.com/Sebastian-Zaragoza  
