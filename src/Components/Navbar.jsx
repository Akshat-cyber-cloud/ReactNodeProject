import React from 'react'
import { Link } from "react-router-dom";
import '../index.css'

const Navbar = () => {
  return (
    <div id='main'>
      <nav>
        <h1>CollabX</h1>
        <div className="services">
          <Link to="/">Home</Link>
          <Link to="/startup">StartUps</Link>
          <Link to="">Corporates</Link>
          <Link to="">Support</Link>
          <Link to="">Login</Link>
        </div>
      </nav>
    </div>
  )
}

export default Navbar