## 📚 API Documentation
**Backend API**: [API Base URL](https://real-time-task-management-system-backend.onrender.com)
### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
```
Body:
```json
{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword123"
}
```

#### Login User
```http
POST /api/auth/login
```
Body:
```json
{
    "email": "john@example.com",
    "password": "securepassword123"
}
```

### Task Endpoints

#### Create Task
```http
POST /api/tasks
```
Headers:
```json
{
    "Authorization": "Bearer YOUR_JWT_TOKEN"
}
```
Body:
```json
{
    "title": "Complete Project",
    "description": "Finish the backend API",
    "dueDate": "2024-03-01",
    "priority": "high"
}
```

#### Get All Tasks
```http
GET /api/tasks
```
Headers:
```json
{
    "Authorization": "Bearer YOUR_JWT_TOKEN"
}
```

#### Get Task by ID
```http
GET /api/tasks/:id
```
Headers:
```json
{
    "Authorization": "Bearer YOUR_JWT_TOKEN"
}
```

#### Update Task
```http
PUT /api/tasks/:id
```
Headers:
```json
{
    "Authorization": "Bearer YOUR_JWT_TOKEN"
}
```
Body:
```json
{
    "title": "Updated Title",
    "status": "completed"
}
```

#### Delete Task
```http
DELETE /api/tasks/:id
```
Headers:
```json
{
    "Authorization": "Bearer YOUR_JWT_TOKEN"
}
```
## 🧪 Testing with Postman

1. Import the Postman Collection
   - Download the [Postman Collection JSON file](./postman_collection.json)
   - Open Postman
   - Click "Import" and select the downloaded file

2. Setup Environment Variables in Postman
   - Create a new environment
   - Add the following variables:
     ```
     BASE_URL: http://localhost:5000
     TOKEN: (this will be automatically set after login)
     ```

3. Test Flow
   - Register a new user
   - Login to get JWT token (automatically sets in environment)
   - Use other endpoints with the token

Common HTTP Status Codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 500: Server Error
