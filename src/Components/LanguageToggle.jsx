import React from 'react';

const LanguageToggle = ({ toggleLanguage, currentLanguage }) => (
    <button className="languageButton" onClick={toggleLanguage}>
        {currentLanguage === "es" ? "EN" : "ES"}
    </button>
);

export default LanguageToggle;
