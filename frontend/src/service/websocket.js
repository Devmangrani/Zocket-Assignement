let socket = null;
const subscribers = new Set();

export const initializeWebSocket = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
        return socket;
    }

    try {
        socket = new WebSocket('wss://real-time-task-management-system-backend.onrender.com');
        
        socket.addEventListener('open', () => {
            console.log('WebSocket Connected');
        });

        socket.addEventListener('error', (error) => {
            console.error('WebSocket Error:', error);
        });

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            subscribers.forEach(callback => callback(data));
        };

        socket.onclose = () => {
            console.log('WebSocket Closed');
            socket = null;
            // Attempt to reconnect after delay
            setTimeout(() => initializeWebSocket(), 3000);
        };

        return socket;
    } catch (error) {
        console.error('WebSocket initialization error:', error);
        return null;
    }
};

export const closeWebSocket = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
        socket.close();
        socket = null;
    }
};

export const subscribeToUpdates = (callback) => {
    subscribers.add(callback);
    return () => subscribers.delete(callback);
};

export const sendWebSocketMessage = (message) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(message));
    }
};
