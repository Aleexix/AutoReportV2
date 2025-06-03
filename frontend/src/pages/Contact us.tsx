import { useContext } from "react";
import { ThemeContext } from "../context/Themecontext";
import { LanguageContext } from "../context/LanguageProvider";


const ContactUs = () => {
  const themeContext = useContext(ThemeContext);
  const languageContext = useContext(LanguageContext);

  if (!themeContext) {
    throw new Error("Weekly debe estar dentro de un ThemeProvider");
  }
  if (!languageContext) {
    throw new Error("MyComponent debe estar dentro de un LanguageProvider");
  }

  const { darkMode } = themeContext;
  const { language } = languageContext;

  return (
    <>
      <section className={`py-20 overflow-hidden ${darkMode ? 'bg-body' : 'bg-white'}`}>
        <form action="https://formsubmit.co/f7e1a95426b3f6013500f3f5f9f70ba4" method="POST">
        <div className="container px-4 mx-auto">
          <img
          className="absolute bottom-0 right-0 w-1/2 md:w-auto"
          src={`${darkMode ? 'src/assets/Images/lines2.svg' : 'src/assets/Images/Group_1.svg'}`}
          alt=""
        />
        <img className="hidden md:block absolute top-40 right-32 z-10 w-12 h-16 object-contain" src="src/assets/Images/star.svg" alt="" />
        <img className="hidden md:block absolute top-56 right-32 z-15 w-26 h-12 object-contain" src="src/assets/Images/star2.svg" alt="" />
          <div className="md:max-w-4xl text-center mx-auto"><span className="inline-block mb-4 text-sm text-blueI font-medium tracking-tighter">{language === 'es' ? 'Envianos un mensaje' : 'send a message'}</span>
            <h2 className={` mb-8 text-7xl lg:text-7xl tracking-7xl lg:tracking-8xl ${darkMode ? 'text-white' : 'text-black'}`}> {language === 'es' ? 'Envíanos un mensaje y nuestro equipo te responderá' : 'Send us a message and our team will respond'} </h2>
            <p className={`mb-20 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{language === 'es' ? 'AutoReport es un software creado para automatizar el reporte semanal.' : 'AutoReport is a software created to automate the weekly report.'}</p>
            <div className="flex flex-wrap -m-2 mb-10">
              <div className="w-full z-10 md:w-1/2 p-2">
                <div className={`mb-2 border  overflow-hidden rounded-3xl ${darkMode ? 'border-white focus-within:border-blueI' : 'border-black focus-within:border-blueI'}`}>
                  <input className={`${darkMode ? 'pl-6 pr-16 py-4 text-gray-300 w-full placeholder-gray-400 outline-none bg-transparent' : 'pl-6 pr-16 py-4 text-black w-full placeholder-gray-400 outline-none bg-transparent'}`} type="text" name="name" placeholder={language === 'es' ? 'Nombre' : 'Name'} required/>
                </div><img className="absolute top-0 left-48 z-0 " src={`${darkMode ? 'src/assets/Images/layer-blur.svg' : ''}`} alt="" />
              </div>
              <div className="w-full z-10 md:w-1/2 p-2">
                <div className={`mb-2 border  overflow-hidden rounded-3xl ${darkMode ? 'border-white focus-within:border-blueI' : 'border-black focus-within:border-blueI'}`}>
                  <input className={`${darkMode ? 'pl-6 pr-16 py-4 text-gray-300 w-full placeholder-gray-400 outline-none bg-transparent' : 'pl-6 pr-16 py-4 text-black w-full placeholder-gray-400 outline-none bg-transparent'}`} type="text" name="name" placeholder={language === 'es' ? 'Apellido' : 'Last Name'} required/>
                </div>
              </div>
              <div className="w-full md:w-1/2 p-2">
                <div className={`mb-2 border  overflow-hidden rounded-3xl ${darkMode ? 'border-white focus-within:border-blueI' : 'border-black focus-within:border-blueI'}`}>
                  <input className={`${darkMode ? 'pl-6 pr-16 py-4 text-gray-300 w-full placeholder-gray-400 outline-none bg-transparent' : 'pl-6 pr-16 py-4 text-black w-full placeholder-gray-400 outline-none bg-transparent'}`} type="text" name="email" placeholder={language === 'es' ? 'Correo' : 'Email'} required/>
                </div>
              </div>
              <div className="w-full md:w-1/2 p-2">
                <div className={`mb-2 border  overflow-hidden rounded-3xl ${darkMode ? 'border-white focus-within:border-blueI' : 'border-black focus-within:border-blueI'}`}>
                  <input className={`${darkMode ? 'pl-6 pr-16 py-4 text-gray-300 w-full placeholder-gray-400 outline-none bg-transparent' : 'pl-6 pr-16 py-4 text-black w-full placeholder-gray-400 outline-none bg-transparent'}`} type="text" name="subject" placeholder={language === 'es' ? 'Unidad' : 'unity'} required/>
                </div>
              </div>
              <div className="w-full md:w-1/2 p-2">
                <div className={`relative mb-2 border overflow-hidden rounded-3xl ${darkMode ? ' border-white focus-within:border-blueI' : ' border-black focus-within:border-blueI'}`}>
                  <select
                    className={`${darkMode ? 'appearance-none pl-6 pr-16 py-4 text-gray-300 w-full placeholder-gray-400 outline-none bg-transparent' : 'pl-6 pr-16 py-4 text-black w-full placeholder-gray-400 outline-none bg-transparent'}`}
                  name="subject" required>
                    <option hidden>{language === 'es' ? 'Locación' : 'Location'} </option>
                    <option className="text-gray-700" >Colombia </option>
                    <option className="text-gray-700">Venezuela</option>
                    <option className="text-gray-700">LCR</option>
                  </select>

                </div>
              </div>
            </div>
            <div className="flex flex-wrap justify-center max-w-xs mx-auto mb-6">
              <button type="submit" className="w-full"><a className="block px-14 py-4 text-center  tracking-2xl border-2 border-blueI bg-blueI hover:bg-blueI text-black focus:ring-4 focus:ring-blueI focus:ring-opacity-40 rounded-full transition-transform duration-300 transform hover:scale-105" >Enviar</a></button>
            </div>
            <input type="hidden" name="_next" value="http://localhost:5173/contactanos"></input>
            <input type="hidden" name="_captcha" value="false"></input>
            <p className={`text-sm max-w-xs mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{language === 'es' ? 'Su información será utilizada de acuerdo con nuestra Política de privacidad. Usted se puede comunicar en cualquier momento' : 'Your information will be used in accordance with our Privacy Policy. You may communicate at any time'}</p>
          </div>
        </div>
        </form>
      </section>
    </>
  );

}

export default ContactUs;