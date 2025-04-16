import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';

interface LanguageContextType {
  language: 'es' | 'en';
  toggleLanguage: () => void;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<'es' | 'en'>('es');

  // Cargar idioma desde localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage === 'en' || savedLanguage === 'es') {
      setLanguage(savedLanguage);
    }
  }, []);

  // Alternar entre español e inglés
  const toggleLanguage = () => {
    setLanguage(prevLanguage => {
      const newLanguage = prevLanguage === 'es' ? 'en' : 'es';
      localStorage.setItem('language', newLanguage);
      return newLanguage;
    });
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// **Componente para el botón de cambio de idioma**
export const LanguageToggle = () => {
  const languageContext = useContext(LanguageContext);

  if (!languageContext) {
    throw new Error("LanguageToggle debe estar dentro de un LanguageProvider");
  }

  const { language, toggleLanguage } = languageContext;

  return (
    <button
      onClick={toggleLanguage}
      className="mr-5 pt-2 transition-transform transform duration-300 hover:scale-110 focus:outline-none"
      aria-label={language === 'es' ? 'Cambiar a inglés' : 'Change to Spanish'}
    >
      <div className="w-9 h-9 overflow-hidden rounded-full border border-gray-200 shadow-sm">
        {language === 'es' ? (
          <img src="src/assets/Images/estados-unidos.png" alt="Bandera de EE.UU." />
        ) : (
          <img src="src/assets/Images/espana.png" alt="Bandera de España" />
        )}
      </div>
    </button>
  );
};
