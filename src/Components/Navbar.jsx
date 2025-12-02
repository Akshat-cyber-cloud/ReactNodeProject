import React from 'react'
import '../index.css'

const Navbar = () => {
  return (
    <div id='main'>
        <nav>
            <h1>CollabX</h1>
            <div className="services">
                <a href="#">Services</a>
                <a href="#">StartUps</a>
                <a href="#">Corporates</a>
                <a href="#">Support</a>
                <a href="#">Login</a>
            </div>
        </nav>
    </div>
  )
}

export default Navbar