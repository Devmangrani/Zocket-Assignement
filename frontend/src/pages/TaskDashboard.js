import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Grid, Paper, Button, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import ChatBot from '../components/ChatBot';
import Header from '../components/Header';
import TaskSuggestions from '../components/TaskSuggestions';
import { getTasks } from '../service/api';
import { initializeWebSocket, closeWebSocket, subscribeToUpdates } from '../service/websocket';
import { getTaskSuggestions } from '../service/gemini';
import toast from 'react-hot-toast';
import AddIcon from '@mui/icons-material/Add';

function TaskDashboard() {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [formData, setFormData] = useState({ title: '', description: '' });

    const fetchTasks = useCallback(async () => {
        try {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                toast.error('Please login again');
                navigate('/login');
                return;
            }

            const response = await getTasks();
            setTasks(response || []);
        } catch (error) {
            console.error('Fetch tasks error:', error);
            toast.error('Failed to fetch tasks');
            setTasks([]);
        }
    }, [navigate]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        
        if (!token || !userId) {
            navigate('/login');
            return;
        }

        fetchTasks();
        
        // Initialize WebSocket
        initializeWebSocket();
        
        // Set up subscription
        const unsubscribe = subscribeToUpdates((data) => {
            if (data.type === 'TASK_UPDATE' && data.userId === userId) {
                fetchTasks();
            }
        });

        // Cleanup function
        return () => {
            unsubscribe();
            closeWebSocket();
        };
    }, [fetchTasks, navigate]);

    const updateSuggestions = useCallback(async () => {
        try {
            const suggestionsText = await getTaskSuggestions(tasks);
            const extractedSuggestions = suggestionsText
                .split('Suggested Task:')
                .slice(1)
                .map(suggestion => {
                    const lines = suggestion.split('\n');
                    return lines[0].trim();
                });
            setSuggestions(extractedSuggestions);
        } catch (error) {
            console.error('Failed to get suggestions:', error);
            setSuggestions([]);
        }
    }, [tasks]);

    useEffect(() => {
        if (tasks.length > 0) {
            updateSuggestions();
        }
    }, [tasks.length, updateSuggestions]);

    const handleSuggestionClick = (suggestion) => {
        setIsFormOpen(true);
        setFormData({ title: suggestion, description: '' });
    };

    return (
        <>
            <Header />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <motion.div>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Paper 
                                elevation={3}
                                sx={{ 
                                    p: 3, 
                                    display: 'flex', 
                                    justifyContent: 'space-between', 
                                    alignItems: 'center',
                                    background: 'linear-gradient(135deg, #e0f2fe 0%, #bfdbfe 100%)',
                                    borderRadius: 2,
                                    position: 'relative',
                                    overflow: 'hidden',
                                    border: '1px solid rgba(37, 99, 235, 0.1)',
                                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)'
                                }}
                            >
                                <Box sx={{ zIndex: 2 }}>
                                    <Typography 
                                        variant="h4" 
                                        sx={{ 
                                            color: '#1e40af',
                                            fontWeight: 700,
                                            mb: 0.5,
                                            letterSpacing: '0.5px',
                                            textShadow: '1px 1px 1px rgba(255,255,255,0.5)'
                                        }}
                                    >
                                        Task Dashboard
                                    </Typography>
                                    <Typography 
                                        variant="subtitle1" 
                                        sx={{ 
                                            color: '#334155',
                                            fontWeight: 500,
                                            letterSpacing: '0.25px'
                                        }}
                                    >
                                        Manage your tasks efficiently
                                    </Typography>
                                </Box>
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Button
                                        variant="contained"
                                        onClick={() => setIsFormOpen(true)}
                                        sx={{
                                            background: 'linear-gradient(45deg, #4A90E2 30%, #F39C12 90%)',
                                            color: 'white',
                                            fontWeight: 600,
                                            px: 3,
                                            py: 1.5,
                                            fontSize: '1rem',
                                            zIndex: 2,
                                            boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)',
                                            '&:hover': {
                                                background: 'linear-gradient(45deg, #3B7BBF 30%, #D68A00 90%)',
                                                transform: 'translateY(-2px)',
                                                boxShadow: '0 6px 16px rgba(37, 99, 235, 0.3)',
                                            },
                                            transition: 'all 0.2s ease-in-out',
                                            borderRadius: '8px'
                                        }}
                                        startIcon={<AddIcon />}
                                    >
                                        Add New Task
                                    </Button>
                                </motion.div>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <TaskList tasks={tasks} onTaskUpdate={fetchTasks} />
                        </Grid>
                        <Grid item xs={12}>
                            <TaskSuggestions 
                                suggestions={suggestions} 
                                onSuggestionClick={handleSuggestionClick} 
                            />
                        </Grid>
                    </Grid>
                </motion.div>
                <TaskForm
                    open={isFormOpen}
                    onClose={() => setIsFormOpen(false)}
                    onTaskAdded={fetchTasks}
                    initialData={formData}
                />
            </Container>
            <ChatBot onSuggestionSelect={handleSuggestionClick} />
        </>
    );
}

export default TaskDashboard;