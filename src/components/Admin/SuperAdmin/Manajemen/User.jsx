import React, { useState, useEffect } from 'react';
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
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch users data on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/auth/eksternal');
        
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        
        const data = await response.json();
        setUserList(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching users:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Handle delete user
  const handleDeleteUser = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/auth/eksternal/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      // Update local state after successful deletion
      setUserList(prev => prev.filter(user => user.id !== userId));
    } catch (err) {
      console.error('Error deleting user:', err);
      setError(err.message);
    }
  };

  // Filter users based on search term
  const filteredUsers = userList.filter(user =>
    user.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.perusahaan.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                          <td>{user.nama}</td>
                          <td>{user.email}</td>
                          <td>{user.perusahaan}</td>
                          <td>{user.jabatan}</td>
                          <td>{user.sektor}</td>
                          <td>{user.role}</td>
                          <td>
                            <div className="action-buttons">
                              <button 
                                className="icon-btn delete-btn" 
                                onClick={() => handleDeleteUser(user.id)}
                                disabled={isLoading}
                              >
                                <FaTrash />
                              </button>
                            </div>
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