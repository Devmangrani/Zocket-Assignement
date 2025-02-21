import React, { useState, useEffect } from 'react';
import { 
    Dialog, DialogTitle, DialogContent, DialogActions, 
    TextField, Button, Box 
} from '@mui/material';
import { createTask } from '../service/api';
import toast from 'react-hot-toast';

function TaskForm({ open, onClose, onTaskAdded, initialData }) {
    const [formData, setFormData] = useState({
        title: '',
        description: ''
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                toast.error('User not authenticated');
                return;
            }

            await createTask({
                ...formData,
                userId
            });
            
            toast.success('Task created successfully');
            onTaskAdded(); // Refresh task list
            onClose();
            setFormData({ title: '', description: '' });
        } catch (error) {
            console.error('Create task error:', error);
            toast.error('Failed to create task');
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Add New Task</DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField
                            label="Title"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            required
                            fullWidth
                        />
                        <TextField
                            label="Description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            multiline
                            rows={4}
                            fullWidth
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type="submit" variant="contained" color="primary">
                        Add Task
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}

export default TaskForm;