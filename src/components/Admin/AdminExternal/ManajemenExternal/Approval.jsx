import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaUser,
  FaUpload,
  FaSignOutAlt,
  FaCheckCircle,
  FaBars
} from 'react-icons/fa';
import './Approval.css';
import Footer from '../../../Footer/Footer';
import esdmLogo from '../../../../assets/Logo_Kementerian_ESDM.png';

const Approval = () => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false); // Sidebar collapse (desktop)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar toggle (mobile)

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
          <button onClick={() => navigate('/AdminExternal')}>
            <FaUser />
            <span>Profile</span>
          </button>
          <button onClick={() => navigate('/upload')}>
            <FaUpload />
            <span>Upload Berkas</span>
          </button>
          <button className="active-link" onClick={() => navigate('/approval')}>
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
        {/* Header Right (for mobile) */}
        <div className="header-right">
          <button className="burger-btn mobile-only" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <FaBars size={20} />
          </button>
          <span>HI, External!</span>
        </div>

        {/* Content Wrapper */}
        <div className="content-wrapper">
          {/* Approval User Table */}
          <div className="approval-table">
            <h2>Data Pengguna</h2>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>EMAIL</th>
                  <th>SEKTOR</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>2</td>
                  <td>rahayu@gmail.com</td>
                  <td>Mineral</td>
                  <td><span className="status approved">Approved</span></td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>radian@gmail.com</td>
                  <td>Geologi</td>
                  <td><span className="status rejected">Rejected</span></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Approval File Table */}
          <div className="approval-table">
            <h2>Data Berkas</h2>
            <table>
              <thead>
                <tr>
                  <th>Judul Berkas</th>
                  <th>Tanggal Upload</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>contoh.pdf</td>
                  <td>24-08-2025</td>
                  <td><span className="status approved">Approved</span></td>
                </tr>
                <tr>
                  <td>Lagi.pdf</td>
                  <td>12-12-2025</td>
                  <td><span className="status rejected">Rejected</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <Footer />
      </main>
    </div>
  );
};

export default Approval;
