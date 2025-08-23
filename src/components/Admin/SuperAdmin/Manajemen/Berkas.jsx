import React, { useState, useEffect } from 'react';
import {
  FaBars,
  FaHome,
  FaUser,
  FaBuilding,
  FaFileAlt,
  FaUserCircle,
  FaSignOutAlt,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './Berkas.css';
import Footer from '../../../Footer/Footer';
import esdmLogo from '../../../../assets/Logo_Kementerian_ESDM.png';

const Berkas = () => {
  const navigate = useNavigate();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [berkasData, setBerkasData] = useState({});
  const [selectedSektor, setSelectedSektor] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch Data
  useEffect(() => {
    const controller = new AbortController();

    const fetchBerkas = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const url = selectedSektor
          ? `http://localhost:3000/api/berkas/superadmin?sektor=${selectedSektor}`
          : `http://localhost:3000/api/berkas/superadmin`;

        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        setBerkasData((prev) => ({ ...prev, [selectedSektor]: data }));
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
          console.error('Fetch error:', err);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchBerkas();
    return () => controller.abort();
  }, [selectedSektor]);

  // Logout
  const handleLogout = () => navigate('/login');

  // Handle Action
  const handleAction = (id, action) => {
    if (!selectedSektor) {
      alert('Pilih sektor dulu sebelum melakukan aksi!');
      return;
    }

    if (
      (action === 'approve' || action === 'reject') &&
      !window.confirm(`Yakin ingin ${action} berkas ini?`)
    )
      return;

    if (action === 'download') {
      alert(`Download Berkas ${id}`);
    } else {
      setBerkasData((prev) => ({
        ...prev,
        [selectedSektor]: prev[selectedSektor].map((item) =>
          item.id === id
            ? {
                ...item,
                status: action === 'approve' ? 'Approved' : 'Rejected',
                tanggalApprove: action === 'approve' ? new Date() : null,
              }
            : item
        ),
      }));
    }
  };

  // Render Table
  const renderTable = (data) => {
    const filteredData = data.filter(
      (item) =>
        item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.berkas.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.perusahaan.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Berkas</th>
              <th>Perusahaan</th>
              <th>Tanggal Upload</th>
              <th>Status</th>
              <th>Tanggal Approve</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.nama}</td>
                  <td>{item.berkas}</td>
                  <td>{item.perusahaan}</td>
                  <td>
                    {item.tanggalUpload
                      ? new Date(item.tanggalUpload).toLocaleDateString('id-ID')
                      : '-'}
                  </td>
                  <td>{item.status || '-'}</td>
                  <td>
                    {item.tanggalApprove
                      ? new Date(item.tanggalApprove).toLocaleDateString('id-ID')
                      : '-'}
                  </td>
                  <td>
                    <select
                      className="action-select"
                      onChange={(e) => handleAction(item.id, e.target.value)}
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Pilih
                      </option>
                      <option value="approve">Approve</option>
                      <option value="reject">Reject</option>
                      <option value="download">Download</option>
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center' }}>
                  Tidak ada data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="dashboard-berkasadmin">
      {/* Sidebar */}
      <aside
        className={`sidebar ${isCollapsed ? 'collapsed' : ''} ${
          isSidebarOpen ? 'open' : ''
        }`}
      >
        <div className="sidebar-header">
          <button className="burger-btn desktop-only" onClick={() => setIsCollapsed(!isCollapsed)}>
            <FaBars size={20} />
          </button>
          <img src={esdmLogo} alt="Kementerian ESDM" className="sidebar-logo" />
          <span>BPSDM ESDM</span>
        </div>

        <nav className="nav-links">
          <button onClick={() => navigate('/SuperAdmin')}>
            <FaHome />
            <span>Dashboard</span>
          </button>
          <button onClick={() => navigate('/user')}>
            <FaUser />
            <span>Manajemen User</span>
          </button>
          <button onClick={() => navigate('/sektor')}>
            <FaBuilding />
            <span>List Sektor</span>
          </button>
          <button
            onClick={() => navigate('/berkas')}
            className="active-link"
          >
            <FaFileAlt />
            <span>Manajemen Berkas</span>
          </button>
          <button onClick={() => navigate('/profile')}>
            <FaUserCircle />
            <span>Profile</span>
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
          <span>HI, SUPERADMIN!</span>
        </div>

        <div className="manajemen-container">
          <div className="manajemen-content">
            <div className="toolbar">
              <select onChange={(e) => setSelectedSektor(e.target.value)}>
                <option value="">-- Semua Sektor --</option>
                <option value="Mineral">Mineral</option>
                <option value="Batubara">Batubara</option>
                <option value="Panas Bumi">Panas Bumi</option>
                <option value="Geologi">Geologi</option>
                <option value="Migas">Migas</option>
              </select>

              <input
                type="text"
                className="search-input"
                placeholder="Cari nama, berkas, atau perusahaan..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {isLoading ? (
              <p>Loading...</p>
            ) : error ? (
              <p style={{ color: 'red' }}>Error: {error}</p>
            ) : (
              renderTable(selectedSektor ? berkasData[selectedSektor] || [] : [])
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Berkas;
