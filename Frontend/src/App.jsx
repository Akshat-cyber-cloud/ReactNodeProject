import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './index.css';

import Navbar from './Components/Navbar.jsx';
import Hero from './Components/Hero.jsx';
import Section1 from './Components/Section1.jsx';
import Section2 from './Components/Section2.jsx';
import Footer from './Components/Footer.jsx';
import Loader from './Components/Loader.jsx';

import Startup from './Pages/Startup.jsx';
import StartHero from './Pages/StartHero.jsx';
import FloatingLines from './Pages/FloatingLines.jsx';
import StartServices from './Pages/StartServices.jsx';
import WhyChooseUs from './Pages/WhyChooseUs.jsx';
import Review from './Pages/Review.jsx';
import Corporate from './Corporates/Corporate.jsx';
import StartupSignup from './Pages/StartupSignup.jsx';
import CorporateSignup from './Pages/CorporateSignup.jsx';
import Login from './Pages/Login.jsx';

import { SocketProvider } from './context/SocketContext';
import ChatWidget from './Components/Chat/ChatWidget';

const App = () => {
  const [loading, setLoading] = useState(() => window.location.pathname === '/');

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 4000); // 4 seconds for the animation cycle
      return () => clearTimeout(timer);
    }
  }, [loading]);

  return (
    <SocketProvider>
      <Router>
        <div className="App">
          <Loader showLoader={loading} />
          {!loading && (
            <>
              <Routes>
                <Route path="/" element={
                  <>
                    <Navbar />
                    <Hero />
                    <Section1 />
                    <Section2 />
                    <Footer />
                  </>
                }
                />

                <Route path="/startup" element={
                  <>
                    <FloatingLines mixBlendMode="normal" />
                    <Startup />
                    <StartHero />
                    <StartServices />
                    <WhyChooseUs />
                    <Review />
                  </>
                }
                />

                <Route path="/corporate" element={<Corporate />} />
                <Route path="/startup-signup" element={<StartupSignup />} />
                <Route path="/corporate-signup" element={<CorporateSignup />} />
                <Route path="/login" element={<Login />} />
              </Routes>

              {/* Global Chat Widget */}
              <ChatWidget />
            </>
          )}
        </div>
      </Router>
    </SocketProvider>
  );
};

export default App;
