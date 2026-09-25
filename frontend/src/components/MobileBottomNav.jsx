import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, User, Microscope, FileText, Award, Mail } from 'lucide-react';
import './MobileBottomNav.css';

const MobileBottomNav = () => {
  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'About', path: '/about', icon: User },
    { name: 'Research', path: '/research', icon: Microscope },
    { name: 'Pubs', path: '/publications', icon: FileText },
    { name: 'Awards', path: '/achievements', icon: Award },
    { name: 'Contact', path: '/contact', icon: Mail }
  ];

  return (
    <nav className="mobile-bottom-nav glass-panel">
      <ul className="mobile-nav-links">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.path}>
              <NavLink 
                to={item.path}
                className={({ isActive }) => isActive ? "mobile-nav-link active" : "mobile-nav-link"}
              >
                <Icon size={20} strokeWidth={1.5} />
                <span>{item.name}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default MobileBottomNav;
