import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, TextField, Button, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { AutoAwesome } from '@mui/icons-material';
import toast from 'react-hot-toast';
import { login } from '../service/api';

function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login(formData);
            console.log('Login Response:', response); // Debug log

            if (response.data && response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('userId', response.data.userId);
                toast.success('Login successful!');
                navigate('/dashboard');
            } else {
                throw new Error('Invalid response from server');
            }
        } catch (error) {
            console.error('Login Error:', error);
            toast.error(error.response?.data?.message || 'Failed to login. Please check your credentials.');
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Box sx={{ 
                    mt: 8, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center'
                }}>
                    <Paper 
                        elevation={6} 
                        sx={{ 
                            p: 4, 
                            width: '100%',
                            background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                            border: '1px solid rgba(37, 99, 235, 0.1)',
                            borderRadius: 2,
                            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
                        }}
                    >
                        <Box sx={{ 
                            mb: 4, 
                            textAlign: 'center',
                            background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
                            borderRadius: 2,
                            p: 3,
                            border: '1px solid rgba(37, 99, 235, 0.1)',
                            boxShadow: '0 2px 12px rgba(0, 0, 0, 0.05)'
                        }}>
                            <AutoAwesome sx={{ 
                                fontSize: 45, 
                                mb: 1, 
                                color: '#2563eb',
                                filter: 'drop-shadow(0 2px 4px rgba(37, 99, 235, 0.2))'
                            }} />
                            <Typography 
                                variant="h4" 
                                sx={{ 
                                    fontWeight: 700, 
                                    mb: 1, 
                                    background: 'linear-gradient(45deg, #1e40af 30%, #3b82f6 90%)',
                                    backgroundClip: 'text',
                                    WebkitBackgroundClip: 'text',
                                    color: 'transparent',
                                    textShadow: '0 2px 4px rgba(0,0,0,0.05)'
                                }}
                            >
                                Welcome Back
                            </Typography>
                            <Typography 
                                variant="subtitle1" 
                                sx={{ 
                                    color: '#334155',
                                    fontWeight: 500,
                                    letterSpacing: '0.5px'
                                }}
                            >
                                Real-time Task Management System
                            </Typography>
                        </Box>

                        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '&:hover fieldset': {
                                            borderColor: '#60a5fa',
                                        },
                                    },
                                }}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '&:hover fieldset': {
                                            borderColor: '#60a5fa',
                                        },
                                    },
                                }}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ 
                                    mt: 3, 
                                    mb: 2,
                                    background: 'linear-gradient(45deg, #2563eb 30%, #60a5fa 90%)',
                                    color: 'white',
                                    '&:hover': {
                                        background: 'linear-gradient(45deg, #1d4ed8 30%, #3b82f6 90%)',
                                    }
                                }}
                            >
                                Sign In
                            </Button>
                            <Button
                                fullWidth
                                variant="text"
                                onClick={() => navigate('/register')}
                                sx={{
                                    color: '#2563eb',
                                    '&:hover': {
                                        background: 'rgba(37, 99, 235, 0.1)',
                                    }
                                }}
                            >
                                Don't have an account? Sign Up
                            </Button>
                        </Box>
                    </Paper>
                </Box>
            </motion.div>
        </Container>
    );
}

export default Login;