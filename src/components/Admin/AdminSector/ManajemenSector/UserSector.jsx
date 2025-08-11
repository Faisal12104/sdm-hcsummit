import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaFileAlt, FaSignOutAlt, FaHome, FaUserCircle, FaBars, FaFileSignature } from 'react-icons/fa';
import './UserSector.css'; 
import Footer from '../../../Footer/Footer';
import esdmLogo from '../../../../assets/Logo_Kementerian_ESDM.png';

const UserSector = () => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // List user
  const [userList, setUserList] = useState([
    { id: 1, nama: "User A", email: "a@email.com", perusahaan: "PT A", jabatan: "Staff", sektor: "Energi", role: "User", status: "approved" },
    { id: 2, nama: "User B", email: "b@email.com", perusahaan: "PT B", jabatan: "Manager", sektor: "Pertambangan", role: "User", status: "pending" },
    { id: 3, nama: "User C", email: "c@email.com", perusahaan: "PT C", jabatan: "Staff", sektor: "Gas", role: "User", status: "rejected" }
  ]);

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
      role: 'User',
      status: 'pending' // default status
    };
    setUserList([...userList, newUser]);
  };

  return (
    <div className="dashboard-usersector">
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
            <button onClick={() => navigate('/AdminSector')}><FaHome /><span>Dashboard</span></button>
            <button className="active-link" onClick={() => navigate('/usersector')}><FaUser /><span>Manajemen User</span></button>
            <button onClick={() => navigate('/daftarsector')}><FaFileSignature /><span>Manajemen Pendaftaran</span></button>
            <button onClick={() => navigate('/berkassector')}><FaFileAlt /><span>Manajemen Berkas</span></button>
            <button onClick={() => navigate('/profilesector')}><FaUserCircle /><span>Profile</span></button>
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
          <span>HI, ADMIN!</span>
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
                    <th>STATUS</th>
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
                        {user.status === "approved" && <span className="status-badge approved">Approved</span>}
                        {user.status === "pending" && <span className="status-badge pending">Pending</span>}
                        {user.status === "rejected" && <span className="status-badge rejected">Rejected</span>}
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

export default UserSector;
