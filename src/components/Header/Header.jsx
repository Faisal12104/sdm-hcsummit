import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import logo1 from '../../assets/Logo_Kementerian_ESDM.png';
import './Header.css';

const Header = ({ isLoggedIn = false, onToggleSidebar }) => {
  const [isCollapsed, setIsCollapsed] = useState(false); // desktop
  return (
    
    <header className="header">
      <div className="logo-container">
        {isLoggedIn && (
          <button className="burger-btn desktop-only" onClick={() => setIsCollapsed(!isCollapsed)}>
          <FaBars size={20} />
        </button>
      )}
        <img src={logo1} alt="Logo PPSDM Migas" className="logo-image" />
        <span className="logo-separator">BPSDM ESDM</span>
      </div>

      {/* Kalau belum login → tampilkan menu navigasi */}
      {!isLoggedIn && (
        <nav className="nav">
          <Link to="/" className="home">Home</Link>
          <Link to="/comingsoon" className="tentang-kami">Tentang Kami</Link>
          <Link to="/comingsoon" className="kontak">Kontak</Link>
          <Link to="/auth" className="login">Login</Link>
        </nav>
      )}

      {isLoggedIn && (
          <button className="burger-btn desktop-only" onClick={() => setIsCollapsed(!isCollapsed)}>
          <FaBars size={20} />
        </button>
      )}
      
    </header>
  );
};

export default Header;
