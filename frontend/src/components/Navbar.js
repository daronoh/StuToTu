import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Navbar = () => {
  const { getUser } = useAuth();
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSideNav = () => {
    setSideNavOpen(!sideNavOpen);
  };

  const handleLogout = () => {
    console.log("Logging out...");
    navigate('/login')
  };

  const handleProfile = () => {
    // Replace with actual user ID or username
    const userId = getUser(); // Replace with logic to get current user ID

    // Navigate to the profile page with the user ID parameter
    navigate(`/profile/${userId}`);
  };

  return (
    <>
    <nav className="navbar">
      <button className="sidenavbar" onClick={toggleSideNav}>
            &#9776;
      </button>
      <a href="/register" className="site-title">StuToTu</a>
      <ul className={`nav-links ${sideNavOpen ? 'hidden' : ''}`}>
        <li>
          <a onClick={handleProfile}>My Profile</a>
        </li>
        <li>
          <a href="/Calendar">Shared Calendar</a>
        </li>
        <li>
          <a href="/Settings">Settings</a>
        </li>
        <li>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </nav>
      <div className={`side-nav ${sideNavOpen ? 'open' : ''}`}>
        <button className="closebtn" onClick={toggleSideNav}>&times;</button>
        <a onClick={handleProfile}>My Profile</a>
        <a href="/Calendar">Shared Calendar</a>
        <a href="/Settings">Settings</a>
        <a href="/ProfileEdit">Edit Profile</a>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </>
  );
};

export default Navbar;