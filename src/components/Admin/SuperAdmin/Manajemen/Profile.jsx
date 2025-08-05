import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaUser, FaBuilding, FaFileAlt, FaSignOutAlt, FaHome, FaUserCircle, FaBars, FaEnvelope
} from 'react-icons/fa';
import './Profile.css';
import Footer from '../../../Footer/Footer';
import esdmLogo from '../../../../assets/Logo_Kementerian_ESDM.png';

const Profile = () => {
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
      <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''} ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          {/* Burger btn desktop */}
          <button className="burger-btn desktop-only" onClick={() => setIsCollapsed(!isCollapsed)}>
            <FaBars size={20} />
          </button>
          <img src={esdmLogo} alt="Kementerian ESDM" className="hero-logo" />
          <span>BPSDM ESDM</span>
        </div>
        <nav className="nav-links">
          <button onClick={() => navigate('/SuperAdmin')}><FaHome /><span>Dashboard</span></button>
          <button onClick={() => navigate('/user')}><FaUser /><span>Manajemen User</span></button>
          <button onClick={() => navigate('/sektor')}><FaBuilding /><span>Manajemen Sektor</span></button>
          <button onClick={() => navigate('/berkas')}><FaFileAlt /><span>Manajemen Berkas</span></button>
          <button className="active-link" onClick={() => navigate('/profile')}><FaUserCircle /><span>Profile</span></button>
        </nav>
        <button onClick={handleLogout} className="logout-button">
          <FaSignOutAlt /><span>LOGOUT</span>
        </button>
      </aside>

      {/* Main content */}
      <main className="main-content">
        {/* Burger btn mobile */}
        <div className="header-right">
          <button className="burger-btn mobile-only" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <FaBars size={20} />
          </button>
          <span>HI, SUPERADMIN!</span>
        </div>

        <div className="profile-container">
          <div className="profile-header">
            <div className="profile-info">
              <img src="https://i.pravatar.cc/100" alt="Profile" className="profile-avatar" />
              <div>
                <div className="profile-name">Acha</div>
                <div className="profile-email">achahahahah@gmail.com</div>
              </div>
            </div>
            <button className="edit-btn">Edit</button>
          </div>

          <div className="profile-form">
            <div className="form-row">
              <div className="form-group">
                <label>Nama Lengkap</label>
                <input type="text" placeholder="Your First Name" />
              </div>
              <div className="form-group">
                <label>Nomor Hp</label>
                <input type="text" placeholder="Your First Name" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Sektor</label>
                <input type="text" placeholder="Your First Name" />
              </div>
              <div className="form-group">
                <label>Jabatan</label>
                <input type="text" placeholder="Your First Name" />
              </div>
            </div>
            <div className="form-group full-width">
              <label>Perusahaan</label>
              <input type="text" placeholder="Your First Name" />
            </div>
          </div>

          <div className="email-section">
            <div className="section-title">My email Address</div>
            <div className="email-item">
              <FaEnvelope className="email-icon" />
              <div>
                <div className="email-text">achahahahah@gmail.com</div>
                <div className="email-date">1 month ago</div>
              </div>
            </div>
            <button className="add-email-btn">+ Add Email Address</button>
          </div>
        </div>

        <Footer />
      </main>
    </div>
  );
};

export default Profile;
