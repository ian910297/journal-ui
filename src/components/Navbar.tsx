import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar: React.FC = () => {
  return (
    <header className="app-header">
      <nav className="nav-left">
        <Link to="/">Home</Link>
        <Link to="/posts">Blog</Link>
        <Link to="/whoami">whoami</Link>
      </nav>
      <div className="site-title">
        Chung-Yi.Chi's website
      </div>
      <nav className="nav-right">
        <a href="#">Github</a>
      </nav>
    </header>
  );
};

export default Navbar;
