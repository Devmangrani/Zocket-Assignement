import axios from 'axios';

const api = axios.create({
    baseURL: 'https://real-time-task-management-system-backend.onrender.com/api',
    headers: {
        'Content-Type': 'application/json',
    }
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error:', error);
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
        }
        return Promise.reject(error);
    }
);

export const login = async (data) => {
    try {
        const response = await api.post('/auth/login', data);
        if (response.data && response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userId', response.data.userId);
            // Clear any existing tasks when a new user logs in
            localStorage.removeItem('tasks');
        }
        return response;
    } catch (error) {
        console.error('Login API Error:', error);
        throw error;
    }
};

export const register = async (data) => {
    const response = await api.post('/auth/register', data);
    // Store both token and userId for new users
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('userId', response.data.userId);
    return response;
};

export const getTasks = async () => {
    try {
        const userId = localStorage.getItem('userId');
        console.log('Fetching tasks for userId:', userId); // Debug log
        
        const response = await api.get('/tasks', {
            headers: {
                'User-ID': userId
            }
        });
        
        console.log('Tasks Response:', response.data); // Debug log
        return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
        console.error('Fetch Tasks Error:', error);
        throw error;
    }
};

export const createTask = async (data) => {
    try {
        const userId = localStorage.getItem('userId');
        const response = await api.post('/tasks', {
            ...data,
            userId,
            status: 'pending' // Set default status
        });
        console.log('Create Task Response:', response.data); // Debug log
        return response.data;
    } catch (error) {
        console.error('Create Task Error:', error);
        throw error;
    }
};

export const updateTask = (id, data) => api.put(`/tasks/${id}`, data);
export const deleteTask = (id) => api.delete(`/tasks/${id}`);

export default api;