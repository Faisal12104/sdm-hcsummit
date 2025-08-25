import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaUser,
  FaBuilding,
  FaFileAlt,
  FaSignOutAlt,
  FaHome,
  FaBars,
  FaUserCircle,
} from 'react-icons/fa';
import './SuperAdmin.css';
import Footer from '../../Footer/Footer';
import esdmLogo from '../../../assets/Logo_Kementerian_ESDM.png';
import struktur from '../../../assets/struktur.png';

const SuperAdmin = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/');
  };

  return (
    <div className="dashboard-super">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <button className="burger-btn desktop-only">
                      <FaBars size={20} />
                    </button>
          <img src={esdmLogo} alt="Kementerian ESDM" className="sidebar-logo" />
          <span className="logo-text">BPSDM ESDM</span>
        </div>

        <nav className="nav-links">
          <button className="active-link">
            <FaHome />
            <span>Dashboard</span>
          </button>
          <button onClick={() => navigate('/user')}>
            <FaUser />
            <span>Manajemen User</span>
          </button>
          <button onClick={() => navigate('/sektor')}>
            <FaBuilding />
            <span>List Sektor</span>
          </button>
          <button onClick={() => navigate('/berkas')}>
            <FaFileAlt />
            <span>Manajemen Berkas</span>
          </button>
          <button onClick={() => navigate('/profile')}>
            <FaUserCircle />
            <span>Profile</span>
          </button>
        </nav>

        <button onClick={handleLogout} className="logout-button">
          <FaSignOutAlt />
          <span>LOGOUT</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <div className="header-right">
          <span>HI, SUPERADMIN!</span>
        </div>

        <div className="stats">
          <div className="stat-box">
            <FaBuilding size={24} />
            <div className="number">10</div>
            <div>Total Sektor</div>
          </div>
          <div className="stat-box">
            <FaUser size={24} />
            <div className="number">250</div>
            <div>Total User</div>
          </div>
          <div className="stat-box">
            <FaFileAlt size={24} />
            <div className="number">500</div>
            <div>Total Berkas</div>
          </div>
        </div>

        <img src={struktur} alt="Struktur ESDM" className="struktur" />

        <Footer />
      </main>
    </div>
  );
};

export default SuperAdmin;
