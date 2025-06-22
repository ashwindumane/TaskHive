# 📝 Taskverse – Full Stack Task Management App

**Taskverse** is a full-stack productivity web app that allows users to organize, manage, and track tasks with a clean UI, real-time sync, drag-and-drop functionality, and secure authentication. Built using the MERN stack and deployed on Vercel (Frontend) and Render (Backend).

---

### 🔗 Live Demo

- 🌐 Frontend: [https://taskverse-phi.vercel.app](https://taskverse-phi.vercel.app)
- ⚙️ Backend API: [https://taskverse-cy53.onrender.com](https://taskverse-cy53.onrender.com)

---

### 🚀 Tech Stack

| Frontend     | Backend        | Database | Others                  |
|--------------|----------------|----------|--------------------------|
| React.js     | Node.js        | MongoDB  | JWT, Tailwind CSS, Vite |
| Axios        | Express.js     | Mongoose | Framer Motion, Toastify |
| React Router | CORS           |          | Vercel, Render          |

---

### ✨ Features

- ✅ JWT Authentication (Register/Login)
- 📥 Create, Edit, Delete tasks
- ✅ Mark tasks as complete/incomplete
- 🔁 Drag-and-drop across status columns
- 🎯 Priority & due-date support
- 💡 Tooltip, toast, animations (Framer Motion)
- 🌗 Dark mode toggle
- 🔐 Protected routes using context
- 🔄 API integration with axios interceptor
- 📱 Fully responsive design
- ☁️ Frontend deployed on Vercel, Backend on Render

---

### 📦 Installation (Local Setup)

```bash
# 1. Clone the repository
git clone https://github.com/Nayan1509/Taskverse.git

# 2. Frontend setup
cd Taskverse/client
npm install
npm run dev

# 3. Backend setup
cd ../server
npm install
npm run dev
