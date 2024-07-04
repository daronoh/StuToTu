import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Navbar = () => {
  const { getUser, logout, getRole } = useAuth();
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const navigate = useNavigate();
  const user = getUser();

  const toggleSideNav = () => {
    setSideNavOpen(!sideNavOpen);
  };

  const handleLogout = () => {
    logout(); // Call logout function from useAuth
    navigate('/login');
  };

  const handleProfile = () => {
    const userId = getUser();
    navigate(`/profile/${userId}`);
  };

  if (!user) {
    return null;
  } else {
  return (
    <div>
      <nav className="navbar">
        <button className="sidenavbar" onClick={toggleSideNav}>
          &#9776;
        </button>
        <Link to="/Home" className="site-title">StuToTu</Link>
        <ul className={`nav-links ${sideNavOpen ? 'hidden' : ''}`}>
          <li>
              <button onClick={() => navigate('/home')} className="link-button">Home</button>
            </li>
            {getRole() === "STUDENT" && (
              <li>
                <button onClick={() => navigate('/search')} className="link-button">Search</button>
              </li>
            )}
            <li>
              <button onClick={handleProfile} className="link-button">My Profile</button>
            </li>
            <li>
              <button onClick={() => navigate('/calendar')} className="link-button">Shared Calendar</button>
            </li>
            <li>
              <button onClick={() => navigate(`/profile/edit`)} className="link-button">Settings</button>
            </li>
            
            <li>
              <button onClick={handleLogout} className="logout-button">Logout</button>
            </li>
        </ul>
      </nav>
      <div className={`side-nav ${sideNavOpen ? 'open' : ''}`}>
        <button className="closebtn" onClick={toggleSideNav}>&times;</button>
          <button onClick={() => navigate('/home')} className="link-button">Home</button>
          <button onClick={handleProfile} className="link-button">My Profile</button>
          <button onClick={() => navigate('/calendar')} className="link-button">Shared Calendar</button>
          <button onClick={() => navigate(`/profile/edit`)} className="link-button">Settings</button>
          <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
  }
}

export default Navbar;
