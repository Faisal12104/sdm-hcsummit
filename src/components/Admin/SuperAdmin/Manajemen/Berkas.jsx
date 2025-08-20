import React, { useState, useEffect } from 'react';
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
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [berkasData, setBerkasData] = useState({
    Geologi: [],
    Mineral: [],
    Energi: []
  });

  // Fetch data on component mount and when selectedSektor changes
  useEffect(() => {
    const fetchBerkas = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`http://localhost:3000/api/berkas/superadmin?sektor=${selectedSektor}`);
        
        if (!response.ok) {
          throw new Error('Gagal memuat data berkas');
        }
        
        const data = await response.json();
        
        if (selectedSektor) {
          // Update specific sector data
          setBerkasData(prev => ({
            ...prev,
            [selectedSektor]: data
          }));
        } else {
          // Update all sectors data (if your API supports this)
          setBerkasData(data);
        }
      } catch (err) {
        setError(err.message);
        console.error('Error fetching berkas:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBerkas();
  }, [selectedSektor]);

  const handleAction = async (action, id, berkas) => {
    setIsLoading(true);
    setError(null);
    
    let url = '';
    let method = action === 'download' ? 'GET' : 'POST';
    const token = localStorage.getItem('token');

    if (action === 'approve') {
      url = `http://localhost:3000/api/berkas/superadmin/berkas/${id}/approve`;
    } else if (action === 'reject') {
      url = `http://localhost:3000/api/berkas/superadmin/berkas/${id}/reject`;
    } else if (action === 'download') {
      url = `http://localhost:3000/api/berkas/superadmin/berkas/${id}/download`;
    }

    try {
      const headers = {
        'Authorization': `Bearer ${token}`
      };

      if (action !== 'download') {
        headers['Content-Type'] = 'application/json';
      }

      const response = await fetch(url, { 
        method,
        headers
      });

      if (!response.ok) {
        throw new Error(`Gagal ${action} berkas`);
      }

      if (action === 'download') {
        const blob = await response.blob();
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = berkas;
        link.click();
      } else {
        // Update local state after successful action
        const updatedData = berkasData[selectedSektor].map(item =>
          item.id === id
            ? { 
                ...item, 
                tanggalApprove: action === 'approve' 
                  ? new Date().toLocaleDateString('id-ID') 
                  : item.tanggalApprove,
                status: action === 'approve' ? 'Approved' : 'Rejected'
              }
            : item
        );

        setBerkasData(prev => ({
          ...prev,
          [selectedSektor]: updatedData
        }));
      }

      alert(`Berkas ${berkas} berhasil di-${action}`);
    } catch (error) {
      setError(error.message);
      console.error(error);
      alert(`Terjadi kesalahan saat ${action} berkas: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const addBerkas = () => {
    navigate('/berkas/tambah');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const renderTable = (data) => {
    const filteredData = data.filter(item =>
      item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.berkas.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.perusahaan.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
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
            <th>STATUS</th>
            <th>AKSI</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.nama}</td>
                <td>{item.sektor}</td>
                <td>{item.berkas}</td>
                <td>{item.tanggalUpload}</td>
                <td>{item.tanggalApprove || '-'}</td>
                <td>{item.perusahaan}</td>
                <td>{item.status || 'Pending'}</td>
                <td>
                  <select 
                    onChange={(e) => handleAction(e.target.value, item.id, item.berkas)} 
                    defaultValue=""
                    disabled={isLoading}
                  >
                    <option value="" disabled>Pilih Aksi</option>
                    <option value="approve">Approve</option>
                    <option value="reject">Reject</option>
                    <option value="download">Download</option>
                  </select>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" style={{ textAlign: 'center' }}>
                {searchTerm ? 'Tidak ada berkas yang sesuai' : 'Tidak ada data berkas'}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    );
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
            {error && <div className="error-message">{error}</div>}
            
            <div className="toolbar">
              <select 
                value={selectedSektor} 
                onChange={(e) => setSelectedSektor(e.target.value)}
                disabled={isLoading}
              >
                <option value="">-- Semua Sektor --</option>
                <option value="Geologi">Geologi</option>
                <option value="Mineral">Mineral</option>
                <option value="Energi">Energi</option>
              </select>
              <input 
                type="text" 
                placeholder="Cari berkas..." 
                className="search-input" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button 
                className="add-btn" 
                onClick={addBerkas}
                disabled={isLoading}
              >
                {isLoading ? 'Memuat...' : 'Tambah Berkas +'}
              </button>
            </div>

            {isLoading ? (
              <div className="loading-indicator">Memuat data berkas...</div>
            ) : (
              <>
                {!selectedSektor ? (
                  <>
                    <h2>Geologi</h2>
                    {renderTable(berkasData.Geologi)}
                    
                    <h2>Mineral</h2>
                    {renderTable(berkasData.Mineral)}
                    
                    <h2>Energi</h2>
                    {renderTable(berkasData.Energi)}
                  </>
                ) : (
                  renderTable(berkasData[selectedSektor])
                )}
              </>
            )}
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default Berkas;