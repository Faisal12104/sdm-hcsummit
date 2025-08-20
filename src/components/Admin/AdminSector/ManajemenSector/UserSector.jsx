import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaFileAlt, FaSignOutAlt, FaHome, FaUserCircle, FaBars } from 'react-icons/fa';
import './UserSector.css'; 
import Footer from '../../../Footer/Footer';
import esdmLogo from '../../../../assets/Logo_Kementerian_ESDM.png';

const UserSector = () => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filter, setFilter] = useState('terbaru');
  const [searchTerm, setSearchTerm] = useState('');
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch users data on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/api/auth/adminsatker', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
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

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };
  
  // Handle approve/reject actions
  const handleUserAction = async (id, action) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/api/auth/adminsatker/${id}/${action}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to ${action} user`);
      }

      // Update local state after successful action
      setUserList(prevUsers => 
        prevUsers.map(user =>
          user.id === id
            ? { 
                ...user, 
                status: action,
                approve: action === 'approve' ? new Date().toLocaleString() : user.approve
              }
            : user
        )
      );
    } catch (err) {
      setError(err.message);
      console.error(`Error ${action}ing user:`, err);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter and search users
  const filteredUsers = userList.filter(user => {
    // Apply status filter
    if (filter === 'approve') return user.status === 'approved';
    if (filter === 'reject') return user.status === 'rejected';
    if (filter === 'terbaru') return user.status === 'pending';
    
    return true;
  }).filter(user => {
    // Apply search filter
    if (!searchTerm) return true;
    return (
      user.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.perusahaan.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.jabatan.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.sektor.toLowerCase().includes(searchTerm.toLowerCase())
    );
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
            {error && <div className="error-message">{error}</div>}
            
            <div className="toolbar">
              <input 
                type="text" 
                placeholder="Cari user..." 
                className="search-input" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <select 
                value={filter} 
                onChange={(e) => setFilter(e.target.value)} 
                className="filter-select"
                disabled={isLoading}
              >
                <option value="terbaru">Terbaru</option>
                <option value="approve">Approved</option>
                <option value="reject">Rejected</option>
              </select>
            </div>

            {isLoading ? (
              <div className="loading-indicator">Memuat data user...</div>
            ) : (
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
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map((user) => (
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
                              <div className="action-buttons">
                                <button 
                                  className="approve-btn" 
                                  onClick={() => handleUserAction(user.id, 'approve')}
                                  disabled={isLoading}
                                >
                                  Approve
                                </button>
                                <button 
                                  className="reject-btn" 
                                  onClick={() => handleUserAction(user.id, 'reject')}
                                  disabled={isLoading}
                                >
                                  Reject
                                </button>
                              </div>
                            ) : (
                              <span className={`status-badge ${user.status}`}>
                                {user.status === "approved" && "Approved"}
                                {user.status === "pending" && "Pending"}
                                {user.status === "rejected" && "Rejected"}
                              </span>
                            )}
                          </td>
                          <td>{user.daftar}</td>
                          <td>{user.approve || '-'}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="10" style={{ textAlign: 'center' }}>
                          {searchTerm ? 'Tidak ada user yang sesuai' : 'Tidak ada data user'}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        <Footer />
      </main>
    </div>
  );
};

export default UserSector;