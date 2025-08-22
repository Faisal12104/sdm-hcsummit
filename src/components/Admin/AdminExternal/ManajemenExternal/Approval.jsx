import React, { useState, useEffect } from 'react';
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
  const [isCollapsed, setIsCollapsed] = useState(false); 
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 

  // State untuk data API
  const [users, setUsers] = useState([]);
  const [files, setFiles] = useState([]);

  // Ambil token login dari localStorage
  const token = localStorage.getItem('token');

  // Panggil API saat komponen load
  useEffect(() => {
    // Contoh endpoint API (ganti sesuai backend kamu)
    fetch('http://localhost:3000/api/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error(err));

    fetch('http://localhost:3000/api/berkas', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => setFiles(data))
      .catch(err => console.error(err));
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="dashboard-approval">
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
        <div className="header-right">
          <button className="burger-btn mobile-only" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <FaBars size={20} />
          </button>
          <span>HI, External!</span>
        </div>

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
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.email}</td>
                    <td>{user.sektor}</td>
                    <td>
                      <span className={`status ${user.status.toLowerCase()}`}>
                        {user.status}
                      </span>
                    </td>
                  </tr>
                ))}
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
                {files.map((file) => (
                  <tr key={file.id}>
                    <td>{file.nama}</td>
                    <td>{file.tanggal_upload}</td>
                    <td>
                      <span className={`status ${file.status.toLowerCase()}`}>
                        {file.status}
                      </span>
                    </td>
                  </tr>
                ))}
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
