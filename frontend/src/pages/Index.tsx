import { Link } from "react-router-dom";
import "../Global.css";
import React, { useContext } from "react";
import { ThemeContext } from '../context/Themecontext';
import { LanguageContext } from "../context/LanguageProvider";
import { toast } from "react-toastify";
import ModalComponent from "../components/ModalComponent";
import Card from "../components/Grafica";

const Index: React.FC = () => {
  const themeContext = useContext(ThemeContext);
  const languageContext = useContext(LanguageContext);
  
  if (!themeContext) {
    throw new Error("Index debe estar dentro de un ThemeProvider");
  }
  if (!languageContext) {
    throw new Error("Index debe estar dentro de un LanguageProvider");
  }
  
  const { darkMode } = themeContext;
  const { language } = languageContext;
  
  // ⚡ Nueva función para procesar sin subir archivo
  const handleButtonClick = async () => {
    const loadingToast = toast.loading(language === 'es' ? "Procesando archivo..." : "Processing file...");
  
    try {
      const response = await fetch('http://localhost:5000/run-process', {
        method: 'POST',
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        toast.update(loadingToast, {
          render: language === 'es' ? `Error: ${errorData.error}` : `Error: ${errorData.error}`,
          type: "error",
          isLoading: false,
          autoClose: 5000,
        });
        return;
      }
  
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Systems HW - North SSA EPM ISC.xlsm';
      a.click();
  
      toast.update(loadingToast, {
        render: language === 'es' ? "Descarga finalizada" : "Download completed",
        type: "success",
        isLoading: false,
        autoClose: 4000,
      });
  
    } catch (error) {
      toast.update(loadingToast, {
        render: language === 'es' ? "Error en el servidor" : "Server error",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
  };

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
                <h2 className={`text-6xl tracking-tighter text-left ${darkMode ? 'text-white' : 'text-black'}`}>
                  {language === 'es' ? 'Descarga hoy tu reporte semanal' : 'Download your weekly report today'}
                </h2>
                <div className="flex justify-start items-center space-x-3">
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
                    "
                  >
                     <svg className="fill-current w-5 h-5 mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                    </svg>
                    <span>{language === 'es' ? 'Procesar Forecast' : 'Process Forecast'}</span>
                  </button>
                  <ModalComponent />
                </div>
              </div>
            </div>
            {/* Diseño Mobile - Pantalla Completa */}
            <div className="md:hidden flex flex-col items-center justify-center text-center space-y-8 py-12">
              <h2 className={`text-5xl sm:text-6xl tracking-tight ${darkMode ? 'text-white' : 'text-black'}`}>
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
        <img className="hidden md:block absolute top-56 right-32 z-15 w-26 h-12 object-contain" src="src/assets/Images/star2.svg" alt="" />
      </div>
      {/* New Reports Section - DashboardGastos Cards */}
      <section className={`pt-16 pb-16 ${darkMode ? 'bg-body' : 'bg-white'}`}>
        <div className="container px-4 mx-auto">
          <div className="text-center">
            <span className="inline-block mt-4 text-base sm:text-lg text-blueI font-medium tracking-tighter">
              {language === 'es' ? 'Recientes' : 'Recent'}
            </span>
            <h2 className={`mb-4 text-5xl sm:text-6xl md:text-6xl lg:text-7xl tracking-tight mx-auto ${darkMode ? 'text-white' : 'text-black'}`}>
              {language === 'es' ? 'Últimos reportes disponibles' : 'Latest available reports'}
            </h2>
            <p className={`mb-12 text-base sm:text-lg max-w-xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
              {language === 'es'
                ? 'Aquí se generarán los reportes más recientes de los días Lunes y viernes.'
                : 'Here are the most recent reports of Monday and Friday.'}
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <Card title="POWER" usd={0.74} w2w={-0.5} diff={0.24} direction="up" />
            <Card title="STORAGE" usd={1.24} w2w={0.2} diff={-0.18} direction="down" />
            <Card title="TOTAL Z" usd={0.95} w2w={0.1} diff={0.15} direction="up" />
          </div>
        </div>
      </section>
    </>
  );
}

export default Index;
