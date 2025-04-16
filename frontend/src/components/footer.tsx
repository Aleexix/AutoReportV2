import { useContext } from "react";
import { ThemeContext } from "../context/Themecontext";
import "../Global.css";
import { LanguageContext } from "../context/LanguageProvider";
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>;
<link rel="preconnect" href="https://fonts.gstatic.com"></link>;
<link href="https://fonts.googleapis.com/css2?family=Fredoka+One&family=Play&display=swap" rel="stylesheet"> </link>;

const Footer = () => {
    const themeContext = useContext(ThemeContext);
    const languageContext = useContext(LanguageContext);
      
        if (!themeContext) {
          throw new Error("Navbar debe estar dentro de un ThemeProvider");
        }
        if (!languageContext) {
            throw new Error("MyComponent debe estar dentro de un LanguageProvider");
          }
      
        const { darkMode} = themeContext;

        const { language } = languageContext;
      
    return (
        <footer className= {`overflow-hidden ${darkMode ? 'bg-gray-50 ' : 'bg-body'} `} >
            <div className= {`py-12  border-none rounded-b-7xl ${darkMode ? 'bg-body': 'bg-white'} `}></div>
            <div className="py-8">

                {/* Menú de navegación */}
                <div className="mt-6 text-center">
                    <ul className={`flex justify-center space-x-8 ${darkMode ? 'text-black ': 'text-white'}`} >
                        <li className="hover:text-blueI"><a href="/contactanos">{language === 'es' ? 'Ayuda':'Help'}</a></li>
                        <li className="hover:text-blueI"><a href="/sobre nosotros">{language === 'es' ? 'Nosotros':'About'}</a></li>
                        <li className="hover:text-blueI"><a href="/semanal">{language === 'es' ? 'Historico':'Historic'}</a></li>
                        <li className="hover:text-blueI"><a href="/">{language === 'es' ? 'Tu reporte':'your report'}</a></li>
                    </ul>
                </div>
                {/* Derechos de autor */}
                <div className={`mt-6 text-center ${darkMode ? ' text-gray-600 ': ' text-gray-400'}`}>    
                    {language === 'es' ? 'AutoReport Copyright © 2025 AutoReport - Todos los derechos reservados || Diseñado por: Alexix.O':'AutoReport Copyright © 2025 AutoReport - All rights reserved || Designed by: Alexix. OR'}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
