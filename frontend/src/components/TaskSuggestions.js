import React from 'react';
import { 
    Paper, Typography, Box, Chip, 
    IconButton, Tooltip, Card, CardContent 
} from '@mui/material';
import { 
    AddCircleOutline, 
    AutoAwesome, TipsAndUpdates 
} from '@mui/icons-material';
import { motion } from 'framer-motion';

function TaskSuggestions({ suggestions, onSuggestionClick }) {
    const formatSuggestion = (suggestion) => {
        // Extract title and description if the suggestion contains "**"
        const parts = suggestion.split(':**');
        if (parts.length === 2) {
            return {
                title: parts[0].replace('**', '').trim(),
                description: parts[1].trim()
            };
        }
        return { title: suggestion, description: '' };
    };

    return (
        <Paper 
            elevation={2}
            sx={{ 
                p: 3,
                background: 'linear-gradient(to right bottom, #ffffff, #f8faff)',
                borderRadius: 2,
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                mb: 3,
                gap: 1
            }}>
                <AutoAwesome sx={{ color: 'primary.main' }} />
                <Typography variant="h6" sx={{ color: 'primary.main' }}>
                    AI Suggestions
                </Typography>
                <Chip 
                    size="small"
                    label="Smart Tasks"
                    icon={<TipsAndUpdates fontSize="small" />}
                    sx={{ 
                        ml: 'auto',
                        bgcolor: 'primary.lighter',
                        color: 'primary.main'
                    }}
                />
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {suggestions.map((suggestion, index) => {
                    const { title, description } = formatSuggestion(suggestion);
                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card 
                                sx={{ 
                                    bgcolor: 'background.paper',
                                    '&:hover': {
                                        boxShadow: 3,
                                        transform: 'translateY(-2px)',
                                        transition: 'all 0.2s'
                                    }
                                }}
                            >
                                <CardContent sx={{ 
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: 2,
                                    p: 2,
                                    '&:last-child': { pb: 2 }
                                }}>
                                    <Box sx={{ flex: 1 }}>
                                        <Typography 
                                            variant="subtitle1" 
                                            sx={{ 
                                                fontWeight: 600,
                                                color: 'text.primary',
                                                mb: description ? 1 : 0
                                            }}
                                        >
                                            {title}
                                        </Typography>
                                        {description && (
                                            <Typography 
                                                variant="body2" 
                                                color="text.secondary"
                                                sx={{ 
                                                    fontSize: '0.875rem',
                                                    lineHeight: 1.5
                                                }}
                                            >
                                                {description}
                                            </Typography>
                                        )}
                                    </Box>
                                    <Tooltip title="Add this task">
                                        <IconButton 
                                            onClick={() => onSuggestionClick(title)}
                                            size="small"
                                            sx={{
                                                color: 'primary.main',
                                                '&:hover': {
                                                    bgcolor: 'primary.lighter',
                                                    transform: 'scale(1.1)'
                                                },
                                                transition: 'all 0.2s'
                                            }}
                                        >
                                            <AddCircleOutline />
                                        </IconButton>
                                    </Tooltip>
                                </CardContent>
                            </Card>
                        </motion.div>
                    );
                })}
            </Box>
        </Paper>
    );
}

export default TaskSuggestions;
