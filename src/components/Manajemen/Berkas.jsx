import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaBuilding, FaFileAlt, FaSignOutAlt, FaHome, FaUserCircle, FaBars, FaEdit, FaTrash } from 'react-icons/fa';
import './Berkas.css';
import Footer from '../Footer/Footer';
import esdmLogo from '../../assets/Logo_Kementerian_ESDM.png';

const Berkas = () => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // List berkas
  const [berkasList, setBerkasList] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/');
  };

  // Fungsi tambah berkas baru (dummy data)
  const addBerkas = () => {
    const newId = berkasList.length > 0 ? berkasList[berkasList.length - 1].id + 1 : 1;
    const newBerkas = {
      id: newId,
      nama: 'Nama Lengkap Baru',
      sektor: 'Geologi',
      berkas: 'laporan.pdf',
      tanggal: '12 Juli 2025',
      perusahaan: 'Pertamina',
    };
    setBerkasList([...berkasList, newBerkas]);
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''} ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <button className="burger-btn desktop-only" onClick={() => setIsCollapsed(!isCollapsed)}>
            <FaBars size={20} />
          </button>
          <img src={esdmLogo} alt="Kementerian ESDM" className="hero-logo" />
          <span>BPSDM ESDM</span>
        </div>
        <nav className="nav-links">
          <button onClick={() => navigate('/dashboard')}><FaHome /><span>Dashboard</span></button>
          <button onClick={() => navigate('/user')}><FaUser /><span>Manajemen User</span></button>
          <button onClick={() => navigate('/sektor')}><FaBuilding /><span>Manajemen Sektor</span></button>
          <button className="active-link" onClick={() => navigate('/berkas')}><FaFileAlt /><span>Manajemen Berkas</span></button>
          <button onClick={() => navigate('/profile')}><FaUserCircle /><span>Profile</span></button>
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
          <span>HI, SUPERADMIN!</span>
        </div>

        <div className="manajemen-container">
          <div className="manajemen-content">
            <div className="toolbar">
              <input type="text" placeholder="Search" className="search-input" />
              <button className="add-btn" onClick={addBerkas}>Tambah Berkas +</button>
            </div>

            <div className="table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>NAMA LENGKAP</th>
                    <th>SEKTOR</th>
                    <th>NAMA BERKAS</th>
                    <th>TANGGAL</th>
                    <th>PERUSAHAAN</th>
                    <th>AKSI</th>
                  </tr>
                </thead>
                <tbody>
                  {berkasList.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.nama}</td>
                      <td>{item.sektor}</td>
                      <td>{item.berkas}</td>
                      <td>{item.tanggal}</td>
                      <td>{item.perusahaan}</td>
                      <td>
                        <button className="icon-btn"><FaEdit /></button>
                        <button className="icon-btn"><FaTrash /></button>
                      </td>
                    </tr>
                  ))}
                  {berkasList.length === 0 && (
                    <tr>
                      <td colSpan="7" style={{ textAlign: 'center' }}>Belum ada data berkas</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </div>
  );
};

export default Berkas;
