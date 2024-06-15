import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    console.log("Logging out...");
    navigate('/login')
  };

  return (
    <nav className="navbar">
      <a href="/register" className="site-title">StuToTu</a>
      <ul>
        <li>
          <a href="/Profile">My Profile</a>
        </li>
        <li>
          <a href="/Calendar">Shared Calendar</a>
        </li>
        <li>
          <a href="/Settings">Settings</a>
        </li>
      </ul>
      <div className="dropdown">
      <button className="dropbtn" onClick={toggleDropdown}> Dropdown </button>
      <div className={`dropdown-content ${dropdownOpen ? 'show' : ''}`}>
        <a href="/ProfileEdit">Edit Profile</a>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  </nav>
);
};

export default Navbar;