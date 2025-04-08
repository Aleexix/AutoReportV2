import { Link } from "react-router-dom";
import "../Global.css";
import React, { useContext } from "react";
import { ThemeContext } from '../context/Themecontext';
import { LanguageContext } from "../context/LanguageProvider";

const Index: React.FC = () => {
  const themeContext = useContext(ThemeContext);
  const languageContext = useContext(LanguageContext);

  if (!themeContext) {
    throw new Error("Index debe estar dentro de un ThemeProvider");
  }
  if (!languageContext) {
    throw new Error("Index debe estar dentro de un LanguageProvider");
  }

  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Solo llamar a click si no es null
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      console.log('Archivo seleccionado:', files[0]);
      // Aquí puedes manejar el archivo como desees
    }
  }; // Aquí se cierra la función correctamente

  const { darkMode } = themeContext;
  const { language } = languageContext;

  return (
    <>
      <div className={`relative pb-10 md:pb-5 ${darkMode ? 'bg-body' : 'bg-white'}`}>
        <div className="relative z-10 container px-4 mx-auto">
          <div className="max-w-5xl mx-auto">
            {/* Diseño Desktop Normal */}
            <div className="hidden md:flex flex-row items-center -m-4">
              <div className="w-1/2 p-4 order-1">
                <div className="p-8">
                  <img
                    className="rounded-3xl animate-float w-full h-auto"
                    src="src/assets/Images/freepik__background__34186.png"
                    alt="Dashboard Preview"
                  />
                </div>
              </div>

              <div className="w-1/2 p-4 order-2 space-y-6">
                <h2 className={`
                  text-6xl 
                  tracking-tighter text-left 
                  ${darkMode ? 'text-white' : 'text-black'}
                `}>
                  {language === 'es' ? 'Descarga hoy tu reporte semanal' : 'Download your weekly report today'}
                </h2>
                <div className="flex justify-start">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    style={{ display: 'none' }} // Ocultar el input
                  />
                  <button 
                    onClick={handleButtonClick}
                    className="
                      flex items-center 
                      px-8 py-4 
                      text-lg 
                      text-black 
                      font-medium 
                      tracking-tighter 
                      bg-blueI 
                      hover:bg-blue-700 
                      border-2 border-blueI 
                      focus:border-blueI focus:ring-4 focus:ring-blueI focus:ring-opacity-40 
                      rounded-full 
                      transition-transform duration-300 
                      transform hover:scale-105
                    ">
                    <svg className="fill-current w-5 h-5 mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                    </svg>
                    <span>{language === 'es' ? 'Ingresa Archivo EPM' : 'Enter EPM file'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Diseño Mobile - Pantalla Completa */}
            <div className="md:hidden flex flex-col items-center justify-center text-center space-y-8 py-12">
              <h2 className={`
                text-5xl sm:text-6xl 
                tracking-tight
                ${darkMode ? 'text-white' : 'text-black'}
              `}>
                {language === 'es' ? 'Descarga hoy tu reporte semanal' : 'Download your weekly report today'}
              </h2>
              
              <div className="w-full max-w-md">
                <img
                  className="rounded-3xl animate-float w-full h-auto"
                  src="src/assets/Images/freepik__background__34186.png"
                  alt="Dashboard Preview"
                />
              </div>

              <div className="flex justify-center w-full">
                <Link to={"#"}>
                  <button className="
                    flex items-center 
                    px-10 py-5 
                    text-xl 
                    text-black 
                    font-medium 
                    tracking-tighter 
                    bg-blueI 
                    hover:bg-blue-700 
                    border-2 border-blueI 
                    focus:border-blueI focus:ring-4 focus:ring-blueI focus:ring-opacity-40 
                    rounded-full 
                    transition-transform duration-300 
                    transform hover:scale-105
                  ">
                    <svg className="fill-current w-6 h-6 mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                    </svg>
                    <span>{language === 'es' ? 'Descargar' : 'Download'}</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Background decorations remain the same */}
        <img 
          className="absolute bottom-0 right-0 w-1/2 md:w-auto" 
          src={`${darkMode ? 'src/assets/Images/lines2.svg' : 'src/Images/Group 1.svg'}`} 
          alt="" 
        />
        <img className="hidden md:block absolute top-24 right-32 z-10 w-12 h-16 object-contain" src="src/assets/Images/star.svg" alt="" />
      <img className="hidden md:block absolute top-56 right-32 z-10 w-26 h-12 object-contain" src="src/assets/Images/star2.svg" alt="" />

      </div>
      
      {/* Recent Reports Section - Improved Mobile Responsiveness */}
      <section className={`pt-16 pb-16 ${darkMode ? 'bg-body' : 'bg-white'}`}>
        <div className="container px-4 mx-auto">
          <div className="text-center">
            <span className="inline-block mt-4 text-base sm:text-lg text-blueI font-medium tracking-tighter">
              {language === 'es' ? 'Recientes' : 'Recent'}
            </span>
            <h2 className={`
              mb-4 1|
              text-5xl sm:text-6xl md:text-6xl lg:text-7xl 
              tracking-tight 
              mx-auto 
              ${darkMode ? 'text-white' : 'text-black'}
            `}>
              {language === 'es' ? 'Últimos reportes disponibles' : 'Latest available reports'}
            </h2>
            <p className={`
              mb-12 
              text-base sm:text-lg 
              max-w-xl 
              mx-auto 
              ${darkMode ? 'text-gray-300' : 'text-gray-800'}
            `}>
              {language === 'es' 
                ? 'Aquí se generarán los reportes más recientes de los días Lunes y viernes.' 
                : 'Here are the most recent reports of Monday and Friday.'}
            </p>
          </div>

          {/* Reports Grid - More Responsive and Touch-Friendly */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
            {[1, 2, 3].map((_, index) => (
              <div 
                key={index} 
                className={`
                  relative 
                  flex flex-col 
                  rounded-[20px] 
                  w-full 
                  max-w-[500px] 
                  mx-auto 
                  bg-white 
                  border 
                  border-black 
                  ${darkMode 
                    ? 'shadow-lg hover:shadow-gray-500 hover:shadow-2xl' 
                    : 'shadow-lg hover:shadow-2xl hover:shadow-black'}
                  transition-all 
                  duration-300 
                  transform 
                  hover:-translate-y-2
                `}
              >
                <div className="h-full w-full p-6">
                  <div className="relative w-full">
                    <img 
                      src="src/assets/Images/opcion3.jpg" 
                      className="mb-4 w-full rounded-xl object-cover aspect-video" 
                      alt="Report Preview" 
                    />
                    <div className="absolute top-4 right-4 flex items-center justify-center rounded-full bg-blueO p-2">
                      <div className="flex h-full w-20 items-center justify-center rounded-full font-medium text-white text-base">
                        {index % 2 === 0 
                          ? (language === 'es' ? 'Lunes' : 'Monday') 
                          : (language === 'es' ? 'Viernes' : 'Friday ')}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div>
                      <p className="text-xl font-bold text-black">FORECAST</p>
                      <p className="text-base font-medium text-gray-600">10/03/2025</p>
                    </div>
                    <button className="
                      bg-greenE 
                      rounded-[20px] 
                      px-6 py-3 
                      text-base 
                      text-white 
                      hover:bg-green-600 
                      transition-transform 
                      duration-300 
                      transform 
                      hover:scale-105
                    ">
                      {language === 'es' ? 'Descargar' : 'Download'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Index;
