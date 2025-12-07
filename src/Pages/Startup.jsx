import React from 'react'
import { Link } from 'react-router-dom'   // 👈 IMPORTANT
import './style.css'

const Startup = () => {
  return (
    <div id="startup-page">
      <nav className="startup-nav">
        <h1>CollabX</h1>

        <div className="services">
          <Link to="/">Home</Link>
          <Link to="/startup">StartUps</Link>
          <Link to="/corporates">Corporates</Link>
          <Link to="/support">Support</Link>
          <Link to="/login">Login</Link>
        </div>
      </nav>

      
    </div>
  )
}

export default Startup
