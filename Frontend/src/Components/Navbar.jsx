import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import '../index.css'

const Navbar = () => {
  const { user, userType, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div id='main'>
      <nav>
        <h1>CollabX</h1>
        <div className="services">
          <Link to="/">Home</Link>
          {/* <Link to="/startup">StartUps</Link>
          <Link to="/corporate">Corporates</Link> */}
          {isAuthenticated ? (
            <>
              <span className="user-info">
                 {userType === 'startup' ? (user?.founderName || user?.companyName) : (user?.contactPerson || user?.companyName)}
                <span className="user-badge"></span>
              </span>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </nav>
    </div>
  )
}

export default Navbar