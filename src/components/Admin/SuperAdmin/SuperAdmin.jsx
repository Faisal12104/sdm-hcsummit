import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaUser,
  FaBuilding,
  FaFileAlt,
  FaSignOutAlt,
  FaHome,
  FaUserCircle,
} from 'react-icons/fa';
import './SuperAdmin.css';
import Footer from '../../Footer/Footer';
import Header from '../../Header/Header'; // ✅ pakai header
import struktur from '../../../assets/struktur.png';

const SuperAdmin = () => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false); // desktop
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // mobile

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/');
  };

  return (
    <div className="dashboard-super">
      {/* Header panggil dari Header.jsx */}
      <Header
        isLoggedIn={true}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* Sidebar */}
      <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''} ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <button className="burger-btn desktop-only" onClick={() => setIsCollapsed(!isCollapsed)}>
            ☰
          </button>
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
        <span className="welcome-text">HI, SUPERADMIN!</span>

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
