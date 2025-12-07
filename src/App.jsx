import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './index.css';

import Navbar from './Components/Navbar.jsx';
import Hero from './Components/Hero.jsx';
import Aurora from './Components/Aurora.jsx';
import Section1 from './Components/Section1.jsx';


import Startup from './Pages/Startup.jsx';
import StartHero from './Pages/StartHero.jsx';
import FloatingLines from './Pages/FloatingLines.jsx';
import StartServices from './Pages/StartServices.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <>
            <Navbar />
            <Aurora />
            <Hero />
            <Section1 />
          </>
        }
        />

        <Route path="/startup" element={
          <>
            <FloatingLines />
            <Startup />
            <StartHero />
            <StartServices />
          </>
        }
        />
      </Routes>
    </Router>
  );
};

export default App;
