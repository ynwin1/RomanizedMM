import React, { useState } from 'react';
import LanguageContext from './LanguageContext';
export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('en');  // Start with English as the default language

    // Function to toggle between English and Burmese
    const toggleLanguageMode = () => {
        setLanguage(prevLanguage =>
            (prevLanguage === 'en' ? 'mm' : 'en'));
    };

    // Providing the current state and the function to toggle it
    return (
        <LanguageContext.Provider value={{ language, toggleLanguageMode }}>
            {children}
        </LanguageContext.Provider>
    );
};
