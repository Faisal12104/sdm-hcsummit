import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaFileAlt, FaSignOutAlt, FaHome, FaUserCircle, FaBars, FaEdit } from 'react-icons/fa';
import './BerkasSector.css';
import Footer from '../../../Footer/Footer';
import esdmLogo from '../../../../assets/Logo_Kementerian_ESDM.png';

const BerkasSector = () => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [berkasList, setBerkasList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch berkas data on component mount
  useEffect(() => {
    const fetchBerkas = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/api/berkas/satker', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch berkas data');
        }
        
        const data = await response.json();
        setBerkasList(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching berkas:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBerkas();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleEdit = (id) => {
    navigate(`/berkassector/edit/${id}`);
  };

  // Filter berkas based on search term
  const filteredBerkas = berkasList.filter(berkas =>
    berkas.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    berkas.id.toString().includes(searchTerm)
  );

  return (
    <div className="dashboard-berkassector">
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
          <button onClick={() => navigate('/usersector')}><FaUser /><span>Manajemen User</span></button>
          <button className="active-link" onClick={() => navigate('/berkassector')}><FaFileAlt /><span>Manajemen Berkas</span></button>
          <button onClick={() => navigate('/profilesector')}><FaUserCircle /><span>Profile</span></button>
        </nav>
        <button onClick={handleLogout} className="logout-button">
          <FaSignOutAlt /><span>LOGOUT</span>
        </button>
      </aside>

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
                placeholder="Cari berkas..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {isLoading ? (
              <div className="loading-indicator">Memuat data berkas...</div>
            ) : (
              <div className="table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>EMAIL</th>
                      <th>STATUS</th>
                      <th>AKSI</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBerkas.length > 0 ? (
                      filteredBerkas.map((berkas) => (
                        <tr key={berkas.id}>
                          <td>{berkas.id}</td>
                          <td>{berkas.email}</td>
                          <td>
                            <span
                              className={`status ${
                                berkas.status === 'approved'
                                  ? 'approved'
                                  : berkas.status === 'rejected'
                                  ? 'rejected'
                                  : 'pending'
                              }`}
                            >
                              {berkas.status === 'approved'
                                ? 'Approved'
                                : berkas.status === 'rejected'
                                ? 'Rejected'
                                : 'Pending'}
                            </span>
                          </td>
                          <td>
                            <button 
                              className="edit-btn"
                              onClick={() => handleEdit(berkas.id)}
                              disabled={isLoading}
                            >
                              <FaEdit /> Edit
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" style={{ textAlign: 'center' }}>
                          {searchTerm ? 'Tidak ada berkas yang sesuai' : 'Tidak ada data berkas'}
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

export default BerkasSector;