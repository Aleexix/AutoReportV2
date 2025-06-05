import { useState, useContext } from "react";
import { LanguageContext } from "../context/LanguageProvider";

const ModalComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const languageContext = useContext(LanguageContext);

  if (!languageContext) {
    throw new Error("ModalComponent debe estar dentro de un LanguageProvider");
  }

  const { language } = languageContext;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <button
        className="
          p-2 
          rounded-full 
          bg-gray-300 
          hover:bg-gray-400 
          text-black 
          transition duration-200 
          shadow-sm
          transform"
        title={language === "es" ? "Botón de ayuda" : "Help button"}
        onClick={openModal}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20px"
          height="20px"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M12 19H12.01M8.21704 7.69689C8.75753 6.12753 10.2471 5 12 5C14.2091 5 16 6.79086 16 9C16 10.6565 14.9931 12.0778 13.558 12.6852C12.8172 12.9988 12.4468 13.1556 12.3172 13.2767C12.1629 13.4209 12.1336 13.4651 12.061 13.6634C12 13.8299 12 14.0866 12 14.6L12 16"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Modal tipo tarjeta en la esquina inferior izquierda */}
      {isModalOpen && (
        <div className="fixed bottom-10 left-6 z-50 w-80 bg-white rounded-xl shadow-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-600">
          {/* Encabezado */}
          <div className="flex items-center justify-between p-4 border-b dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {language === "es" ? "Manual de ayuda" : "Help Manual"}
            </h3>
            <button
              type="button"
              className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
              onClick={closeModal}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 14 14"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1L13 13M13 1L1 13"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* Contenido del modal */}
          <div className="p-6 text-base text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900 h-96 overflow-y-auto rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold mb-4">
              🧾 {language === "es" ? "Manual de Usuario – AutoReport" : "User Manual – AutoReport"}
            </h2>
            <h3 className="font-semibold mb-2">
              🏠 {language === "es" ? "Página de Inicio (Index)" : "Home Page (Index)"}
            </h3>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>
                <strong>{language === "es" ? "Tu reporte:" : "Your report:"}</strong>{" "}
                {language === "es"
                  ? "genera el archivo automatizado del forecast con solo un clic."
                  : "generates the automated forecast file with just one click."}
              </li>
              <li>
                <strong>{language === "es" ? "Nosotros:" : "About us:"}</strong>{" "}
                {language === "es"
                  ? "muestra la información sobre la visión, las tecnologías y cómo se hizo."
                  : "shows information about the vision, technologies, and how it was built."}
              </li>
              <li>
                <strong>{language === "es" ? "Ayuda:" : "Help:"}</strong>{" "}
                {language === "es"
                  ? "es para ponerse en contacto con nosotros por correo."
                  : "is to contact us via email."}
              </li>
              <li>
                <strong>Budget:</strong>{" "}
                {language === "es"
                  ? "aquí puedes subir el archivo del budget para el forecast."
                  : "here you can upload the budget file for the forecast."}
              </li>
              <li>
                <strong>{language === "es" ? "Ícono de bandera:" : "Flag icon:"}</strong>{" "}
                {language === "es"
                  ? "cambia el idioma (Español / Inglés)."
                  : "switches the language (Spanish / English)."}
              </li>
              <li>
                <strong>{language === "es" ? "Ícono de sol/luna:" : "Sun/moon icon:"}</strong>{" "}
                {language === "es"
                  ? "cambia entre modo claro y oscuro."
                  : "switches between light and dark mode."}
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalComponent;
