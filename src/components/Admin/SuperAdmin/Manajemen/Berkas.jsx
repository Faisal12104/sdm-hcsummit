import React, { useState } from 'react';
import { FaBars, FaHome, FaUser, FaBuilding, FaFileAlt, FaUserCircle, FaSignOutAlt, FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './Berkas.css';
import Footer from '../../../Footer/Footer';
import esdmLogo from '../../../../assets/Logo_Kementerian_ESDM.png';

const Berkas = () => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedSektor, setSelectedSektor] = useState('');

 const addBerkas = () => {
    alert('Fitur tambah berkas akan segera dibuat!');
  };

  const dataGeologi = [
    { id: 1, nama: 'Andi', sektor: 'Geologi', berkas: 'laporan1.pdf', tanggal: '10 Juli 2025', perusahaan: 'Pertamina' },
    { id: 2, nama: 'Budi', sektor: 'Geologi', berkas: 'laporan2.pdf', tanggal: '11 Juli 2025', perusahaan: 'Freeport' },
  ];

  const dataMineral = [
    { id: 1, nama: 'Citra', sektor: 'Mineral', berkas: 'mineral1.pdf', tanggal: '12 Juli 2025', perusahaan: 'Antam' },
  ];

  const dataEnergi = [
    { id: 1, nama: 'Dewi', sektor: 'Energi', berkas: 'energi1.pdf', tanggal: '13 Juli 2025', perusahaan: 'PLN' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/');
  };


  return (
    <div className="dashboard-berkasadmin">
      {/* Sidebar */}
      <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''} ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <button className="burger-btn desktop-only" onClick={() => setIsCollapsed(!isCollapsed)}>
            <FaBars size={20} />
          </button>
          <img src={esdmLogo} alt="Kementerian ESDM" className="sidebar-logo" />
          <span>BPSDM ESDM</span>
        </div>
        <nav className="nav-links">
          <button onClick={() => navigate('/SuperAdmin')}><FaHome /><span>Dashboard</span></button>
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
              <select value={selectedSektor} onChange={(e) => setSelectedSektor(e.target.value)}>
                <option value="">-- Pilih Sektor --</option>
                <option value="Geologi">Geologi</option>
                <option value="Mineral">Mineral</option>
                <option value="Energi">Energi</option>
              </select>
              <input type="text" placeholder="Search" className="search-input" />
              <button className="add-btn" onClick={addBerkas}>Tambah Berkas +</button>
            </div>

            {selectedSektor === 'Geologi' && (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>ID</th><th>NAMA</th><th>SEKTOR</th><th>BERKAS</th><th>TANGGAL</th><th>PERUSAHAAN</th><th>AKSI</th>
                  </tr>
                </thead>
                <tbody>
                  {dataGeologi.map(item => (
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
                </tbody>
              </table>
            )}

            {selectedSektor === 'Mineral' && (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>ID</th><th>NAMA</th><th>SEKTOR</th><th>BERKAS</th><th>TANGGAL</th><th>PERUSAHAAN</th><th>AKSI</th>
                  </tr>
                </thead>
                <tbody>
                  {dataMineral.map(item => (
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
                </tbody>
              </table>
            )}

            {selectedSektor === 'Energi' && (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>ID</th><th>NAMA</th><th>SEKTOR</th><th>BERKAS</th><th>TANGGAL</th><th>PERUSAHAAN</th><th>AKSI</th>
                  </tr>
                </thead>
                <tbody>
                  {dataEnergi.map(item => (
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
                </tbody>
              </table>
            )}
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default Berkas;
