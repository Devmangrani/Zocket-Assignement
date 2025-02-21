import React, { useState } from 'react';
import { 
    Paper, List, ListItem, ListItemText, ListItemSecondaryAction, 
    IconButton, Chip, Typography, Tooltip, CircularProgress, Skeleton 
} from '@mui/material';
import { 
    Delete, CheckCircle, PendingActions, 
    CheckCircleOutline, Timeline 
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { updateTask, deleteTask } from '../service/api';
import toast from 'react-hot-toast';

function TaskList({ tasks, onTaskUpdate }) {
    const [actionLoading, setActionLoading] = useState(null);

    const getStatusConfig = (status) => {
        const configs = {
            pending: {
                icon: <PendingActions fontSize="small" />,
                color: 'warning',
                label: 'Pending'
            },
            'in-progress': {
                icon: <Timeline fontSize="small" />,
                color: 'info',
                label: 'In Progress'
            },
            completed: {
                icon: <CheckCircle fontSize="small" />,
                color: 'success',
                label: 'Completed'
            }
        };
        return configs[status] || configs.pending;
    };

    const handleDelete = async (taskId) => {
        setActionLoading(taskId);
        try {
            await deleteTask(taskId);
            toast.success('Task deleted', {
                icon: '🗑️',
                style: { borderRadius: '10px', background: '#333', color: '#fff' }
            });
            onTaskUpdate();
        } catch (error) {
            toast.error('Failed to delete task');
        }
        setActionLoading(null);
    };

    const handleCycleStatus = async (taskId, currentStatus) => {
        const statusCycle = {
            'pending': 'in-progress',
            'in-progress': 'completed',
            'completed': 'pending'
        };
        try {
            await updateTask(taskId, { status: statusCycle[currentStatus] });
            toast.success('Task status updated');
            onTaskUpdate();
        } catch (error) {
            toast.error('Failed to update task');
        }
    };

    if (!tasks || tasks.length === 0) return (
        <Paper sx={{ p: 2, borderRadius: 2 }}>
            {[...Array(3)].map((_, i) => (
                <Skeleton 
                    key={i}
                    variant="rectangular"
                    height={80}
                    sx={{ mb: 1, borderRadius: 1 }}
                />
            ))}
        </Paper>
    );

    return (
        <Paper 
            sx={{ 
                p: 2, 
                borderRadius: 2,
                position: 'relative',
                overflow: 'hidden',
                '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: 'linear-gradient(45deg, #2563eb 30%, #60a5fa 90%)'
                }
            }}
        >
            <List>
                <AnimatePresence>
                    {tasks.map((task) => {
                        const statusConfig = getStatusConfig(task.status);
                        return (
                            <motion.div
                                key={task._id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                            >
                                <ListItem
                                    sx={{
                                        mb: 1,
                                        bgcolor: 'background.default',
                                        borderRadius: 1,
                                        border: '1px solid',
                                        borderColor: 'divider',
                                        '&:hover': {
                                            bgcolor: 'action.hover',
                                            transform: 'translateY(-2px)',
                                            transition: 'transform 0.2s'
                                        }
                                    }}
                                >
                                    <ListItemText
                                        primary={
                                            <Typography 
                                                variant="h6" 
                                                sx={{ 
                                                    fontSize: '1rem', 
                                                    fontWeight: 500,
                                                    textDecoration: task.status === 'completed' ? 'line-through' : 'none',
                                                    color: task.status === 'completed' ? 'text.secondary' : 'text.primary'
                                                }}
                                            >
                                                {task.title}
                                            </Typography>
                                        }
                                        secondary={task.description}
                                    />
                                    <Chip
                                        icon={statusConfig.icon}
                                        label={statusConfig.label}
                                        color={statusConfig.color}
                                        sx={{ 
                                            mr: 4,  // Increased margin
                                            px: 2   // Added horizontal padding
                                        }}
                                    />
                                    <ListItemSecondaryAction sx={{ 
                                        display: 'flex', 
                                        gap: 2,    // Add gap between buttons
                                        mr: 1      // Add right margin
                                    }}>
                                        <Tooltip title="Change Status">
                                            <IconButton
                                                onClick={() => handleCycleStatus(task._id, task.status)}
                                                sx={{ 
                                                    color: statusConfig.color + '.main',
                                                    '&:hover': {
                                                        bgcolor: statusConfig.color + '.lighter',
                                                        transform: 'scale(1.1)'
                                                    },
                                                    transition: 'transform 0.2s'
                                                }}
                                            >
                                                <CheckCircleOutline />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete Task">
                                            <IconButton
                                                onClick={() => handleDelete(task._id)}
                                                disabled={actionLoading === task._id}
                                                sx={{
                                                    '&:hover': {
                                                        color: 'error.main',
                                                        bgcolor: 'error.lighter',
                                                        transform: 'scale(1.1)'
                                                    },
                                                    transition: 'transform 0.2s',
                                                    position: 'relative'
                                                }}
                                            >
                                                {actionLoading === task._id ? (
                                                    <CircularProgress size={24} />
                                                ) : (
                                                    <Delete />
                                                )}
                                            </IconButton>
                                        </Tooltip>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </List>
        </Paper>
    );
}

export default TaskList;