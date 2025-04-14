import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';
import './LiveSession.scss';

const LiveSession = ({ sessionId, tutorId }) => {
  const { theme } = useTheme();
  const [sessionStatus, setSessionStatus] = useState('connecting');
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [participants, setParticipants] = useState(0);
  const [sessionTime, setSessionTime] = useState(0);
  const messagesEndRef = useRef(null);

  // Simulate connecting to a live session
  useEffect(() => {
    const timer = setTimeout(() => {
      setSessionStatus('active');
      setParticipants(3); // Simulate participants joining
      
      // Simulate initial messages
      setMessages([
        { id: 1, text: 'Welcome to the live session!', sender: 'system', timestamp: new Date() },
        { id: 2, text: 'Please ask your questions here.', sender: 'tutor', timestamp: new Date() }
      ]);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Session timer
  useEffect(() => {
    let interval;
    if (sessionStatus === 'active') {
      interval = setInterval(() => {
        setSessionTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [sessionStatus]);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: Date.now(),
        text: newMessage,
        sender: 'tutor',
        timestamp: new Date()
      };
      setMessages([...messages, message]);
      setNewMessage('');
      
      // Simulate student response after 1-3 seconds
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          {
            id: Date.now() + 1,
            text: 'Thanks for the explanation!',
            sender: 'student',
            timestamp: new Date()
          }
        ]);
      }, 1000 + Math.random() * 2000);
    }
  };

  const handleEndSession = () => {
    setSessionStatus('ended');
    setMessages(prev => [
      ...prev,
      { id: Date.now(), text: 'Session has ended.', sender: 'system', timestamp: new Date() }
    ]);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className={`live-session ${theme}`}>
      <div className="session-header">
        <h2>Live Session #{sessionId}</h2>
        <div className="session-meta">
          <span className="status-badge">{sessionStatus}</span>
          <span>{participants} participants</span>
          <span>{formatTime(sessionTime)}</span>
        </div>
      </div>

      {sessionStatus === 'connecting' ? (
        <div className="connecting-message">
          <div className="spinner"></div>
          <p>Connecting to session...</p>
        </div>
      ) : sessionStatus === 'ended' ? (
        <div className="session-ended">
          <h3>Session Ended</h3>
          <p>This session has concluded. You can review the chat below.</p>
        </div>
      ) : (
        <>
          <div className="chat-container">
            {messages.map(message => (
              <div 
                key={message.id} 
                className={`message ${message.sender}`}
              >
                <div className="message-sender">
                  {message.sender === 'tutor' ? 'You' : 
                   message.sender === 'student' ? 'Student' : 'System'}
                </div>
                <div className="message-text">{message.text}</div>
                <div className="message-time">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="message-input">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              disabled={sessionStatus !== 'active'}
            />
            <button 
              onClick={handleSendMessage}
              disabled={!newMessage.trim() || sessionStatus !== 'active'}
            >
              Send
            </button>
            <button 
              className="end-session"
              onClick={handleEndSession}
              disabled={sessionStatus !== 'active'}
            >
              End Session
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default LiveSession;