import React, {useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaUser, FaFileAlt, FaSignOutAlt, FaHome, FaUserCircle, FaBars, FaEnvelope
} from 'react-icons/fa';
import './ProfileSector.css';
import Footer from '../../../Footer/Footer';
import esdmLogo from '../../../../assets/Logo_Kementerian_ESDM.png';

const ProfileSector = () => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // State untuk data user
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    sektor: '',
    jabatan: '',
    perusahaan: ''
  });

  useEffect(() => {
    // Ambil data user dari localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="dashboard-profilesector">
      {/* Sidebar */}
      <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''} ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          {/* Burger btn desktop */}
          <button className="burger-btn desktop-only" onClick={() => setIsCollapsed(!isCollapsed)}>
            <FaBars size={20} />
          </button>
          <img src={esdmLogo} alt="Kementerian ESDM" className="sidebar-logo" />
          <span>BPSDM ESDM</span>
        </div>
        <nav className="nav-links">
          <button onClick={() => navigate('/AdminSector')}><FaHome /><span>Dashboard</span></button>
          <button onClick={() => navigate('/usersector')}><FaUser /><span>Manajemen User</span></button>
          <button onClick={() => navigate('/berkassector')}><FaFileAlt /><span>Manajemen Berkas</span></button>
          <button className="active-link" onClick={() => navigate('/profilesector')}><FaUserCircle /><span>Profile</span></button>
        </nav>
        <button onClick={handleLogout} className="logout-button">
          <FaSignOutAlt /><span>LOGOUT</span>
        </button>
      </aside>

      {/* Main content */}
<main className="main-content">
        <div className="header-right">
          <button className="burger-btn mobile-only" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <FaBars size={20} />
          </button>
          <span>HI, {user.name?.toUpperCase() || 'USER'}!</span>
        </div>

        <div className="profile-container">
          <div className="profile-header">
            <div className="profile-info">
              <img src="https://i.pravatar.cc/100" alt="Profile" className="profile-avatar" />
              <div>
                <div className="profile-name">{user.name}</div>
                <div className="profile-email">{user.email}</div>
              </div>
            </div>
            <button className="edit-btn">Edit</button>
          </div>

          <div className="profile-form">
            <div className="form-row">
              <div className="form-group">
                <label>Nama Lengkap</label>
                <input type="text" value={user.name} readOnly />
              </div>
              <div className="form-group">
                <label>Nomor Hp</label>
                <input type="text" value={user.phone} readOnly />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Sektor</label>
                <input type="text" value={user.sektor} readOnly />
              </div>
              <div className="form-group">
                <label>Jabatan</label>
                <input type="text" value={user.jabatan} readOnly />
              </div>
            </div>
            <div className="form-group full-width">
              <label>Perusahaan</label>
              <input type="text" value={user.perusahaan} readOnly />
            </div>
          </div>

          <div className="email-section">
            <div className="section-title">My email Address</div>
            <div className="email-item">
              <FaEnvelope className="email-icon" />
              <div>
                <div className="email-text">{user.email}</div>
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

export default ProfileSector;