import React, { createContext, useContext, useReducer } from 'react';

// Create a context
const AppContext = createContext();

// Custom hook to use the context
export const useAppContext = () => {
    return useContext(AppContext);
};

// Context provider component
export const AppProvider = ({ reducer, initialState, children }) => {
    return (
        <AppContext.Provider value={useReducer(reducer, initialState)}>
            {children}
        </AppContext.Provider>
    );
};