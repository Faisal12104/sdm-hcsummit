// Berkas.jsx
import React, { useState, useEffect } from 'react';
import { FaBars, FaHome, FaUser, FaBuilding, FaFileAlt, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './Berkas.css';
import Footer from '../../../Footer/Footer';
import esdmLogo from '../../../../assets/Logo_Kementerian_ESDM.png';

const Berkas = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [berkasData, setBerkasData] = useState({});
  const [selectedSektor, setSelectedSektor] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

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

        setBerkasData(prev => ({
          ...prev,
          [selectedSektor]: data,
        }));
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
          console.error("Fetch error:", err);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchBerkas();
    return () => controller.abort();
  }, [selectedSektor]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleAction = (id, action) => {
    // kalau tidak pilih sektor (semua sektor), hentikan
    if (!selectedSektor) {
      alert("Pilih sektor dulu sebelum melakukan aksi!");
      return;
    }

    // opsional: konfirmasi
    if (action === 'approve' && !window.confirm("Yakin ingin approve berkas ini?")) return;
    if (action === 'reject' && !window.confirm("Yakin ingin reject berkas ini?")) return;

    if (action === 'download') {
      alert(`Download Berkas ${id}`);
    } else {
      setBerkasData(prev => ({
        ...prev,
        [selectedSektor]: prev[selectedSektor].map(item =>
          item.id === id
            ? { ...item, status: action === 'approve' ? 'Approved' : 'Rejected' }
            : item
        ),
      }));
    }
  };

  const renderTable = (data) => {
    const filteredData = data.filter(item =>
      item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.berkas.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.perusahaan.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <table>
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
                <td>{item.tanggalUpload ? new Date(item.tanggalUpload).toLocaleDateString('id-ID') : '-'}</td>
                <td>{item.status}</td>
                <td>{item.tanggalApprove ? new Date(item.tanggalApprove).toLocaleDateString('id-ID') : '-'}</td>
                <td>
                  <select
                    onChange={(e) => handleAction(item.id, e.target.value)}
                    defaultValue=""
                  >
                    <option value="" disabled>Pilih</option>
                    <option value="approve">Approve</option>
                    <option value="reject">Reject</option>
                    <option value="download">Download</option>
                  </select>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">Tidak ada data</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  };

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <img src={esdmLogo} alt="ESDM Logo" className="sidebar-logo" />
          <h2>ESDM</h2>
        </div>
        <ul>
          <li onClick={() => navigate('/superadmin/dashboard')}><FaHome /> Dashboard</li>
          <li onClick={() => navigate('/superadmin/user')}><FaUser /> User</li>
          <li onClick={() => navigate('/superadmin/perusahaan')}><FaBuilding /> Perusahaan</li>
          <li onClick={() => navigate('/superadmin/berkas')}><FaFileAlt /> Berkas</li>
          <li onClick={() => navigate('/superadmin/profile')}><FaUserCircle /> Profile</li>
          <li onClick={() => navigate('/login')}><FaSignOutAlt /> Logout</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <header>
          <FaBars className="menu-icon" onClick={toggleSidebar} />
          <h1>Berkas</h1>
        </header>

        {/* Filter */}
        <div className="filter-container">
          <select onChange={(e) => setSelectedSektor(e.target.value)}>
            <option value="">-- Semua Sektor --</option>
            <option value="Mineral">Mineral</option>
            <option value="Batubara">Batubara</option>
            <option value="Panas Bumi">Panas Bumi</option>
            <option value="Geologi">Geologi</option>
            <option value="Migasi">Migasi</option>
          </select>

          <input
            type="text"
            placeholder="Cari nama, berkas, atau perusahaan..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Table */}
        <div className="table-container">
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p style={{ color: 'red' }}>Error: {error}</p>
          ) : (
            renderTable(selectedSektor ? berkasData[selectedSektor] || [] : [])
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Berkas;
