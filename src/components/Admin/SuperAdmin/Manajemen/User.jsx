import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaUser,
  FaBuilding,
  FaFileAlt,
  FaSignOutAlt,
  FaHome,
  FaUserCircle,
  FaTrash
} from 'react-icons/fa';
import './User.css';
import Footer from '../../../Footer/Footer';
import Header from '../../../Header/Header'; // ✅ pakai header

const User = () => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mapping ID ke nama (dummy bisa diganti API)
  const perusahaanMap = {
    2: 'Perusahaan B',
    3: 'Perusahaan C',
    4: 'PPSDM MIGAS',
    6: 'Perusahaan F'
  };
  const jabatanMap = {
    2: 'Staff IT',
    4: 'Manager',
    5: 'Supervisor',
    6: 'Kepala Bagian',
    7: 'Engineer',
    10: 'Intern'
  };
  const sektorMap = {
    1: 'Sektor A',
    3: 'IT',
    4: 'HR',
    5: 'Finance'
  };
  const roleMap = {
    1: 'Super Admin',
    2: 'Admin SATKER',
    3: 'External'
  };

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/auth/eksternal');
        if (!response.ok) throw new Error('Failed to fetch users');
        const result = await response.json();
        setUserList(result.data || []);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching users:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Delete user
  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus user ini?')) return;
    try {
      const response = await fetch('http://localhost:3000/api/auth/eksternal', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eksternalUserId: userId })
      });
      if (!response.ok) throw new Error('Gagal menghapus user');
      setUserList(prev => prev.filter(u => u.id !== userId));
      alert('User eksternal berhasil dihapus');
    } catch (err) {
      console.error('Error deleting user:', err);
      setError(err.message);
    }
  };

  // Filter
  const filteredUsers = userList.filter(user =>
    (user.user?.nama_lengkap || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.user?.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (perusahaanMap[user.user?.id_perusahaan] || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (jabatanMap[user.user?.id_jabatan] || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (sektorMap[user.user?.id_sektor] || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (roleMap[user.user?.id_role] || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="dashboard-useradmin">
      {/* Header pakai Header.jsx */}
      <Header
        isLoggedIn={true}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* Sidebar */}
      <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''} ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <button className="burger-btn desktop-only" onClick={() => setIsCollapsed(!isCollapsed)}>
            ☰
          </button>
        </div>

        <nav className="nav-links">
          <button onClick={() => navigate('/SuperAdmin')}>
            <FaHome /><span>Dashboard</span>
          </button>
          <button className="active-link" onClick={() => navigate('/user')}>
            <FaUser /><span>Manajemen User</span>
          </button>
          <button onClick={() => navigate('/sektor')}>
            <FaBuilding /><span>List Sektor</span>
          </button>
          <button onClick={() => navigate('/berkas')}>
            <FaFileAlt /><span>Manajemen Berkas</span>
          </button>
          <button onClick={() => navigate('/profile')}>
            <FaUserCircle /><span>Profile</span>
          </button>
        </nav>

        <button onClick={handleLogout} className="logout-button">
          <FaSignOutAlt /><span>LOGOUT</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="main-content">

        <div className="manajemen-container">
          <div className="manajemen-content">
            {error && <div className="error-message">{error}</div>}
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
              {isLoading ? (
                <div className="loading-indicator">Loading users...</div>
              ) : (
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
                          <td>{user.user?.nama_lengkap || '-'}</td>
                          <td>{user.user?.email || '-'}</td>
                          <td>{perusahaanMap[user.user?.id_perusahaan] || '-'}</td>
                          <td>{jabatanMap[user.user?.id_jabatan] || '-'}</td>
                          <td>{sektorMap[user.user?.id_sektor] || '-'}</td>
                          <td>{roleMap[user.user?.id_role] || '-'}</td>
                          <td>
                            <button
                              className="icon-btn delete-btn"
                              onClick={() => handleDeleteUser(user.id)}
                            >
                              <FaTrash />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8" style={{ textAlign: 'center' }}>
                          {searchTerm ? 'No matching users found' : 'No users available'}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </div>
  );
};

export default User;
