import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./Global.css";
import Navbar from "./components/Navbar";
import Footer from "./components/footer";
import Index from "./pages/Index";
import Maintenance from "./components/maintenance";
import About from "./pages/About";
import ContactUs from "./pages/Contact us";
import Budget from "./pages/budget";
import ScrollToTop from './components/ScrollTop';
import { ThemeProvider } from "./context/Themecontext";
import { LanguageProvider } from "./context/LanguageProvider";
import { ToastContainer } from "react-toastify";




function App() {
  return (
    <Router>
      <ThemeProvider>
        <LanguageProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/sobrenosotros" element={<About />} />
            <Route path="/contactanos" element={<ContactUs />} />
            <Route path="/budget" element={<Budget/>} />
          </Routes>
          <ScrollToTop />
          <Maintenance />
          <Footer />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </LanguageProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
