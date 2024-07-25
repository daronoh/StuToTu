import { Logout, Settings } from '@mui/icons-material';
import { Avatar, Box, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip } from '@mui/material';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Navbar = () => {
  const { getUser, logout, getRole } = useAuth();
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const user = getUser();

  const toggleSideNav = () => {
    setSideNavOpen(!sideNavOpen);
  };

  const handleMenu = (e) => {
    setAnchorEl(e.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  const handleLogout = () => {
    logout(); // Call logout function from useAuth
    navigate('/login');
    handleClose();
  };

  const handleProfile = () => {
    const userId = getUser();
    navigate(`/profile/${userId}`);
    handleClose();
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
            <button onClick={() => navigate('/calendar')} className="link-button">Calendar</button>
          </li>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
              <Tooltip title="Account settings">
                <IconButton
                  onClick={handleMenu}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? 'account-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                >
                  <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                </IconButton>
              </Tooltip>
              </Box>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    '&::before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
              <MenuItem onClick={handleProfile} className="dropdown-item">
                <Avatar /> My Profile
              </MenuItem>
              <MenuItem onClick={() => navigate(`/profile/edit`)} className="dropdown-item">
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Settings
              </MenuItem>
              <Divider/>
              <MenuItem onClick={handleLogout} className="dropdown-item">
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </ul>
        </nav>
        <div className={`side-nav ${sideNavOpen ? 'open' : ''}`}>
          <button className="closebtn" onClick={toggleSideNav}>&times;</button>
          <button onClick={() => navigate('/home')} className="link-button">Home</button>
          <button onClick={handleProfile} className="link-button">My Profile</button>
          <button onClick={() => navigate(`/calendar`)} className="link-button">Calendar</button>
          <button onClick={() => navigate(`/profile/edit`)} className="link-button">Settings</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    );
  }
}


export default Navbar;
