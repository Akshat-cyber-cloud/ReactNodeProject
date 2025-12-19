import React, { useState, useEffect, useRef } from 'react';
import { useSocket } from '../../context/SocketContext';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, User } from 'lucide-react';
import './ChatWidget.css'; // Import the new CSS

const ChatWidget = () => {
  const { socket, targetChat, setTargetChat } = useSocket();
  const [isOpen, setIsOpen] = useState(false);
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const messagesEndRef = useRef(null);
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  // Handle "Start Chat" from other components
  useEffect(() => {
    if (targetChat && user) {
      setIsOpen(true);
      const userIdStr = String(user._id);
      const targetIdStr = String(targetChat.id);

      // 1. Check if we already have this chat open as activeChat
      if (activeChat && activeChat.participants.some(p => String(p.id) === targetIdStr)) {
        setTargetChat(null); // Clear request
        return;
      }

      // 2. Check if we have it in our list
      const existing = chats.find(c => c.participants.some(p => String(p.id) === targetIdStr));
      if (existing) {
        // Format the chat to ensure all IDs are strings
        const formattedChat = {
          ...existing,
          _id: String(existing._id),
          participants: existing.participants.map(p => ({
            ...p,
            id: String(p.id)
          })),
          messages: existing.messages.map(msg => ({
            ...msg,
            senderId: String(msg.senderId),
            _id: msg._id ? String(msg._id) : new Date().getTime().toString()
          }))
        };
        setActiveChat(formattedChat);
      } else {
        console.log("Creating temp chat for UI. Target:", targetChat);
        // Create temporary chat object for UI
        setActiveChat({
          _id: 'temp_' + Date.now(),
          participants: [
            { id: userIdStr, type: user.type || 'unknown' }, // Me
            { id: targetIdStr, type: targetChat.type, name: targetChat.name } // Them
          ],
          messages: []
        });
      }
      // Clear the target so this doesn't run again loopingly
      setTargetChat(null);
    }
  }, [targetChat, chats, user, activeChat, setTargetChat]);

  // Fetch chats on load
  useEffect(() => {
    if (user && socket) {
      fetchChats();
    }
  }, [user, socket, isOpen]);

  // Listen for incoming messages and errors
  useEffect(() => {
    if (!socket) return;

    const handleReceiveMessage = (data) => {
      console.log('ChatWidget: Received message', data);
      // data: { chatId, message, senderId, senderName }

      // Ensure chatId is string for comparison
      const chatId = String(data.chatId);

      // Update chat list to show new message preview
      fetchChats();

      // If viewing this chat, append message
      if (activeChat && String(activeChat._id) === chatId) {
        setActiveChat(prev => ({
          ...prev,
          messages: [...prev.messages, data.message]
        }));
        scrollToBottom();
      }
    };

    // Listen for my own sent messages (confirmation)
    const handleMessageSent = (data) => {
      console.log('ChatWidget: Message sent confirmed', data);

      if (activeChat) {
        const chatId = String(data.chatId);
        
        // Update ID if we were in a temp chat
        if (activeChat._id.toString().startsWith('temp_') && chatId) {
          setActiveChat(prev => ({ ...prev, _id: chatId }));
        }

        if (String(activeChat._id) === chatId || activeChat._id.toString().startsWith('temp_')) {
          setActiveChat(prev => {
            let newMessages = [...prev.messages];

            // If we have a clientTempId, find that message
            if (data.clientTempId) {
              const idx = newMessages.findIndex(m => m._id === data.clientTempId);
              if (idx !== -1) {
                // Replace with confirmed message from server
                newMessages[idx] = data.message;
                return { ...prev, messages: newMessages, _id: chatId };
              }
            }

            // Fallback: If not found (or no tempId), just append if not duplicate
            const exists = newMessages.some(m => {
              const msgTimestamp = new Date(m.timestamp).getTime();
              const dataTimestamp = new Date(data.message.timestamp).getTime();
              return Math.abs(msgTimestamp - dataTimestamp) < 1000 && m.content === data.message.content;
            });
            
            if (!exists) {
              newMessages.push(data.message);
            }

            return { ...prev, messages: newMessages, _id: chatId };
          });
          scrollToBottom();
        }
      }
      fetchChats();
    };

    // Handle socket errors
    const handleError = (error) => {
      console.error('ChatWidget: Socket error', error);
      // Remove pending message if we have a clientTempId
      if (error.clientTempId && activeChat) {
        setActiveChat(prev => ({
          ...prev,
          messages: prev.messages.filter(m => m._id !== error.clientTempId)
        }));
      }
      // You could show a toast notification here
      alert(`Error: ${error.message || 'Failed to send message'}`);
    };

    socket.on('receive_message', handleReceiveMessage);
    socket.on('message_sent', handleMessageSent);
    socket.on('error', handleError);

    return () => {
      socket.off('receive_message', handleReceiveMessage);
      socket.off('message_sent', handleMessageSent);
      socket.off('error', handleError);
    };
  }, [socket, activeChat]);


  const fetchChats = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/chats', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      if (Array.isArray(data)) {
        // Format all chats to ensure IDs are strings for consistent comparison
        const formattedChats = data.map(chat => ({
          ...chat,
          _id: String(chat._id),
          participants: chat.participants.map(p => ({
            ...p,
            id: String(p.id) // Convert ObjectId to string
          })),
          messages: chat.messages.map(msg => ({
            ...msg,
            senderId: String(msg.senderId),
            _id: msg._id ? String(msg._id) : new Date().getTime().toString()
          }))
        }));
        setChats(formattedChats);
      }
    } catch (err) {
      console.error("Failed to fetch chats", err);
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (!messageInput.trim() || !activeChat || !socket) {
      if (!socket) {
        alert('Socket not connected. Please refresh the page.');
      }
      return;
    }

    // Check if socket is connected
    if (!socket.connected) {
      alert('Not connected to server. Please wait for connection...');
      return;
    }

    // Determine recipient - ensure both IDs are strings for comparison
    const userIdStr = String(user._id);
    const recipient = activeChat.participants.find(p => {
      const participantIdStr = String(p.id);
      return participantIdStr !== userIdStr;
    });
    
    if (!recipient) {
      console.error('Recipient not found in chat participants');
      console.error('Current user ID:', userIdStr);
      console.error('Chat participants:', activeChat.participants.map(p => ({ id: String(p.id), type: p.type })));
      alert('Error: Could not determine recipient. Please refresh and try again.');
      return;
    }
    
    // Ensure recipient ID is a string
    const recipientIdStr = String(recipient.id);
    console.log('Sending message - User ID:', userIdStr, 'Recipient ID:', recipientIdStr);

    const content = messageInput.trim();
    const clientTempId = 'opt_' + Date.now();

    // 1. Optimistic Update
    const optimisticMsg = {
      _id: clientTempId,
      senderId: String(user._id),
      content: content,
      timestamp: new Date(),
      read: false,
      pending: true // Flag for UI
    };

    setActiveChat(prev => ({
      ...prev,
      messages: [...prev.messages, optimisticMsg]
    }));
    setTimeout(scrollToBottom, 50);

    // 2. Emit to Server - ensure all IDs are strings
    socket.emit('send_message', {
      recipientId: recipientIdStr, // Use the already-converted string
      recipientType: recipient.type || 'unknown',
      recipientName: recipient.name || 'Unknown',
      senderName: user.companyName || user.founderName || user.contactPerson || 'User',
      content: content,
      clientTempId: clientTempId
    });

    setMessageInput('');
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Format info
  const getParticipantName = (chat) => {
    const userIdStr = String(user._id);
    const p = chat.participants.find(part => String(part.id) !== userIdStr);
    return p ? (p.name || 'Unknown User') : 'Unknown User';
  }

  if (!user) return null; // Don't show if not logged in

  return (
    <div className="chat-widget-container">

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="chat-window"
          >
            {/* Header */}
            <div className="chat-header">
              <h3>
                {activeChat ? getParticipantName(activeChat) : 'Messages'}
              </h3>
              <div className="chat-header-controls">
                {activeChat && (
                  <button onClick={() => setActiveChat(null)} className="back-btn">
                    Back
                  </button>
                )}
                <button onClick={() => setIsOpen(false)} className="close-btn">
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="chat-body">

              {!activeChat ? (
                // --- LIST OF CHATS ---
                <div className="chat-list">
                  {chats.length === 0 ? (
                    <div className="empty-state">No messages yet.</div>
                  ) : (
                    chats.map(chat => (
                      <div
                        key={chat._id}
                        onClick={() => { 
                          // Ensure messages and participants are properly formatted when selecting chat
                          const formattedChat = {
                            ...chat,
                            _id: String(chat._id),
                            participants: chat.participants.map(p => ({
                              ...p,
                              id: String(p.id) // Convert ObjectId to string
                            })),
                            messages: chat.messages.map(msg => ({
                              ...msg,
                              senderId: String(msg.senderId),
                              _id: msg._id ? String(msg._id) : new Date().getTime().toString()
                            }))
                          };
                          setActiveChat(formattedChat); 
                          setTimeout(scrollToBottom, 100); 
                        }}
                        className="chat-item"
                      >
                        <div className="chat-avatar">
                          <User size={20} />
                        </div>
                        <div className="chat-info">
                          <div className="chat-name">{getParticipantName(chat)}</div>
                          <div className="chat-preview">
                            {chat.messages.length > 0 ? chat.messages[chat.messages.length - 1].content : 'No messages'}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              ) : (
                // --- ACTIVE CHAT MESSAGES ---
                <div className="messages-container">
                  {activeChat.messages.map((msg, idx) => {
                    // Ensure consistent ID comparison
                    const msgSenderId = String(msg.senderId);
                    const userIdStr = String(user._id);
                    const isMe = msgSenderId === userIdStr;
                    return (
                      <div key={msg._id || idx} className={`message-wrapper ${isMe ? 'me' : 'them'}`}>
                        <div
                          className={`message-bubble ${isMe ? 'me' : 'them'}`}
                          style={{ opacity: msg.pending ? 0.7 : 1 }}
                        >
                          {msg.content}
                        </div>
                      </div>
                    )
                  })}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* Footer (Input) */}
            {activeChat && (
              <form onSubmit={sendMessage} className="chat-footer">
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="Type a message..."
                  className="chat-input"
                />
                <button
                  type="submit"
                  disabled={!messageInput.trim()}
                  className={`send-btn ${messageInput.trim() ? 'active' : ''}`}
                >
                  <Send size={18} />
                </button>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Launcher Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="chat-launcher"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </motion.button>
    </div>
  );
};

export default ChatWidget;
