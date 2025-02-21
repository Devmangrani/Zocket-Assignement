import React, { useState, useRef, useEffect } from 'react';
import { 
    Box, TextField, IconButton, Typography, 
    Fab, Drawer, Avatar, CircularProgress, Zoom, Chip, Paper, Button
} from '@mui/material';
import { Send, Chat, Close, SmartToy, Psychology, AutoAwesome } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { getChatResponse } from '../service/gemini';
import toast from 'react-hot-toast';

function ChatBot({ onSuggestionSelect }) {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const quickSuggestions = [
        "Help me prioritize my tasks",
        "How to break down a complex task?",
        "Time management tips",
        "Best practices for productivity"
    ];

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = { text: input, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        try {
            const response = await getChatResponse(input);
            console.log('AI Response:', response); // Debug log
            
            if (response) {
                const botMessage = { text: response, sender: 'bot' };
                setMessages(prev => [...prev, botMessage]);
                
                // Check for task suggestions
                if (response.includes('Suggested Task:')) {
                    const taskMatch = response.match(/Suggested Task: (.*?)(?=\n|$)/);
                    if (taskMatch && taskMatch[1]) {
                        const suggestion = taskMatch[1].trim();
                        const suggestionMessage = { 
                            text: 'Would you like to create this task?',
                            sender: 'bot',
                            suggestion,
                            type: 'suggestion'
                        };
                        setMessages(prev => [...prev, suggestionMessage]);
                    }
                }
            }
        } catch (error) {
            console.error('Chat Error:', error);
            toast.error('Unable to get AI response');
            const errorMessage = { 
                text: "I'm having trouble connecting right now. Please try again later.", 
                sender: 'bot' 
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsTyping(false);
        }
    };

    const formatMessageContent = (text) => {
        const sections = text.split('\n\n').map(section => section.trim());
        
        return sections.map((section, index) => {
            // Handle bullet points
            if (section.includes('•')) {
                const [title, ...points] = section.split('\n');
                return (
                    <Box key={index} sx={{ mb: 2 }}>
                        {title && (
                            <Typography 
                                variant="subtitle1" 
                                sx={{ 
                                    fontWeight: 600, 
                                    color: 'primary.main',
                                    mb: 1
                                }}
                            >
                                {title}
                            </Typography>
                        )}
                        {points.map((point, i) => (
                            <Box 
                                key={i} 
                                sx={{ 
                                    display: 'flex', 
                                    alignItems: 'flex-start',
                                    mb: 0.5,
                                    pl: 2
                                }}
                            >
                                <Box
                                    sx={{
                                        width: 4,
                                        height: 4,
                                        bgcolor: 'primary.main',
                                        borderRadius: '50%',
                                        mt: 1,
                                        mr: 1
                                    }}
                                />
                                <Typography variant="body2">
                                    {point.replace('•', '').trim()}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                );
            }

            // Handle numbered lists
            if (section.match(/^\d+\./)) {
                const [title, ...points] = section.split('\n');
                return (
                    <Box key={index} sx={{ mb: 2 }}>
                        {title && (
                            <Typography 
                                variant="subtitle1" 
                                sx={{ 
                                    fontWeight: 600, 
                                    color: 'primary.main',
                                    mb: 1
                                }}
                            >
                                {title}
                            </Typography>
                        )}
                        {points.map((point, i) => (
                            <Typography 
                                key={i} 
                                variant="body2"
                                sx={{ 
                                    pl: 2,
                                    mb: 0.5
                                }}
                            >
                                {point.trim()}
                            </Typography>
                        ))}
                    </Box>
                );
            }

            // Handle task suggestions
            if (section.includes('Suggested Task:')) {
                const lines = section.split('\n');
                return (
                    <Box key={index} sx={{ mb: 2 }}>
                        {lines.map((line, i) => {
                            if (line.startsWith('Suggested Task:')) {
                                return (
                                    <Typography 
                                        key={i}
                                        variant="subtitle1" 
                                        sx={{ 
                                            fontWeight: 600,
                                            color: 'primary.main',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1,
                                            mb: 1
                                        }}
                                    >
                                        <AutoAwesome fontSize="small" />
                                        {line}
                                    </Typography>
                                );
                            }
                            if (line.startsWith('Description:')) {
                                return (
                                    <Typography 
                                        key={i}
                                        variant="body2" 
                                        sx={{ pl: 3, mb: 1 }}
                                    >
                                        {line}
                                    </Typography>
                                );
                            }
                            if (line.startsWith('Priority:')) {
                                return (
                                    <Chip
                                        key={i}
                                        label={line}
                                        size="small"
                                        color={
                                            line.includes('High') ? 'error' :
                                            line.includes('Medium') ? 'warning' : 'success'
                                        }
                                        sx={{ ml: 3 }}
                                    />
                                );
                            }
                            return null;
                        })}
                    </Box>
                );
            }

            // Regular paragraphs
            return (
                <Typography 
                    key={index} 
                    variant="body2" 
                    sx={{ mb: 1.5, lineHeight: 1.6 }}
                >
                    {section}
                </Typography>
            );
        });
    };

    const renderMessage = (message, index) => {
        if (message.type === 'suggestion') {
            return (
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: 1
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <AutoAwesome color="primary" fontSize="small" />
                        <Typography variant="subtitle2">{message.text}</Typography>
                    </Box>
                    <Button
                        size="small"
                        variant="contained"
                        startIcon={<AutoAwesome />}
                        onClick={() => onSuggestionSelect(message.suggestion)}
                        sx={{ ml: 3 }}
                    >
                        Create Task
                    </Button>
                </Box>
            );
        }

        return formatMessageContent(message.text);
    };

    return (
        <>
            <Zoom in={!open}>
                <Fab
                    color="primary"
                    sx={{
                        position: 'fixed',
                        bottom: 20,
                        right: 20,
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    }}
                    onClick={() => setOpen(true)}
                >
                    <Chat />
                </Fab>
            </Zoom>

            <Drawer
                anchor="right"
                open={open}
                onClose={() => setOpen(false)}
            >
                <Box sx={{ width: 380, height: '100%', display: 'flex', flexDirection: 'column' }}>
                    {/* Chat Header */}
                    <Box sx={{ 
                        p: 2, 
                        background: 'linear-gradient(45deg, #2563eb 30%, #60a5fa 90%)',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1
                    }}>
                        <Psychology />
                        <Box>
                            <Typography variant="h6">Task Assistant</Typography>
                            <Typography variant="caption">AI-Powered Task Management</Typography>
                        </Box>
                        <IconButton 
                            sx={{ ml: 'auto', color: 'white' }}
                            onClick={() => setOpen(false)}
                        >
                            <Close />
                        </IconButton>
                    </Box>

                    {/* Messages Area */}
                    <Box sx={{ 
                        flexGrow: 1, 
                        overflow: 'auto', 
                        p: 2, 
                        bgcolor: '#f8fafc',
                        backgroundImage: 'radial-gradient(#e2e8f0 1px, transparent 1px)',
                        backgroundSize: '20px 20px'
                    }}>
                        <AnimatePresence>
                            {messages.map((message, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    <Box sx={{
                                        display: 'flex',
                                        justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                                        mb: 2
                                    }}>
                                        {message.sender === 'bot' && (
                                            <Avatar sx={{ bgcolor: 'primary.main', mr: 1 }}>
                                                <SmartToy />
                                            </Avatar>
                                        )}
                                        <Paper sx={{
                                            p: 2,
                                            maxWidth: '85%',
                                            bgcolor: message.sender === 'user' ? 'primary.main' : 'white',
                                            color: message.sender === 'user' ? 'white' : 'text.primary',
                                            borderRadius: message.sender === 'user' ? '20px 20px 0 20px' : '20px 20px 20px 0',
                                            boxShadow: '0 2px 12px rgba(0,0,0,0.08)'
                                        }}>
                                            {renderMessage(message, index)}
                                        </Paper>
                                    </Box>
                                </motion.div>
                            ))}
                            {isTyping && (
                                <Box sx={{ display: 'flex', gap: 1, ml: 1 }}>
                                    <CircularProgress size={20} />
                                    <Typography>AI is thinking...</Typography>
                                </Box>
                            )}
                        </AnimatePresence>
                        <div ref={messagesEndRef} />
                    </Box>

                    {/* Quick Suggestions */}
                    <Box sx={{ p: 1, bgcolor: 'background.paper' }}>
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                            {quickSuggestions.map((suggestion, index) => (
                                <Chip
                                    key={index}
                                    label={suggestion}
                                    size="small"
                                    onClick={() => setInput(suggestion)}
                                />
                            ))}
                        </Box>
                    </Box>

                    {/* Input Area */}
                    <Box sx={{ p: 2, bgcolor: 'background.paper' }}>
                        <TextField
                            fullWidth
                            placeholder="Ask me anything about task management..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            disabled={isTyping}
                            InputProps={{
                                endAdornment: (
                                    <IconButton 
                                        onClick={handleSend}
                                        disabled={isTyping || !input.trim()}
                                    >
                                        {isTyping ? (
                                            <CircularProgress size={24} />
                                        ) : (
                                            <Send />
                                        )}
                                    </IconButton>
                                )
                            }}
                        />
                    </Box>
                </Box>
            </Drawer>
        </>
    );
}

export default ChatBot;