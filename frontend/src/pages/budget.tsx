import { useContext, useRef } from "react";
import { ThemeContext } from "../context/Themecontext";
import { LanguageContext } from "../context/LanguageProvider";

const Budget = () => {
  const themeContext = useContext(ThemeContext);
  const languageContext = useContext(LanguageContext);
  const fileInputRef = useRef<HTMLInputElement>(null); // Especifica el tipo aquí

  if (!themeContext) {
    throw new Error("CenteredButton debe estar dentro de un ThemeProvider");
  }

  if (!languageContext) {
    throw new Error("CenteredButton debe estar dentro de un LanguageProvider");
  }

  const { darkMode } = themeContext;
  const { language } = languageContext;

  const handleButtonClick = () => {
    // Añade verificación de null
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];

    try {
      const formData = new FormData();
      formData.append("budgetFile", file);

      const response = await fetch("http://localhost:5000/process-budget", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error al procesar el archivo");
      }

      const result = await response.json();
      alert(
        language === "es"
          ? "Archivo procesado correctamente"
          : "File processed successfully"
      );
    } catch (error) {
      console.error("Error:", error);
      alert(
        language === "es"
          ? "Error al procesar el archivo"
          : "Error processing file"
      );
    }
  };

  return (
    <section
      className={`h-screen flex items-center justify-center ${darkMode ? "bg-body" : "bg-white"
        }`}
    >
      <div className="text-center">
        <img
          className="absolute top-0 left-48 z-0 "
          src={darkMode ? "src/assets/Images/layer-blur.svg" : ""}
          alt=""
        />
        <div className="mb-20">
          <h2
            className={`-mt-32 text-7xl tracking-tighter ${darkMode ? "text-white" : "text-black"
              }`}
          >
            {language === "es" ? "Subir archivo Budget" : "Upload Budget File"}
          </h2>
          <h5 className={`mt-10 text-1xl tracking-tighter ${darkMode ? "text-gray-400" : "text-black"
              }`}
          >
          {language === "es" 
            ? "Carga el archivo con el nombre de Consol_Input_Budget para procesarlo automáticamente. Asegúrate de que tenga una hoja llamada 'budget'." 
            : "Upload the file named Consol_Input_Budget to process it automatically. Make sure it has a sheet named 'budget'."}
          </h5>
        </div>

        <img
          className="absolute bottom-0 right-0 w-1/2 md:w-auto"
          src={
            darkMode
              ? "src/assets/Images/lines2.svg"
              : "src/assets/Images/Group_1.svg"
          }
          alt=""
        />
        <img className="hidden md:block absolute top-60 right-32 z-10 w-12 h-16 object-contain" src="src/assets/Images/star.svg" alt="" />
        <img className="hidden md:block absolute top-44 right-32 z-15 w-26 h-12 object-contain" src="src/assets/Images/star2.svg" alt="" />

        <div className="flex justify-center items-center">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".xlsx,.xls,.xlsm"
            style={{ display: "none" }}
          />
          <button
            onClick={handleButtonClick}
            className="px-10 py-4 rounded-full text-lg font-semibold tracking-wide transition-transform transform hover:scale-105 border-2 border-blueI bg-blueI text-black focus:ring-4 focus:ring-blueI focus:ring-opacity-40"
          >
            {language === "es" ? "Seleccionar archivo" : "Select File"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Budget;