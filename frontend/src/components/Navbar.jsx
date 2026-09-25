import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navItems = [
    { name: '01 — HOME', path: '/' },
    { name: '02 — ABOUT', path: '/about' },
    { name: '03 — RESEARCH', path: '/research' },
    { name: '04 — PUBLICATIONS', path: '/publications' },
    { name: '05 — ACHIEVEMENTS', path: '/achievements' },
    { name: '06 — CONTACT', path: '/contact' }
  ];

  return (
    <nav className="desktop-navbar">
      <div className="navbar-container">
        <div className="logo-section">
          <span className="logo-text">DR. K. GILBERT ROSS REX</span>
        </div>
        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink 
                to={item.path}
                className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
