// ChatBot.js
import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { fetchAIResponse } from '../../services/ai';
import './ChatBot.scss';

const ChatBot = ({ tutorMode = false }) => {
  const { theme } = useTheme();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [file, setFile] = useState(null);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);

  // Initial bot message
  useEffect(() => {
    setMessages([
      {
        id: 1,
        text: tutorMode 
          ? "Hello Tutor! How can I assist you today?" 
          : "Hello! I'm your homework helper. You can ask questions or upload files.",
        sender: 'bot',
        timestamp: new Date()
      }
    ]);
  }, [tutorMode]);

  // Auto-scroll and resize
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    adjustTextareaHeight();
  }, [messages, input]);

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  };

  const handleSend = async () => {
    if (!input.trim() && !file) return;

    const userMessage = {
      id: Date.now(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
      ...(file && { file: file.name })
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setFile(null);
    setIsSending(true);
    setIsTyping(true);

    try {
      // For real implementation, you would send this to your backend
      const response = await fetchAIResponse(input);
      
      const botMessage = {
        id: Date.now() + 1,
        text: response.answer || "I couldn't process your request. Please try again.",
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      const botMessage = {
        id: Date.now() + 1,
        text: "Sorry, I encountered an error. Please try again later.",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    } finally {
      setIsSending(false);
      setIsTyping(false);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      if (!input.trim()) {
        setInput(`I uploaded a ${selectedFile.name} file for help`);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    setMessages([{
      id: Date.now(),
      text: tutorMode 
        ? "Hello Tutor! How can I assist you today?" 
        : "Hello! I'm your homework helper. You can ask questions or upload files.",
      sender: 'bot',
      timestamp: new Date()
    }]);
    setFile(null);
  };

  return (
    <div className={`chat-bot ${theme}`}>
      <div className="chat-bot__header">
        {tutorMode ? 'Tutor Assistant' : 'Homework Helper'}
        <button className="clear-chat" onClick={clearChat} title="Clear chat">
          <svg viewBox="0 0 24 24" width="16" height="16">
            <path fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
          </svg>
        </button>
      </div>
      
      <div className="chat-bot__messages">
        {messages.map(message => (
          <div 
            key={message.id} 
            className={`chat-bot__message chat-bot__message--${message.sender}`}
          >
            {message.file && (
              <div className="message-file">
                <span className="file-icon">📎</span>
                {message.file}
              </div>
            )}
            {message.text && <div className="message-content">{message.text}</div>}
            <div className="message-time">
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        ))}
        {(isTyping || isSending) && (
          <div className="chat-bot__message chat-bot__message--bot">
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-bot__input">
        {file && (
          <div className="file-preview">
            {file.name}
            <button onClick={() => setFile(null)}>×</button>
          </div>
        )}
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={tutorMode ? "Type your message to students..." : "Ask a question or describe your problem..."}
          rows="1"
        />
        <div className="chat-bot__actions">
          <button 
            type="button" 
            className="file-upload"
            onClick={() => fileInputRef.current.click()}
            title="Upload file"
          >
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path fill="currentColor" d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
            </svg>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              style={{ display: 'none' }}
            />
          </button>
          <button 
            onClick={handleSend} 
            disabled={(!input.trim() && !file) || isSending}
            className={(!input.trim() && !file) || isSending ? 'disabled' : ''}
          >
            {isSending ? (
              <div className="spinner"></div>
            ) : (
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path fill="currentColor" d="M2,21L23,12L2,3V10L17,12L2,14V21Z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;