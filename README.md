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
│   ├── src/config/       
│   ├── src/controllers/   
│   ├── src/middleware/    
│   ├── src/models/       
│   ├── src/routes/        
│   ├── src/utils/       
│   ├── src/index.ts
│   └── src/server.ts
├── ProjectAndTaskManager-Frontend/
│   ├── public/           
│   ├── src/api/          
│   ├── src/components/    
│   ├── src/hooks/        
│   ├── src/layouts/      
│   ├── src/lib/          
│   ├── src/types/       
│   ├── src/utils/        
│   ├── src/views/        
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
| **Email**        | Resend                                 |
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
   cp .env
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
Documentation is not implemented yet and will be addd in a future release. 

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

MIT © Sebastian Zaragoza

---

## 📬 Contact
**Sebastian Zaragoza**  
GitHub: https://github.com/Sebastian-Zaragoza  
