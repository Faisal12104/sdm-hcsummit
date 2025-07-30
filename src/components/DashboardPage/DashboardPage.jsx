import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaBuilding, FaFileAlt, FaSignOutAlt, FaHome, FaHistory, FaUserCircle  } from 'react-icons/fa';
import './DashboardPage.css';
import Footer from '../Footer/Footer';
import esdmLogo from '../../assets/Logo_Kementerian_ESDM.png';


const DashboardPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Hapus token dummy dan redirect
    localStorage.removeItem('isLoggedIn');
    navigate('/'); // atau '/login' sesuai route login Anda
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <button className="burger-btn">
            <svg width="24" height="24" fill="currentColor">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <img 
              src={esdmLogo} 
              alt="Kementerian ESDM" 
              className="hero-logo"
            />
          <span>BPSDM ESDM</span>
        </div>
        <nav className="nav-links">
          <button className="active-link">
            <FaHome />
            <span>Dashboard</span>
          </button>
          <button>
            <FaUser />
            <span>Manajemen User</span>
          </button>
          <button>
            <FaBuilding />
            <span>Manajemen Sektor</span>
          </button>
          <button>
            <FaFileAlt />
            <span>Manajemen Berkas</span>
          </button>
          <button>
            <FaHistory />
            <span>Log Aktivitas</span>
          </button>
          <button>
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

      <Footer />      
      </main>
    </div>
  );
};

export default DashboardPage;
