import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { LogoutOutlined } from '@mui/icons-material';

function Header() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear all user data on logout
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/login');
    };

    return (
        <AppBar position="static" sx={{ background: 'transparent', boxShadow: 'none' }}>
            <Toolbar>
                <Typography 
                    variant="h6" 
                    sx={{ 
                        flexGrow: 1,
                        background: 'linear-gradient(45deg, #2563eb 30%, #60a5fa 90%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        color: 'transparent',
                        fontWeight: 'bold'
                    }}
                >
                    Real-Time Task Management System
                </Typography>
                <Button 
                    color="inherit" 
                    onClick={handleLogout}
                    startIcon={<LogoutOutlined />}
                    sx={{ color: 'primary.main' }}
                >
                    Logout
                </Button>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
