import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext(null);

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [connectionError, setConnectionError] = useState(null);

    useEffect(() => {
        // Check if user is logged in (token exists)
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user') || 'null');

        if (token && user) {
            console.log('🔌 Attempting to connect socket...');
            
            // Connect to Socket.io Server
            const newSocket = io('http://localhost:5000', {
                auth: {
                    token: token
                },
                reconnection: true,
                reconnectionAttempts: 5,
                reconnectionDelay: 1000,
                reconnectionDelayMax: 5000,
                timeout: 20000,
                transports: ['websocket', 'polling'] // Try websocket first, fallback to polling
            });

            newSocket.on('connect', () => {
                console.log('✅ Socket Connected:', newSocket.id);
                setIsConnected(true);
                setConnectionError(null);
            });

            newSocket.on('disconnect', (reason) => {
                console.log('❌ Socket Disconnected. Reason:', reason);
                setIsConnected(false);
                
                // If disconnect was due to server closing, don't try to reconnect
                if (reason === 'io server disconnect') {
                    setConnectionError('Server disconnected. Please refresh the page.');
                }
            });

            newSocket.on('connect_error', (err) => {
                console.error('Socket Connection Error:', err.message);
                setConnectionError(err.message);
                setIsConnected(false);
            });

            // Handle authentication errors
            newSocket.on('error', (err) => {
                console.error('Socket Error:', err);
                if (err.message && err.message.includes('Authentication')) {
                    setConnectionError('Authentication failed. Please log in again.');
                    // Optionally clear token and redirect to login
                    // localStorage.removeItem('token');
                    // localStorage.removeItem('user');
                }
            });

            setSocket(newSocket);

            // Cleanup
            return () => {
                console.log('🧹 Cleaning up socket connection...');
                newSocket.removeAllListeners();
                newSocket.close();
                setSocket(null);
                setIsConnected(false);
            };
        } else {
            // If no token, ensure socket is null
            if (socket) {
                socket.close();
                setSocket(null);
                setIsConnected(false);
            }
        }
    }, []); // Only run once on mount - reconnect handled by socket.io

    /* New: Chat Initiation State */
    const [targetChat, setTargetChat] = useState(null); // { id, name, type }

    const startChat = (recipient) => {
        setTargetChat(recipient);
    };

    return (
        <SocketContext.Provider value={{ 
            socket, 
            isConnected, 
            connectionError,
            targetChat, 
            startChat, 
            setTargetChat 
        }}>
            {children}
        </SocketContext.Provider>
    );
};
