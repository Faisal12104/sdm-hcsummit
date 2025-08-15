import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaBuilding, FaFileAlt, FaSignOutAlt, FaHome, FaUserCircle, FaBars, FaTrash } from 'react-icons/fa';
import './User.css';
import Footer from '../../../Footer/Footer';
import esdmLogo from '../../../../assets/Logo_Kementerian_ESDM.png';

const User = () => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Data dummy untuk contoh
  const [userList, setUserList] = useState([
    { id: 1, nama: 'Budi Santoso', email: 'budi@example.com', perusahaan: 'PT Maju', jabatan: 'Manager', sektor: 'Energi', role: 'Admin' },
    { id: 2, nama: 'Siti Aminah', email: 'siti@example.com', perusahaan: 'PT Jaya', jabatan: 'Staff', sektor: 'Mineral', role: 'User' }
  ]);

  // Filter pencarian
  const filteredUsers = userList.filter(user =>
    user.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.perusahaan.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Hapus user (lokal saja)
  const handleDeleteUser = (userId) => {
    setUserList(prev => prev.filter(user => user.id !== userId));
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="dashboard-useradmin">
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
          <button className="active-link" onClick={() => navigate('/user')}><FaUser /><span>Manajemen User</span></button>
          <button onClick={() => navigate('/sektor')}><FaBuilding /><span>List Sektor</span></button>
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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>NAMA LENGKAP</th>
                    <th>EMAIL</th>
                    <th>PERUSAHAAN</th>
                    <th>JABATAN</th>
                    <th>SEKTOR</th>
                    <th>ROLE</th>
                    <th>AKSI</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map(user => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.nama}</td>
                        <td>{user.email}</td>
                        <td>{user.perusahaan}</td>
                        <td>{user.jabatan}</td>
                        <td>{user.sektor}</td>
                        <td>{user.role}</td>
                        <td>
                          <div className="action-buttons">
                            <button className="icon-btn delete-btn" onClick={() => handleDeleteUser(user.id)}>
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" style={{ textAlign: 'center' }}>Belum ada data user</td>
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

export default User;
