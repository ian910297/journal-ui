import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import '../styles/Layout.css';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout-container">
      <Navbar />
      <div className="main-content-wrapper">
        <main className="main-content">{children}</main>
        <Sidebar />
      </div>
    </div>
  );
};

export default Layout;
