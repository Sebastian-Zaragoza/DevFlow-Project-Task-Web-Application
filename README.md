## Overview
DevFlow is a comprehensive full-stack web application built to facilitate collaborative management of software development projects and tasks. It enables teams to create, edit, assign, and track projects and tasks efficiently, with a focus on security, scalability, and user-friendly interactions. The application features modular architecture, secure authentication mechanisms, and a responsive user interface, making it ideal for software development teams of any size.

## Features
- **User Authentication and Management**:
  - Secure user registration, login, and logout.
  - Email verification for new accounts.
  - Password reset functionality via email.
  
- **Project Management**:
  - Create, edit, and delete projects.
  - Assign team members to projects.
  - View and manage project details collaboratively.

- **Task Tracking**:
  - Create, update, and delete tasks within projects.
  - Assign tasks to users and update status (e.g., To Do, In Progress, Completed).
  - Filter tasks by user, status, or project.

- **Security**:
  - JWT-based authentication with access and refresh tokens.
  - Input validation using Zod schemas.
  - Role-based access control for sensitive operations.

- **Additional Capabilities**:
  - Responsive and intuitive UI for seamless user experience.
  - Email notifications for key events (e.g., verification, resets).
  - RESTful API endpoints for frontend-backend communication.

## Tech Stack
### Backend
- Node.js
- Express.js
- TypeScript
- MongoDB (with Mongoose for ORM)
- JWT (for authentication)
- bcrypt (for password hashing)
- Nodemailer (for email services)
- Zod (for schema validation)

### Frontend
- React
- Vite (build tool)
- TypeScript
- Tailwind CSS (for styling)
- React Router (for navigation)
- Axios (for API requests)

### Additional Tools
- Environment management via .env files

## Project Structure
The project is divided into two main directories: the backend and the frontend. Below is the high-level directory structure:

```
DevFlow-Project-Task-Management/
├── ProjectAndTaskManager-Backend/          # Backend application
│   ├── src/                                # Source code
│   │   ├── config/                         # Configuration files (DB connection, CORS, email setup)
│   │   ├── controllers/                    # API controllers for auth, projects, and tasks
│   │   ├── emails/                         # Email templates and utilities
│   │   ├── middleware/                     # Middleware for authentication, validation, and error handling
│   │   ├── models/                         # Mongoose models (User, Project, Task, Token)
│   │   ├── routes/                         # API route definitions
│   │   └── server.ts                       # Main server entry point
│   ├── .env                                # Environment variables (use .env.example as template)
│   ├── package.json                        # Dependencies and scripts
│   └── tsconfig.json                       # TypeScript configuration
└── ProjectAndTaskManager-Frontend/         # Frontend application
    ├── src/                                # Source code
    │   ├── api/                            # API service wrappers (using Axios)
    │   ├── components/                     # Reusable UI components
    │   ├── hooks/                          # Custom React hooks (e.g., for auth, data fetching)
    │   ├── layouts/                        # Layout components (e.g., headers, footers)
    │   ├── router.tsx                      # Routing configuration with React Router
    │   └── main.tsx                        # Main application entry point
    ├── .env.local                          # Environment variables (use .env.local.example as template)
    ├── index.css                           # Global CSS styles (integrated with Tailwind)
    └── vite.config.ts                      # Vite build configuration
```

This structure promotes separation of concerns, with the backend handling data persistence and business logic, and the frontend focusing on user interface and interactions.

## JWT Authentication Flow
1. **Registration/Login**: User submits credentials; backend validates and issues JWT access and refresh tokens.
2. **Token Usage**: Frontend stores tokens and includes access token in API requests.
3. **Refresh Mechanism**: If access token expires, refresh token is used to obtain a new one without re-login.
4. **Security Measures**: Tokens are stored securely (e.g., HttpOnly cookies for refresh tokens); endpoints are protected via middleware.

## Quick Start (Installation)
### Prerequisites
- Node.js (v18+ recommended)
- MongoDB (local or cloud instance)
- npm or yarn

### Steps
1. Clone the repository:
   ```
   git clone https://github.com/Sebastian-Zaragoza/DevFlow-Project-Task-Web-Application.git
   cd DevFlow-Project-Task-Web-Application
   ```

2. Set up the Backend:
   ```
   cd ProjectAndTaskManager-Backend
   npm install
   cp .env.example .env  # Edit .env with your MongoDB URI, JWT secrets, email credentials, etc.
   npm run dev           # Starts the server (default port: 5000)
   ```

3. Set up the Frontend:
   ```
   cd ../ProjectAndTaskManager-Frontend
   npm install
   cp .env.local.example .env.local  # Edit with backend API URL (e.g., VITE_API_URL=http://localhost:5000)
   npm run dev                       # Starts the frontend (default port: 5173)
   ```

4. Open your browser and navigate to `http://localhost:5173` to access the application.

## Usage
- **Register/Login**: Create an account or log in to access the dashboard.
- **Manage Projects**: From the dashboard, create new projects, add members, and view details.
- **Handle Tasks**: Within a project, add tasks, assign them, and update statuses.
- **API Interaction**: The frontend consumes the backend API; refer to `/routes/` for endpoint details.

For development, use `npm run dev` in both directories for hot-reloading.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact
For questions or feedback, reach out to Sebastian Zaragoza via GitHub or email (galindozaragozasebastian@gmail.com). 
Thank you for using DevFlow! 🚀
