# Real-Time Task Management System - Frontend 🚀

## 🔗 Quick Links
- **Live Demo**: [Task Management System](https://real-time-task-management-system-vzcn.onrender.com)
- **Backend API**: [API Base URL](https://real-time-task-management-system-backend.onrender.com)

## 📌 Tech Stack

### Core Technologies
- **Framework**: React.js with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **API Integration**: Axios
- **Authentication**: JWT
- **Notifications**: React Toastify

### Deployment
- Platform: [Render](https://real-time-task-management-system-vzcn.onrender.com)
- CI/CD: Automatic deployments from main branch

## 🚀 Run Locally

### Prerequisites
- Node.js (v14 or higher)
- npm/yarn
- Git

### Installation Steps

1. Clone the repository
```bash
git clone https://github.com/your-repository.git
cd frontend
```

2. Install dependencies
```bash
npm install
```

3. Create `.env.local` file
```ini
NEXT_PUBLIC_API_URL=https://real-time-task-management-system-backend.onrender.com/api
```

4. Start development server
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📚 API Integration

### Authentication Endpoints
- **Register**: `POST /api/auth/register`
  ```typescript
  interface RegisterPayload {
    name: string;
    email: string;
    password: string;
  }
  ```

- **Login**: `POST /api/auth/login`
  ```typescript
  interface LoginPayload {
    email: string;
    password: string;
  }
  ```

### Task Management
- **Get Tasks**: `GET /api/tasks`
- **Create Task**: `POST /api/tasks`
  ```typescript
  interface TaskPayload {
    title: string;
    description: string;
    dueDate?: Date;
    priority: 'low' | 'medium' | 'high';
  }
  ```

## 👨‍💻 Development Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run type     # Run TypeScript checks
```
## 👨‍💻 Developed By
🚀 [Shivam Jha]
- GitHub: [@Shivam Jha](https://github.com/shivamjha2110)
- LinkedIn: [Shivam Jha](https://linkedin.com/in/shivamjha21)
