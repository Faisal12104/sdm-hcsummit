import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaBuilding, FaFileAlt, FaSignOutAlt, FaHome, FaUserCircle, FaBars } from 'react-icons/fa';
import './DashboardPage.css';
import Footer from '../Footer/Footer';
import esdmLogo from '../../assets/Logo_Kementerian_ESDM.png';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);       // desktop collapse
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);   // mobile open/close

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className={`sidebar 
        ${isCollapsed ? 'collapsed' : ''} 
        ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          {/* Burger btn desktop */}
          <button className="burger-btn desktop-only" onClick={() => setIsCollapsed(!isCollapsed)}>
            <FaBars size={20} />
          </button>
          <img src={esdmLogo} alt="Kementerian ESDM" className="hero-logo" />
          <span>BPSDM ESDM</span>
        </div>
        <nav className="nav-links">
          <button className="active-link"><FaHome /><span>Dashboard</span></button>
          <button onClick={() => navigate('/user')}><FaUser /><span>Manajemen User</span></button>
          <button onClick={() => navigate('/sektor')}><FaBuilding /><span>Manajemen Sektor</span></button>
          <button onClick={() => navigate('/berkas')}><FaFileAlt /><span>Manajemen Berkas</span></button>
          <button onClick={() => navigate('/profile')}><FaUserCircle /><span>Profile</span></button>
        </nav>
        <button onClick={handleLogout} className="logout-button">
          <FaSignOutAlt /><span>LOGOUT</span>
        </button>
      </aside>

      {/* Main content */}
      <main className="main-content">
        <div className="header-right">
          {/* Burger btn mobile */}
          <button className="burger-btn mobile-only" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <FaBars size={20} />
          </button>
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

        <Footer />
      </main>
    </div>
  );
};

export default DashboardPage;