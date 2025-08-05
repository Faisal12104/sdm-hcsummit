import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaUser,
  FaUpload,
  FaCheckCircle,
  FaSignOutAlt,
  FaBars,
  FaEnvelope
} from 'react-icons/fa';
import './AdminExternal.css';
import Footer from '../../Footer/Footer';
import esdmLogo from '../../../assets/Logo_Kementerian_ESDM.png';

const AdminExternal = () => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false); // desktop
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // mobile

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''} ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <button className="burger-btn desktop-only" onClick={() => setIsCollapsed(!isCollapsed)}>
            <FaBars size={20} />
          </button>
          <img src={esdmLogo} alt="Kementerian ESDM" className="sidebar-logo" />
          {!isCollapsed && <span className="logo-text">BPSDM ESDM</span>}
        </div>

        <nav className="nav-links">
          <button className="active-link">
            <FaUser />
            <span>Profile</span>
          </button>
          <button onClick={() => navigate('/upload')}>
            <FaUpload />
            <span>Upload Berkas</span>
          </button>
          <button onClick={() => navigate('/approval')}>
            <FaCheckCircle />
            <span>Approval</span>
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
          <button className="burger-btn mobile-only" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <FaBars size={20} />
          </button>
          <span>HI, External!</span>
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
                <input type="text" placeholder="Nama Lengkap" />
              </div>
              <div className="form-group">
                <label>Nomor Hp</label>
                <input type="text" placeholder="Nomor HP" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Sektor</label>
                <input type="text" placeholder="Sektor" />
              </div>
              <div className="form-group">
                <label>Jabatan</label>
                <input type="text" placeholder="Jabatan" />
              </div>
            </div>
            <div className="form-group full-width">
              <label>Perusahaan</label>
              <input type="text" placeholder="Perusahaan" />
            </div>
          </div>

          <div className="email-section">
            <div className="section-title">My Email Address</div>
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

export default AdminExternal;
