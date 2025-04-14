// src/context/TutorContext.js
import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const TutorContext = createContext();

export const TutorProvider = ({ children }) => {
  const [tutorData, setTutorData] = useState({
    earnings: 0,
    documents: [],
    sessions: [],
    students: []
  });

  // ... rest of your code ...
};

export const useTutor = () => useContext(TutorContext);