import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, TextField, Button, Avatar, List, ListItem, ListItemAvatar, ListItemText, CircularProgress } from '@mui/material';
import { useAuth } from '../../hooks/useAuth';
import api from '../../utils/api';
import './ChatDashboard.scss';

const ChatDashboard = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await api.get('/chat/conversations');
        setConversations(response.data);
        if (response.data.length > 0) {
          setActiveConversation(response.data[0].id);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load conversations');
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, [user]);

  useEffect(() => {
    if (activeConversation) {
      const fetchMessages = async () => {
        try {
          const response = await api.get(`/chat/conversations/${activeConversation}/messages`);
          setMessages(response.data);
        } catch (err) {
          setError(err.response?.data?.message || 'Failed to load messages');
        }
      };

      fetchMessages();
    }
  }, [activeConversation]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const response = await api.post(`/chat/conversations/${activeConversation}/messages`, {
        content: newMessage
      });
      setMessages([...messages, response.data]);
      setNewMessage('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send message');
    }
  };

  if (loading) return <CircularProgress sx={{ display: 'block', mx: 'auto', my: 4 }} />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box className="chat-dashboard-container">
      <Box className="conversation-list">
        <Typography variant="h6" sx={{ p: 2 }}>Conversations</Typography>
        <List>
          {conversations.map(conv => (
            <ListItem 
              key={conv.id} 
              button 
              selected={conv.id === activeConversation}
              onClick={() => setActiveConversation(conv.id)}
            >
              <ListItemAvatar>
                <Avatar src={conv.participants.find(p => p.id !== user.id)?.avatar} />
              </ListItemAvatar>
              <ListItemText 
                primary={conv.participants.find(p => p.id !== user.id)?.name}
                secondary={conv.lastMessage?.content}
              />
            </ListItem>
          ))}
        </List>
      </Box>
      <Box className="chat-container">
        {activeConversation ? (
          <>
            <Box className="messages-container">
              {messages.map(message => (
                <Box 
                  key={message.id} 
                  className={`message ${message.sender.id === user.id ? 'sent' : 'received'}`}
                >
                  <Avatar src={message.sender.avatar} sx={{ mr: 1 }} />
                  <Box className="message-content">
                    <Typography variant="body1">{message.content}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(message.createdAt).toLocaleTimeString()}
                    </Typography>
                  </Box>
                </Box>
              ))}
              <div ref={messagesEndRef} />
            </Box>
            <form onSubmit={handleSendMessage} className="message-input">
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Type a message"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <Button 
                type="submit" 
                variant="contained" 
                sx={{ ml: 1 }}
                disabled={!newMessage.trim()}
              >
                Send
              </Button>
            </form>
          </>
        ) : (
          <Box className="no-conversation">
            <Typography>Select a conversation to start chatting</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ChatDashboard;