import { useState } from "react";

const ModalComponent = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

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
                title="Boton de ayuda"
                onClick={openModal}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none">
                    <path d="M12 19H12.01M8.21704 7.69689C8.75753 6.12753 10.2471 5 12 5C14.2091 5 16 6.79086 16 9C16 10.6565 14.9931 12.0778 13.558 12.6852C12.8172 12.9988 12.4468 13.1556 12.3172 13.2767C12.1629 13.4209 12.1336 13.4651 12.061 13.6634C12 13.8299 12 14.0866 12 14.6L12 16" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </button>

            {/* Modal tipo tarjeta en la esquina inferior izquierda */}
            {isModalOpen && (
                <div className="fixed bottom-10 left-6 z-50 w-80 bg-white rounded-xl shadow-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-600">
                    {/* Encabezado */}
                    <div className="flex items-center justify-between p-4 border-b dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Manual de ayuda
                        </h3>
                        <button
                            type="button"
                            className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
                            onClick={closeModal}
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
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

                    {/* Contenido */}
                    <div className="p-6 text-base text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900 h-96 overflow-y-auto rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
  <h2 className="text-xl font-semibold mb-4">📘 Guía para la descarga del archivo EPM</h2>
  <p className="mb-4">
    A continuación, se detallan los pasos necesarios para acceder y descargar el archivo requerido desde la plataforma EPM:
  </p>
  <ol className="list-decimal list-inside space-y-3">
    <li>
      Ingrese a{" "}
      <a
        href="https://w3.ibm.com/epm/app-prod/bi/?perspective=content&tab=teamContent&folder=i47BFB972345742C5936DA23E6AE48D8D"
        className="text-blue-600 dark:text-blue-400 underline font-medium"
        target="_blank"
        rel="noopener noreferrer"
      >
        este enlace
      </a>.
    </li>
    <li>En "Seleccionar un espacio de nombres", elija <strong>"W3id SSO"</strong>.</li>
    <li>Ingrese sus credenciales en caso de que el sistema las solicite.</li>
    <li>Espere a ser redirigido a la sección principal de contenido de EPM.</li>
    <li>Haga clic en la opción <strong>"Contenido del equipo"</strong>.</li>
    <li>Dentro del panel lateral, seleccione la sub-sección <strong>"Co-creation"</strong>.</li>
    <li>Desplácese hacia abajo y seleccione <strong>"EO Team"</strong>.</li>
    <li>Seleccione la carpeta <strong>"Production"</strong>.</li>
    <li>Dentro de ella, ingrese a <strong>"Production Final"</strong>.</li>
    <li>Luego, acceda a la sección <strong>"Forecast & Deals"</strong>.</li>
    <li>
      Busque y seleccione la cuarta opción:{" "}
      <strong>"EPM2-004 Opportunity Detail View IBM Sales W"</strong>.
    </li>
    <li>
      Seleccione el quarter correspondiente:
      <ul className="list-disc list-inside pl-5 mt-1 text-sm">
        <li><strong>CQ</strong>: Quarter actual</li>
        <li><strong>PQ</strong>: Quarter anterior</li>
        <li><strong>NQ</strong>: Próximo quarter</li>
      </ul>
    </li>
    <li>En la sección "Report Type", elija la opción <strong>"Daily"</strong>.</li>
    <li>
      Desplácese hasta la sección "Optional Columns" y seleccione desde{" "}
      <strong>"Opp Age"</strong> hasta <strong>"Mon3 Signings Rev"</strong>.
    </li>
    <li>Haga clic en el botón <strong>"Finalizar"</strong> ubicado al final de la página.</li>
    <li>
      En la parte superior, junto a los íconos de "Ejecutar" y "Renovar", haga clic en
      <strong> "HTML"</strong> y seleccione <strong>"Excel"</strong>.
    </li>
    <li>Espere a que el archivo se descargue correctamente.</li>
    <li>Una vez descargado, cargue el archivo en la plataforma web de <strong>AutoReport</strong>.</li>
  </ol>
</div>

                </div>
            )}
        </div>
    );
};

export default ModalComponent;
