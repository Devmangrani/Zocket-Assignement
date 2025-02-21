# AI-Powered Task Management System

**Created by:** Dev Mangrani

## Full-Stack Rapid Development Challenge

### Time: 4 Hours

### Focus Areas:

- Backend in Golang (Gin/Fiber)
- Frontend in TypeScript (Next.js + Tailwind CSS)
- AI Utilization (Copilot, ChatGPT, AutoGPT, etc.)
- High Agency & Ownership

### Challenge:

Develop a real-time task management system with:

- User authentication (JWT-based)
- Task creation, assignment, and tracking
- AI-powered task suggestions (OpenAI/Gemini API)
- Real-time updates (WebSockets)
- Deployed on cloud platforms (Vercel/Fly.io/Render)

### Tech Requirements:

#### Backend (Golang)

- Golang (Gin/Fiber) – REST API development
- JWT authentication for user sessions
- PostgreSQL or MongoDB as the database
- Goroutines & WebSockets for real-time task updates
- AI-powered smart task breakdowns (OpenAI/Gemini API)
- Deployment on Render/Fly.io

#### Frontend (TypeScript + Next.js + Tailwind)

- Next.js (App Router preferred) with Tailwind CSS
- Task dashboard with real-time updates
- JWT authentication (client-side handling)
- AI-powered chat for task recommendations
- Deployment on Vercel

### Bonus (Go Beyond!)

- Docker & Kubernetes for containerized deployment
- Slack/Discord bot integration
- Automate AI task assignment based on priority
- Leverage AI tools for rapid development

### Submission Guidelines

- GitHub Repository with README and live demo link
- Backend & Frontend Deployed URLs
- 5-minute Video Demo - Explain your approach
- Documentation - How AI tools helped

### Evaluation Criteria

- **Speed (50%)** - How much can you ship in 4 hours?
- **Code Quality (20%)** - Clean, modular, and scalable
- **AI Utilization (20%)** - How effectively AI was leveraged
- **Deployment (10%)** - Working, hosted product

### The Goal

We're hiring high-agency engineers who take ownership, ship fast, and use AI effectively. Don't just code—get it DONE.

---

## Features

- **User Authentication**: Secure login and registration using JWT.
- **Task Management**: Create, assign, and track tasks in real-time.
- **AI Suggestions**: Get AI-powered task suggestions to enhance productivity.
- **Real-Time Updates**: Receive updates on task changes via WebSockets.

## Getting Started

### Prerequisites

- Node.js and npm installed for the frontend.
- Go installed for the backend.
- MongoDB or PostgreSQL set up for the database.

### Running the Backend

1. Navigate to the backend directory:
   ```bash
   cd backend_Nodejs
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm run dev
   ```

### Running the Frontend

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the application:
   ```bash
   npm start
   ```

### Accessing the Application

Open your browser and navigate to:

# **Real-Time Task Management System** 🚀

🔗 **Live Demo**: [Task Management System](https://real-time-task-management-system-vzcn.onrender.com)

🔗 **Backend API**: [API Base URL](https://real-time-task-management-system-backend.onrender.com)

---

## **📌 Project Overview**

This is a **real-time task management system** that allows users to:  
✅ **Register & Log in** securely (JWT authentication)  
✅ **Create, Assign & Track Tasks** dynamically  
✅ **Receive AI-powered Task Recommendations**  
✅ **Get Real-Time Task Updates** using WebSockets  
✅ **Deploy & Use from Anywhere!**

---

## **🛠 Tech Stack**

### **Frontend**

- **React.js** (TypeScript)
- **Tailwind CSS**
- **Axios** (API Requests)

### **Backend**

- **I have Created backend in: Golang as well as Node.js + Express.js**
- **MongoDB + Mongoose**
- **JWT Authentication**
- **Socket.io (WebSockets for real-time updates)**

### **Deployment**

- **Frontend**: [Render](https://real-time-task-management-system-vzcn.onrender.com)
- **Backend**: [Render](https://real-time-task-management-system-backend.onrender.com)

---

# API Documentation

## 🚀 API Endpoints

### 🔹 Authentication API

#### 1️⃣ User Registration

**Endpoint:** `POST /api/auth/register`

**Request:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}
```

**Response:**

```json
{
  "message": "User registered successfully"
}
```

#### 2️⃣ User Login

**Endpoint:** `POST /api/auth/login`

**Request:**

```json
{
  "email": "john@example.com",
  "password": "123456"
}
```

**Response:**

```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id_here",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

📌 **Important:** Store the `token` for authenticated requests!

### 🔹 Task Management API

#### 3️⃣ Create Task (Requires Authentication)

**Endpoint:** `POST /api/tasks`

**Headers:**

```json
{
  "Authorization": "Bearer jwt_token_here"
}
```

**Request:**

```json
{
  "title": "Complete the project",
  "description": "Work on the task management system."
}
```

**Response:**

```json
{
  "_id": "task_id_here",
  "title": "Complete the project",
  "description": "Work on the task management system.",
  "status": "pending",
  "assignedTo": "user_id_here",
  "createdAt": "timestamp_here"
}
```

#### 4️⃣ Get All Tasks (Requires Authentication)

**Endpoint:** `GET /api/tasks`

**Headers:**

```json
{
  "Authorization": "Bearer jwt_token_here"
}
```

**Response:**

```json
[
  {
    "_id": "task_id_here",
    "title": "Complete the project",
    "description": "Work on the task management system.",
    "status": "pending",
    "assignedTo": "user_id_here",
    "createdAt": "timestamp_here"
  }
]
```

#### 5️⃣ Update Task Status (Requires Authentication)

**Endpoint:** `PUT /api/tasks/{taskId}`

**Headers:**

```json
{
  "Authorization": "Bearer jwt_token_here"
}
```

**Request:**

```json
{
  "status": "completed"
}
```

**Response:**

```json
{
  "message": "Task updated successfully",
  "task": {
    "_id": "task_id_here",
    "title": "Complete the project",
    "description": "Work on the task management system.",
    "status": "completed",
    "assignedTo": "user_id_here",
    "updatedAt": "timestamp_here"
  }
}
```

#### 6️⃣ Delete Task (Requires Authentication)

**Endpoint:** `DELETE /api/tasks/{taskId}`

**Headers:**

```json
{
  "Authorization": "Bearer jwt_token_here"
}
```

**Response:**

```json
{
  "message": "Task deleted successfully"
}
```

## 📌 How to Run Locally?

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/your-repository.git
cd your-repository
```

### 2️⃣ Backend Setup

```sh
cd backend
npm install
```

📌 Create `.env` file inside `backend/`

```ini
MONGO_URI=mongodb://yourmongoclusterlink
JWT_SECRET=mysecretkey
PORT=5000
```

Run the server:

```sh
node src/server.js
```

### 3️⃣ Frontend Setup

```sh
cd frontend
npm install
npm run dev
```
# Zocket-Assignement
