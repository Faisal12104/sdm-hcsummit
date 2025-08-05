import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaBuilding, FaFileAlt, FaSignOutAlt, FaHome, FaUserCircle, FaBars, FaEdit, FaTrash } from 'react-icons/fa';
import './User.css'; 
import Footer from '../../../Footer/Footer';
import esdmLogo from '../../../../assets/Logo_Kementerian_ESDM.png';

const User = () => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // List user
  const [userList, setUserList] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/');
  };

  // Fungsi tambah user baru (dummy data)
  const addUser = () => {
    const newId = userList.length > 0 ? userList[userList.length - 1].id + 1 : 1;
    const newUser = {
      id: newId,
      nama: 'Nama Lengkap Baru',
      email: 'email@contoh.com',
      perusahaan: 'Perusahaan ABC',
      jabatan: 'Staff',
      sektor: 'Sektor Contoh',
      role: 'User'
    };
    setUserList([...userList, newUser]);
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
          <button onClick={() => navigate('/SuperAdmin')}><FaHome /><span>Dashboard</span></button>
          <button className="active-link" onClick={() => navigate('/user')}><FaUser /><span>Manajemen User</span></button>
          <button onClick={() => navigate('/sektor')}><FaBuilding /><span>Manajemen Sektor</span></button>
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
              <input type="text" placeholder="Search" className="search-input" />
              <button className="add-btn" onClick={addUser}>Tambah User +</button>
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
                  {userList.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.nama}</td>
                      <td>{user.email}</td>
                      <td>{user.perusahaan}</td>
                      <td>{user.jabatan}</td>
                      <td>{user.sektor}</td>
                      <td>{user.role}</td>
                      <td>
                        <button className="icon-btn"><FaEdit /></button>
                        <button className="icon-btn"><FaTrash /></button>
                      </td>
                    </tr>
                  ))}
                  {userList.length === 0 && (
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
