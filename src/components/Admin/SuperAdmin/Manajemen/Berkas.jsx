import React, { useState } from 'react';
import { FaBars, FaHome, FaUser, FaBuilding, FaFileAlt, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './Berkas.css';
import Footer from '../../../Footer/Footer';
import esdmLogo from '../../../../assets/Logo_Kementerian_ESDM.png';

const Berkas = () => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedSektor, setSelectedSektor] = useState('');


const handleAction = async (action, id, berkas, setData) => {
  let url = '';
  let method = action === 'download' ? 'GET' : 'POST';

  if (action === 'approve') {
    url = `http://localhost:3000/api/berkas/superadmin/berkas/${id}/approve`;
  } else if (action === 'reject') {
    url = `http://localhost:3000/api/berkas/superadmin/berkas/${id}/reject`;
  } else if (action === 'download') {
    url = `http://localhost:3000/api/berkas/superadmin/berkas/${id}/download`;
  }

  try {
    if (action === 'download') {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Gagal mengunduh berkas');
      const blob = await response.blob();
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = berkas;
      link.click();
    } else {
      const response = await fetch(url, { method });
      if (!response.ok) throw new Error(`Gagal ${action} berkas`);

      if (action === 'approve') {
        setData(prevData =>
          prevData.map(item =>
            item.id === id
              ? { ...item, tanggalApprove: new Date().toLocaleDateString('id-ID') }
              : item
          )
        );
      }

      alert(`Berkas ${berkas} berhasil di-${action}`);
    }
  } catch (error) {
    console.error(error);
    alert(`Terjadi kesalahan saat ${action} berkas`);
  }
};

  // Data tiap sektor dalam state agar bisa diupdate
  const [dataGeologi, setDataGeologi] = useState([
    { id: 1, nama: 'Andi', sektor: 'Geologi', berkas: 'laporan1.pdf', tanggalUpload: '10 Juli 2025', tanggalApprove: '', perusahaan: 'Pertamina' },
    { id: 2, nama: 'Budi', sektor: 'Geologi', berkas: 'laporan2.pdf', tanggalUpload: '11 Juli 2025', tanggalApprove: '', perusahaan: 'Freeport' },
  ]);

  const [dataMineral, setDataMineral] = useState([
    { id: 1, nama: 'Citra', sektor: 'Mineral', berkas: 'mineral1.pdf', tanggalUpload: '12 Juli 2025', tanggalApprove: '', perusahaan: 'Antam' },
  ]);

  const [dataEnergi, setDataEnergi] = useState([
    { id: 1, nama: 'Dewi', sektor: 'Energi', berkas: 'energi1.pdf', tanggalUpload: '13 Juli 2025', tanggalApprove: '', perusahaan: 'PLN' },
  ]);

  const addBerkas = () => {
    alert('Fitur tambah berkas akan segera dibuat!');
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/');
  };


  const renderTable = (data, setData) => (
    <table className="data-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>NAMA</th>
          <th>SEKTOR</th>
          <th>BERKAS</th>
          <th>TANGGAL UPLOAD</th>
          <th>TANGGAL APPROVE</th>
          <th>PERUSAHAAN</th>
          <th>AKSI</th>
        </tr>
      </thead>
      <tbody>
        {data.map(item => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.nama}</td>
            <td>{item.sektor}</td>
            <td>{item.berkas}</td>
            <td>{item.tanggalUpload}</td>
            <td>{item.tanggalApprove || '-'}</td>
            <td>{item.perusahaan}</td>
            <td>
              <select onChange={(e) => handleAction(e.target.value, item.id, item.berkas, setData)} defaultValue="">
                <option value="" disabled>Pilih Aksi</option>
                <option value="approve">Approve</option>
                <option value="reject">Reject</option>
                <option value="download">Download</option>
              </select>

            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

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
          <button onClick={() => navigate('/sektor')}><FaBuilding /><span>List Sektor</span></button>
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

            {selectedSektor === 'Geologi' && renderTable(dataGeologi, setDataGeologi)}
            {selectedSektor === 'Mineral' && renderTable(dataMineral, setDataMineral)}
            {selectedSektor === 'Energi' && renderTable(dataEnergi, setDataEnergi)}
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default Berkas;
