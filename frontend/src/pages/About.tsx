import { useContext, useState } from "react";
import { ThemeContext } from "../context/Themecontext";
import { LanguageContext } from "../context/LanguageProvider";

const About = () => {
    const themeContext = useContext(ThemeContext);
    const languageContext = useContext(LanguageContext);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isExpandedDocs, setIsExpandedDocs] = useState(false);

    if (!themeContext) {
        throw new Error("Index debe estar dentro de un ThemeProvider");
    }
    if (!languageContext) {
        throw new Error("MyComponent debe estar dentro de un LanguageProvider");
    }

    const { darkMode } = themeContext;
    const { language } = languageContext;

    const toggleReadMore = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setIsExpanded(!isExpanded);
    };

    const toggleReadMoreDocs = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setIsExpandedDocs(!isExpandedDocs);
    };
    return (
        <>
            <section className={`pt-20 overflow-hidden ${darkMode ? 'bg-body' : 'bg-white'}`}>
                <div className="container px-4 mx-auto">
                    {/* Imágenes de estrellas responsivas */}
                    <img className="hidden md:block absolute top-52 right-24 z-10 w-12 h-12 object-contain" src="src/assets/Images/star.svg" alt="" />
                    <img className="hidden md:block absolute top-80 right-32 z-10 w-12 h-12 object-contain" src="src/assets/Images/star2.svg" alt="" />

                    <div className="md:max-w-xl text-center mx-auto mb-12 mt-8">

                        <span className="inline-block mb-4 text-sm text-blueI font-medium tracking-tighter">
                            {language === 'es' ? 'Sobre Nosotros' : 'About Us'}
                        </span>
                        <h2 className={`text-4xl md:text-7xl tracking-tighter-xl ${darkMode ? 'text-white' : 'text-black'}`}>
                            {language === 'es' ? 'Nuestra visión, tecnología y equipo.' : 'Our vision, technology and team.'}
                        </h2><img className="absolute top-0 left-48 z-0 " src={`${darkMode ? 'src/assets/Images/layer-blur.svg' : ''}`} alt="" />
                    </div>

                    {/* Imagen de fondo responsiva */}
                    <img
                        className="absolute bottom-0  right-0"
                        src={`${darkMode ? 'src/assets/Images/lines2.svg' : 'src/assets/Images/Group_1.svg'}`}
                        alt=""
                    />

                    <div className="max-w-5xl mx-auto">
                        <div className="flex flex-wrap lg:items-center -m-4 lg:-m-12">
                            {/* Imagen principal responsiva */}
                            <div className="w-full md:w-1/2 p-4 lg:p-12">
                                <div className="max-w-full mx-auto">
                                    <img
                                        className="rounded-3xl w-full h-auto object-cover"
                                        src="src/assets/Images/freepik__background__77229.png"
                                        alt=""
                                    />
                                </div>
                            </div>

                            {/* Contenido de texto responsivo */}
                            <div className="w-full md:w-1/2 p-4 mt-8 md:mt-0 lg:p-12">
                                <span className="inline-block mb-4 text-sm text-blueI font-medium tracking-tighter">
                                    {language === 'es' ? 'Practicas en IBM' : 'Internships at IBM'}
                                </span>
                                <h2 className={`mb-6 text-3xl md:text-6xl tracking-tighter ${darkMode ? 'text-white' : 'text-black'}`}>
                                    {language === 'es' ? 'Practicantes con un objetivo claro' : 'Interns with a clear objective'}
                                </h2>

                                <p className={`mb-8 text-opacity-60 w-full max-w-md ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                    {language === 'es' ? 'Hola! nosotros somos practicantes de IBM en la unidad de ventas en el año 2025, este proyecto sale de una necesidad de automatizacion en la unidad, ' : 'Hello! We are IBM interns in the sales unit in 2025. This project stems from a need for automation in the unit,'}
                                </p>

                                {/* Lógica de expandir/contraer texto */}
                                {!isExpanded ? (
                                    <a
                                        className={`inline-block hover:text-opacity-80 font-medium underline transition duration-500 ${darkMode ? 'text-white' : 'text-black'}`}
                                        href="#"
                                        onClick={toggleReadMore}
                                    >
                                        {language === 'es' ? 'Leer mas' : 'Read more'}
                                    </a>
                                ) : (
                                    <>
                                        <p className={`mb-10 text-opacity-60 w-full max-w-md ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                            {language === 'es' ? 'reduciendo tareas repetitivas y mejorando la eficiencia del equipo. Buscamos implementar soluciones tecnológicas que faciliten el trabajo diario y permitan un acceso más rápido y preciso a la información.' : 'reducing repetitive tasks and improving team efficiency. We seek to implement technological solutions that facilitate daily work and allow faster and more accurate access to information.'}
                                            <br /> <br />
                                            {language === 'es' ? 'Nuestro objetivo es crear herramientas que simplifiquen la generación de reportes, asegurando mayor rapidez y precisión en la toma de decisiones. ¡Estamos emocionados por este reto y listos para innovar! 🚀' : 'Our goal is to create tools that simplify report generation, ensuring greater speed and precision in decision making. We are excited about this challenge and ready to innovate! 🚀'}
                                        </p>
                                        <a
                                            className={`inline-block hover:text-opacity-80 font-medium underline transition duration-500 ${darkMode ? 'text-white' : 'text-black'}`}
                                            href="#"
                                            onClick={toggleReadMore}
                                        >
                                            {language === 'es' ? 'Leer menos' : 'Read less'}
                                        </a>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sección de Documentación */}
            <section className={`py-20 overflow-hidden ${darkMode ? 'bg-body' : 'bg-white'}`}>
                <div className="container px-4 mx-auto">
                    <div className="flex flex-wrap items-center -m-4">
                        <div className="w-full md:w-1/2 p-4">
                            <div className="md:max-w-md">
                                <span className="inline-block mb-4 text-sm text-blueI font-medium tracking-tighter">
                                    {language === 'es' ? 'Documentacion' : 'Documentation'}
                                </span>
                                <h2 className={`mb-8 text-4xl md:text-6xl tracking-tighter-xl ${darkMode ? 'text-white' : 'text-black'}`}>
                                    {language === 'es' ? 'tecnologias y como se hizo' : 'Technologies and how it was made'}
                                </h2>
                                <p className={`mb-8 text-base md:text-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                    {language === 'es' ? 'En este proyecto se utilizaron estas tecnologias + IMB RPA, por el lado del FrontEnd se utilzo el framework de react+vite haciendo que el software fuera un poco mas rapido y para el BackEnd se utilizo python y para la automatizacion IBM RPA...' : 'In this project we used these technologies + IBM RPA. On the frontend side we used the React+Vite framework making the software a bit faster, and for the backend we used Python and for automation IBM RPA...'}
                                </p>

                                {/* Lógica de expandir/contraer texto */}
                                {!isExpandedDocs ? (
                                    <a
                                        className={`inline-block hover:text-opacity-80 font-medium underline transition duration-500 ${darkMode ? 'text-white' : 'text-black'}`}
                                        href="#"
                                        onClick={toggleReadMoreDocs}
                                    >
                                        {language === 'es' ? 'Leer mas' : 'Read more'}
                                    </a>
                                ) : (
                                    <>
                                        <p className={`mb-8 text-base md:text-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                            {language === 'es' ? 'Primero, se elaboró el cronograma y, con base en este, se inició el desarrollo del proyecto. Se establecieron los objetivos, alcance y requerimientos, seguidos de la creación de bocetos y maquetas de la interfaz. Luego, se implementó el frontend tomando en cuenta los diseños previos. Posteriormente, se definió la arquitectura del sistema y las APIs necesarias. Después, se desarrolló el bot en IBM RPA para la automatización. A continuación, se implementó el backend en Python, asegurando su correcto funcionamiento. Finalmente, se realizó la integración del bot RPA con el backend y este con el frontend, logrando la conexión completa del sistema.' : 'First, the schedule was developed and, based on this, project development began. Objectives, scope and requirements were established, followed by the creation of interface sketches and mockups. Then, the frontend was implemented taking into account previous designs. Subsequently, the system architecture and necessary APIs were defined. Next, the bot was developed in IBM RPA for automation. Then, the backend was implemented in Python, ensuring its proper functioning. Finally, the RPA bot was integrated with the backend and this with the frontend, achieving complete system connection.'}
                                        </p>
                                        <a
                                            className={`inline-block hover:text-opacity-80 font-medium underline transition duration-500 ${darkMode ? 'text-white' : 'text-black'}`}
                                            href="#"
                                            onClick={toggleReadMoreDocs}
                                        >
                                            {language === 'es' ? 'Leer menos' : 'Read less'}
                                        </a>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 p-4">
                            <div className="mx-auto max-w-lg md:mr-0">
                                <div className="flex flex-wrap -m-2">
                                    <div className="w-1/2 p-2">
                                        <div className="flex flex-wrap">
                                            <div className="mb-4 w-full">
                                                <img className="w-full h-auto object-contain" src="src/assets/Images/react-javascript-js-framework-facebook-svgrepo-com.svg" alt="" />
                                            </div>
                                            <div className="w-full">
                                                <img className="w-full h-auto object-contain" src="src/assets/Images/vite-svgrepo-com.svg" alt="" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-1/2 p-2">
                                        <div className="flex flex-wrap mt-12">
                                            <div className="mb-4 w-full">
                                                <img className="w-full h-auto object-contain" src="src/assets/Images/tailwind-svgrepo-com.svg" alt="" />
                                            </div>
                                            <div className="w-full">
                                                <img className="w-full h-auto object-contain" src="src/assets/Images/python-svgrepo-com.svg" alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sección de Equipo */}
            <section className={`relative pb-24 overflow-hidden ${darkMode ? 'bg-body' : 'bg-white'}`}>
                <div className="container px-4 mx-auto">
                    <div className="mb-10 md:max-w-xl text-center mx-auto">
                        <span className="inline-block mb-4 text-sm text-blueI font-medium tracking-tighter">
                            {language === 'es' ? 'nuestro equipo' : 'Our Team'}
                        </span>
                        <h2 className={`text-4xl md:text-7xl lg:text-8xl ${darkMode ? 'text-white' : 'text-black'}`}>
                            {language === 'es' ? 'Detalles' : 'Details'}
                        </h2>
                    </div>
                    <div className="flex flex-wrap justify-center items-center text-center -m-4">
                        <div className="w-full sm:w-1/2 lg:w-1/3 p-4">
                            <div className="text-center">
                                <img
                                    className="mb-6 mx-auto w-72 h-72 rounded-full object-cover"
                                    src="src/assets/Images/Team.jpg"
                                    alt="Imagen de Alexix CEO de el software"
                                />
                                <span
                                    className={`inline-block mb-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
                                >
                                    FullStack and CEO at AutoReport
                                </span>
                                <h3
                                    className={`text-2xl md:text-3xl ${darkMode ? 'text-white' : 'text-black'}`}
                                >
                                    Team
                                </h3>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </>
    );
};

export default About;