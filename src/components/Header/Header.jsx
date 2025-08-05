import React from 'react';
import { Link } from 'react-router-dom';
import logo1 from '../../assets/Logo_Kementerian_ESDM.png';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <img src={logo1} alt="Logo PPSDM Migas" className="logo-image" />
        <span className="logo-separator">BPSDM ESDM</span>
      </div>
      <nav className="nav">
        <Link to="/" className="home">Home</Link>
        <Link to="/comingsoon" className="tentang-kami">Tentang Kami</Link>
        <Link to="/comingsoon" className="kontak">Kontak</Link>
        <Link to="/auth" className="login">Login</Link>
      </nav>
    </header>
  );
};

export default Header;