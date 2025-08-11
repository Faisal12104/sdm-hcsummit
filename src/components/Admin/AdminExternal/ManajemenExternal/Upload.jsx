import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaUser,
  FaUpload,
  FaSignOutAlt,
  FaCheckCircle,
  FaBars
} from 'react-icons/fa';
import './Upload.css';
import Footer from '../../../Footer/Footer';
import esdmLogo from '../../../../assets/Logo_Kementerian_ESDM.png';

const Upload = () => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false); // Sidebar collapse untuk desktop
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar toggle untuk mobile

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/');
  };

  return (
    <div className="dashboard-upload">
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
          <button onClick={() => navigate('/AdminExternal')}>
            <FaUser />
            <span>Profile</span>
          </button>
          <button className="active-link" onClick={() => navigate('/upload')}>
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

        {/* Upload Form */}
        <div className="upload-form-container">
          <form className="upload-form">
            <label>Judul Berkas</label>
            <input type="text" placeholder="Judul Berkas" />

            <label>Sektor</label>
            <input type="text" placeholder="Sektor" />

            <label>Upload File</label>
            <div className="upload-file-group">
              <input type="file" id="file-upload" />
            </div>

            <label>Tanggal Upload</label>
            <input type="text" value="24-08-2025" readOnly />

            <button type="submit">Upload</button>
          </form>
        </div>

        <Footer />
      </main>
    </div>
  );
};

export default Upload;
