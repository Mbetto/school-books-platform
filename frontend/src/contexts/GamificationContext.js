import React, { createContext, useState, useContext } from 'react';

const GamificationContext = createContext();

export const GamificationProvider = ({ children }) => {
    const [points, setPoints] = useState(0);
    const [badges, setBadges] = useState([]);

    const addPoints = (newPoints) => {
        setPoints((prevPoints) => prevPoints + newPoints);
    };

    const addBadge = (badge) => {
        setBadges((prevBadges) => [...prevBadges, badge]);
    };

    return (
        <GamificationContext.Provider value={{ points, badges, addPoints, addBadge }}>
            {children}
        </GamificationContext.Provider>
    );
};

export const useGamification = () => {
    return useContext(GamificationContext);
};