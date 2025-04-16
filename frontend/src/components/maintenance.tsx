import { useContext } from "react";
import "../Global.css";
import { ThemeContext } from "../context/Themecontext";
import { LanguageContext } from "../context/LanguageProvider";

const Maintenance = () => {
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
<>
<section className={`py-2 ${ darkMode ? 'bg-body' : 'bg-white'}`}>
        <div className="container px-4 mx-auto ">
          <div className={`relative pt-20 px-4 overflow-hidden rounded-3xl ${darkMode ? ' bg-gray-800 bg-opacity-20' : 'bg-gray-900'}`}>
            <div className="text-center md:max-w-xl mx-auto removed pb-20"><span className="inline-block mb-4 text-sm text-blueI font-medium tracking-tighter">{language === 'es' ? 'Redes de comunicacion':'Communication networks'}</span>
              <h2 className="font-heading mb-6 text-7xl text-white tracking-8xl">{language === 'es' ? '¿Necesitas Ayuda?':'Do you need help?'}</h2>
              <div>
                <p  className="mb-8 text-gray-300 relative z-10">{language === 'es' ? 'Estos son los canales por los cuales te puedes comunicar para solicitar soporte o ayuda.':'These are the channels through which you can communicate for support or help.'}</p>
              </div>
              <div className="flex justify-center mt-8">
                    <div className="flex space-x-6 z-20">
                        <a href="https://www.slack.com" target="_blank" rel="noopener noreferrer">
                            <img src="src/assets/Images/slack-svgrepo-com.svg" className="w-10 h-10" alt="Facebook" />
                        </a>
                        <a href="mailto:Alexix.Orostegui@ibm.com" target="_blank" rel="noopener noreferrer">
                            <img src="src/assets/Images/ms-outlook-svgrepo-com.svg" className="w-10 h-10" alt="Outlook" />
                        </a>

                        <a href="https://www.github.com" target="_blank" rel="noopener noreferrer">
                            <img src="src/assets/Images/github-svgrepo-com.svg" className="w-10 h-10" alt="Twitter/X" />
                        </a>
                       
                    </div>
                </div><img className="absolute -bottom-24 right-0 z-0" src="src/Images/lines2.png" alt=""/>
            </div>
          </div>
        </div>
      </section>
</>
    );

}
export default Maintenance;