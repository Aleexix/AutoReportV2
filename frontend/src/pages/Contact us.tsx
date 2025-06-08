import { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../context/Themecontext";
import { LanguageContext } from "../context/LanguageProvider";
import { FormEvent } from "react";

const ContactUs = () => {
  const themeContext = useContext(ThemeContext);
  const languageContext = useContext(LanguageContext);
  
  // Estado para manejar el envío del formulario
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  if (!themeContext) {
    throw new Error("Weekly debe estar dentro de un ThemeProvider");
  }
  if (!languageContext) {
    throw new Error("MyComponent debe estar dentro de un LanguageProvider");
  }

  const { darkMode } = themeContext;
  const { language } = languageContext;

  // Efecto para limpiar el mensaje después de 5 segundos
  useEffect(() => {
    if (submitStatus) {
      const timer = setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  // Función para manejar el envío del formulario
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto
    setIsSubmitting(true);
    setSubmitStatus(null);

    const form = e.currentTarget;

    try {
      const formData = new FormData(form);
      
      const response = await fetch('https://formsubmit.co/f7e1a95426b3f6013500f3f5f9f70ba4', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        setSubmitStatus('success');
        form.reset(); // Limpiar el formulario
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error al enviar formulario:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section className={`py-20 overflow-hidden ${darkMode ? 'bg-body' : 'bg-white'}`}>
        <form onSubmit={handleSubmit}>
          <div className="container px-4 mx-auto">
            <img
              className="absolute bottom-0 right-0 w-1/2 md:w-auto"
              src={`${darkMode ? 'src/assets/Images/lines2.svg' : 'src/assets/Images/Group_1.svg'}`}
              alt=""
            />
            <img className="hidden md:block absolute top-40 right-32 z-10 w-12 h-16 object-contain" src="src/assets/Images/star.svg" alt="" />
            <img className="hidden md:block absolute top-56 right-32 z-15 w-26 h-12 object-contain" src="src/assets/Images/star2.svg" alt="" />
            
            <div className="md:max-w-4xl text-center mx-auto">
              <span className="inline-block mb-4 text-sm text-blueI font-medium tracking-tighter">
                {language === 'es' ? 'Envianos un mensaje' : 'Send us a message'}
              </span>
              
              <h2 className={`mb-8 text-7xl lg:text-7xl tracking-7xl lg:tracking-8xl ${darkMode ? 'text-white' : 'text-black'}`}>
                {language === 'es' ? 'Envíanos un mensaje y nuestro equipo te responderá' : 'Send us a message and our team will respond to you'}
              </h2>
              
              <p className={`mb-20 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {language === 'es' ? 'AutoReport es un software creado para automatizar el reporte semanal.' : 'AutoReport is software created to automate the weekly report.'}
              </p>

              {/* Mensaje de estado */}
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                  {language === 'es' ? '¡Mensaje enviado exitosamente!' : 'Message sent successfully!'}
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                  {language === 'es' ? 'Error al enviar el mensaje. Inténtalo de nuevo.' : 'Error sending message. Please try again.'}
                </div>
              )}

              <div className="flex flex-wrap -m-2 mb-10">
                <div className="w-full z-10 md:w-1/2 p-2">
                  <div className={`mb-2 border overflow-hidden rounded-3xl ${darkMode ? 'border-white focus-within:border-blueI' : 'border-black focus-within:border-blueI'}`}>
                    <input 
                      className={`${darkMode ? 'pl-6 pr-16 py-4 text-gray-300 w-full placeholder-gray-400 outline-none bg-transparent' : 'pl-6 pr-16 py-4 text-black w-full placeholder-gray-400 outline-none bg-transparent'}`} 
                      type="text" 
                      name="Nombre" 
                      placeholder={language === 'es' ? 'Nombre' : 'Name'} 
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <img className="absolute top-0 left-48 z-0" src={`${darkMode ? 'src/assets/Images/layer-blur.svg' : ''}`} alt="" />
                </div>
                
                <div className="w-full z-10 md:w-1/2 p-2">
                  <div className={`mb-2 border overflow-hidden rounded-3xl ${darkMode ? 'border-white focus-within:border-blueI' : 'border-black focus-within:border-blueI'}`}>
                    <input 
                      className={`${darkMode ? 'pl-6 pr-16 py-4 text-gray-300 w-full placeholder-gray-400 outline-none bg-transparent' : 'pl-6 pr-16 py-4 text-black w-full placeholder-gray-400 outline-none bg-transparent'}`} 
                      type="text" 
                      name="Apellido" 
                      placeholder={language === 'es' ? 'Apellido' : 'Last Name'} 
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
                
                <div className="w-full md:w-1/2 p-2">
                  <div className={`mb-2 border overflow-hidden rounded-3xl ${darkMode ? 'border-white focus-within:border-blueI' : 'border-black focus-within:border-blueI'}`}>
                    <input 
                      className={`${darkMode ? 'pl-6 pr-16 py-4 text-gray-300 w-full placeholder-gray-400 outline-none bg-transparent' : 'pl-6 pr-16 py-4 text-black w-full placeholder-gray-400 outline-none bg-transparent'}`} 
                      type="email" 
                      name="Correo" 
                      placeholder={language === 'es' ? 'Correo' : 'Email'} 
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
                
                <div className="w-full md:w-1/2 p-2">
                  <div className={`mb-2 border overflow-hidden rounded-3xl ${darkMode ? 'border-white focus-within:border-blueI' : 'border-black focus-within:border-blueI'}`}>
                    <input 
                      className={`${darkMode ? 'pl-6 pr-16 py-4 text-gray-300 w-full placeholder-gray-400 outline-none bg-transparent' : 'pl-6 pr-16 py-4 text-black w-full placeholder-gray-400 outline-none bg-transparent'}`} 
                      type="text" 
                      name="Unidad" 
                      placeholder={language === 'es' ? 'Unidad' : 'Unit'} 
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
                
                <div className="w-full md:w-1/2 p-2">
                  <div className={`relative mb-2 border overflow-hidden rounded-3xl ${darkMode ? 'border-white focus-within:border-blueI' : 'border-black focus-within:border-blueI'}`}>
                    <select
                      className={`${darkMode ? 'appearance-none pl-6 pr-16 py-4 text-gray-300 w-full placeholder-gray-400 outline-none bg-transparent' : 'pl-6 pr-16 py-4 text-black w-full placeholder-gray-400 outline-none bg-transparent'}`}
                      name="Ubicacion" 
                      required
                      disabled={isSubmitting}
                    >
                      <option value="" hidden>{language === 'es' ? 'Locación' : 'Location'}</option>
                      <option className="text-gray-700" value="Colombia">Colombia</option>
                      <option className="text-gray-700" value="Venezuela">Venezuela</option>
                      <option className="text-gray-700" value="LCR">LCR</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap justify-center max-w-xs mx-auto mb-6">
                <button 
                  type="submit" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  <span className={`block px-14 py-4 text-center tracking-2xl border-2 border-blueI bg-blueI hover:bg-blueI text-black focus:ring-4 focus:ring-blueI focus:ring-opacity-40 rounded-full transition-transform duration-300 transform hover:scale-105 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    {isSubmitting 
                      ? (language === 'es' ? 'Enviando...' : 'Sending...') 
                      : (language === 'es' ? 'Enviar' : 'Send')
                    }
                  </span>
                </button>
              </div>
              
              {/* Campos ocultos para FormSubmit */}
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_subject" value="Nuevo mensaje desde AutoReport" />
              
              <p className={`text-sm max-w-xs mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {language === 'es' ? 'Su información será utilizada de acuerdo con nuestra Política de privacidad. Usted se puede comunicar en cualquier momento' : 'Your information will be used in accordance with our Privacy Policy. You can contact us at any time'}
              </p>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default ContactUs;