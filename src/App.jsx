import React from 'react'
import './index.css'
import Navbar from './Components/Navbar.jsx'
import Hero from './Components/Hero.jsx'
import Aurora from './Components/Aurora.jsx';
import Section1 from './Components/Section1.jsx';

const App = () => {
  return (
    <div>
      <Aurora
        colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
        blend={0.5}
        amplitude={1.0}
        speed={0.5}
      />
      <Navbar />
      <Hero />
      <Section1 />
    </div>
  )
}

export default App