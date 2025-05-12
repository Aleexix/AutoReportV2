import { Link } from "react-router-dom";
import React, { useContext, useState } from "react";
import { ThemeContext } from '../context/Themecontext';
import { LanguageContext, LanguageToggle } from "../context/LanguageProvider";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const themeContext = useContext(ThemeContext);
  const languageContext = useContext(LanguageContext);

  if (!themeContext) {
    throw new Error("Navbar debe estar dentro de un ThemeProvider");
  }
  if (!languageContext) {
    throw new Error("Navbar debe estar dentro de un LanguageProvider");
  }

  const { darkMode, toggleTheme } = themeContext;
  const { language } = languageContext;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { 
      to: "/sobre nosotros", 
      label: { es: 'Nosotros', en: 'About us' } 
    },
    { 
      to: "/contactanos", 
      label: { es: 'Ayuda', en: 'Help' } 
    }
    
  ];

  return (
    <div className={`${darkMode ? 'bg-body' : 'bg-white'} w-full`}>
      <p className={`py-3 md:py-4 ${darkMode ? 'bg-blueO' : 'bg-blueO'} text-white text-center text-base md:text-base`}>
        {language === 'es' 
          ? '¿Quieres ahorrar tiempo con reportes automáticos? ¡Sin duda!' 
          : 'Want to save time with automatic reports? Absolutely!'}
      </p>
      <section className="relative overflow-visible">
        <div className="px-4 md:px-4 lg:px-6">
          <div className="flex items-center justify-between pt-4 md:pt-6 -m-2">
            {/* Logo */}
            <div className="w-auto p-2 ml-2 md:ml-6 lg:ml-12">
              <a className="relative z-10 inline-block" href="/">
                <img 
                  src={darkMode ? "/Frame 1 (5).svg" : "/Frame 1 (6).svg"} 
                  alt="Logo"
                  className="h-10 md:h-10" 
                />
              </a>
            </div>
            
            {/* Desktop Navigation */}
            <div className="p-2 z-20 flex items-center">
              <div className="flex flex-wrap items-center">
                <nav className="w-auto hidden lg:block">
                  <ul className="flex items-center mr-4 md:mr-8 lg:mr-12">
                    {navLinks.map((link) => (
                      <li 
                        key={link.to} 
                        className={`mr-6 md:mr-8 lg:mr-12 ${darkMode ? 'text-white' : 'text-black'} font-medium hover:text-opacity-90 tracking-tighter`}
                      >
                        <Link to={link.to}>{link.label[language]}</Link>
                      </li>
                    ))}
                  </ul>
                </nav>
                <div className=" w-auto hidden lg:block">
                  <div className="flex items-center">
                    <Link
                      className={`inline-block px-6 py-3 md:px-8 md:py-4 ${darkMode ? 'text-white' : 'text-black'} hover:text-black tracking-tighter hover:bg-blueI border-2 border-blueI focus:border-blueI focus:border-opacity-40 hover:border-blueI focus:ring-4 focus:ring-blueI focus:ring-opacity-40 rounded-full transition duration-300`}
                      to="/"
                    >
                      {language === 'es' ? 'Tu reporte' : 'Your report'}
                    </Link>
                    <div className="flex items-center justify-center">
                      <div className="ml-4 md:ml-12 lg:ml-14">
                        <LanguageToggle />
                      </div>
                      <button
                        onClick={toggleTheme}
                        className="ml-4 md:ml-2 p-2 text-white bg-blueI hover:bg-blue rounded-full transition duration-300"
                        aria-label={language === 'es' ? 'Cambiar tema' : 'Toggle theme'}
                      >
                        {darkMode ? (
                          // Sun icon (Dark mode)
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <circle cx="12" cy="12" r="5"></circle>
                            <line x1="12" y1="1" x2="12" y2="3"></line>
                            <line x1="12" y1="21" x2="12" y2="23"></line>
                            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                            <line x1="1" y1="12" x2="3" y2="12"></line>
                            <line x1="21" y1="12" x2="23" y2="12"></line>
                            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                          </svg>
                        ) : (
                          // Moon icon (Light mode)
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Mobile Menu Button */}
              <div className="flex items-center lg:hidden">
                <div className="mr-4 scale-125">
                  <LanguageToggle />
                </div>
                <button
                  onClick={toggleTheme}
                  className="p-3 mr-4 text-white bg-blueI hover:bg-blue rounded-full transition duration-300"
                  aria-label={language === 'es' ? 'Cambiar tema' : 'Toggle theme'}
                >
                  {darkMode ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="5"></circle>
                      <line x1="12" y1="1" x2="12" y2="3"></line>
                      <line x1="12" y1="21" x2="12" y2="23"></line>
                      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                      <line x1="1" y1="12" x2="3" y2="12"></line>
                      <line x1="21" y1="12" x2="23" y2="12"></line>
                      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                    </svg>
                  )}
                </button>
                <button
                  className="p-3 text-gray-600 focus:outline-none"
                  onClick={toggleMenu}
                  aria-label={language === 'es' ? 'Abrir menú' : 'Open menu'}
                >
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke={darkMode ? "white" : "currentColor"}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {isMenuOpen ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    )}
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className={`lg:hidden ${darkMode ? 'bg-body' : 'bg-white'} absolute z-30 w-full`}>
            <div className="px-4 pt-4 pb-6 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`block px-4 py-3 text-lg font-medium ${darkMode ? 'text-white hover:bg-gray-800' : 'text-black hover:bg-gray-100'} rounded-md`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label[language]}
                </Link>
              ))}
              <Link
                to="/"
                className="block px-4 py-3 text-lg font-medium text-white bg-blueI hover:bg-blue rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                {language === 'es' ? 'Tu reporte' : 'Your report'}
              </Link>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Navbar;