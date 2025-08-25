import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaUser,
  FaFileAlt,
  FaBuilding ,
  FaSignOutAlt,
  FaHome,
  FaUserCircle,
  FaBars,
} from 'react-icons/fa';
import './AdminSector.css';
import Footer from '../../Footer/Footer';
import esdmLogo from '../../../assets/Logo_Kementerian_ESDM.png';

const AdminSector = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/');
  };

  return (
    <div className="dashboard-sector">
      {/* Sidebar */}
      <aside className="sidebar">
              <div className="sidebar-header">
                <button className="burger-btn desktop-only">
                  <FaBars size={20} />
                </button>
                <img src={esdmLogo} alt="Kementerian ESDM" className="sidebar-logo" />
                <span>BPSDM ESDM</span>
              </div>

        <nav className="nav-links">
          <button className="active-link">
            <FaHome />
            <span>Dashboard</span>
          </button>
          <button onClick={() => navigate('/UserSector')}>
            <FaUser />
            <span>Manajemen User</span>
          </button>
          <button onClick={() => navigate('/berkassector')}>
            <FaFileAlt />
            <span>Manajemen Berkas</span>
          </button>
          <button onClick={() => navigate('/profilesector')}>
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
          <span>HI, ADMIN!</span>
        </div>

        <div className="stats">
          <div className="stat-box">
            <FaBuilding  size={24} />
            <div className="number">12</div>
            <div>Total Perushaan</div>
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

export default AdminSector;
