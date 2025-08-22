import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaBuilding, FaFileAlt, FaSignOutAlt, FaHome, FaUserCircle, FaBars } from 'react-icons/fa';
import './Sektor.css';
import Footer from '../../../Footer/Footer';
import esdmLogo from '../../../../assets/Logo_Kementerian_ESDM.png';

const Sektor = () => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Data sektor dari API
  const [sektorList, setSektorList] = useState([]);
  const [search, setSearch] = useState('');

  const token = localStorage.getItem('token'); // kalau pakai JWT

  // Ambil data sektor dari API
  useEffect(() => {
    fetch('http://localhost:3000/api/sektor', {
      headers: {
        Authorization: `Bearer ${token}`, // hapus baris ini kalau API kamu nggak pakai auth
      },
    })
      .then((res) => res.json())
      .then((data) => setSektorList(data))
      .catch((err) => console.error('Gagal ambil sektor:', err));
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="dashboard-sektoradmin">
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
          <button className="active-link" onClick={() => navigate('/sektor')}><FaBuilding /><span>List Sektor</span></button>
          <button onClick={() => navigate('/berkas')}><FaFileAlt /><span>Manajemen Berkas</span></button>
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
              <input
                type="text"
                placeholder="Search"
                className="search-input"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>SEKTOR</th>
                  </tr>
                </thead>
                <tbody>
                  {sektorList
                    .filter((item) =>
                      item.nama.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((item) => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.nama}</td>
                      </tr>
                    ))}
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

export default Sektor;
