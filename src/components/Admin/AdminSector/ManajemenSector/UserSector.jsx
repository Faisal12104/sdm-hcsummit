import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaFileAlt, FaSignOutAlt, FaHome, FaUserCircle, FaBars } from 'react-icons/fa';
import './UserSector.css'; 
import Footer from '../../../Footer/Footer';
import esdmLogo from '../../../../assets/Logo_Kementerian_ESDM.png';

const UserSector = () => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filter, setFilter] = useState('terbaru'); // default filter

  // List user
  const [userList, setUserList] = useState([
    { id: 1, nama: "User A", email: "a@email.com", perusahaan: "PT A", jabatan: "Staff", sektor: "Energi", role: "User", status: "approved", daftar:"24-02-2025 17:45:22", approve:"07-06-2025 23:52:12" },
    { id: 2, nama: "User B", email: "b@email.com", perusahaan: "PT B", jabatan: "Manager", sektor: "Pertambangan", role: "User", status: "pending", daftar:"16-02-2025 12:45:22", approve:"-", },
    { id: 3, nama: "User C", email: "c@email.com", perusahaan: "PT C", jabatan: "Staff", sektor: "Gas", role: "User", status: "rejected", daftar:"12-02-2025 20:45:22", approve:"22-06-2025 12:52:12" }
  ]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/');
  };
  
  // Fungsi tambah user baru
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
      status: 'pending',
      daftar: new Date().toLocaleString(),
      approve: '-'
    };
    setUserList([...userList, newUser]);
  };

  // Fungsi approve & reject
  const handleApprove = (id) => {
    setUserList(userList.map(user =>
      user.id === id ? { ...user, status: 'approved', approve: new Date().toLocaleString() } : user
    ));
  };

  const handleReject = (id) => {
    setUserList(userList.map(user =>
      user.id === id ? { ...user, status: 'rejected', approve: new Date().toLocaleString() } : user
    ));
  };

  // Filter data
  const filteredUsers = userList.filter(user => {
    if (filter === 'approve') return user.status === 'approved';
    if (filter === 'reject') return user.status === 'rejected';
    if (filter === 'terbaru') return user.status === 'pending';
    return true;
  });

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
              <select value={filter} onChange={(e) => setFilter(e.target.value)} className="filter-select">
                <option value="terbaru">Terbaru</option>
                <option value="approve">Approve</option>
                <option value="reject">Reject</option>
              </select>
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
                    <th>{filter === 'terbaru' ? 'AKSI' : 'STATUS'}</th>
                    <th>TANGGAL DAFTAR</th>
                    <th>TANGGAL APPROVE</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.nama}</td>
                      <td>{user.email}</td>
                      <td>{user.perusahaan}</td>
                      <td>{user.jabatan}</td>
                      <td>{user.sektor}</td>
                      <td>{user.role}</td>
                      <td>
                        {filter === 'terbaru' ? (
                          <>
                            <button className="approve-btn" onClick={() => handleApprove(user.id)}>Approve</button>
                            <button className="reject-btn" onClick={() => handleReject(user.id)}>Reject</button>
                          </>
                        ) : (
                          <>
                            {user.status === "approved" && <span className="status-badge approved">Approved</span>}
                            {user.status === "pending" && <span className="status-badge pending">Pending</span>}
                            {user.status === "rejected" && <span className="status-badge rejected">Rejected</span>}
                          </>
                        )}
                      </td>
                      <td>{user.daftar}</td>
                      <td>{user.approve}</td>
                    </tr>
                  ))}
                  {filteredUsers.length === 0 && (
                    <tr>
                      <td colSpan="10" style={{ textAlign: 'center' }}>Tidak ada data</td>
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
