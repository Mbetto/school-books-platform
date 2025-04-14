// src/components/auth/TutorRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const TutorRoute = ({ children }) => {
  const { user } = useAuth();
  
  if (!user?.isTutor) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default TutorRoute;