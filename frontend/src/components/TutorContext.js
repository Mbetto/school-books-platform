import React, { createContext, useContext, useState } from 'react';

// Create the context
const TutorContext = createContext();

// Create a provider component
export const TutorProvider = ({ children }) => {
    const [tutors, setTutors] = useState([]);

    const addTutor = (tutor) => {
        setTutors((prevTutors) => [...prevTutors, tutor]);
    };

    const removeTutor = (id) => {
        setTutors((prevTutors) => prevTutors.filter((tutor) => tutor.id !== id));
    };

    return (
        <TutorContext.Provider value={{ tutors, addTutor, removeTutor }}>
            {children}
        </TutorContext.Provider>
    );
};

// Custom hook to use the TutorContext
export const useTutorContext = () => {
    return useContext(TutorContext);
};