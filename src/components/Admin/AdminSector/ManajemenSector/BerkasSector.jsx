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
        const response = await fetch('http://localhost:3000/api/berkas/satker?sektorId=3', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch berkas data');
        }
        
        const result = await response.json();
        // backend kirim { data: [...] }
        setBerkasList(result.data || []);
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

  // update status berkas
  const handleEdit = async (id) => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/berkas/satker', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ berkasId: id, status: 'Approved' }) // contoh update ke Approved
      });

      if (!response.ok) {
        throw new Error('Gagal update status berkas');
      }

      const result = await response.json();
      // update state biar tabel ikut berubah
      setBerkasList(prev =>
        prev.map(b => (b.id === id ? { ...b, status: result.data.status } : b))
      );
    } catch (err) {
      console.error('Error updating berkas:', err);
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter berkas berdasarkan search
  const filteredBerkas = berkasList.filter(berkas =>
    berkas.nama_file.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
            

            {isLoading ? (
              <div className="loading-indicator">Memuat data berkas...</div>
            ) : (
              <div className="table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>NAMA FILE</th>
                      <th>STATUS</th>
                      <th>AKSI</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBerkas.length > 0 ? (
                      filteredBerkas.map((berkas) => (
                        <tr key={berkas.id}>
                          <td>{berkas.id}</td>
                          <td>{berkas.nama_file}</td>
                          <td>
                            <span
                              className={`status ${
                                berkas.status.toLowerCase() === 'approved'
                                  ? 'approved'
                                  : berkas.status.toLowerCase() === 'rejected'
                                  ? 'rejected'
                                  : 'pending'
                              }`}
                            >
                              {berkas.status}
                            </span>
                          </td>
                          <td>
                            <button 
                              className="edit-btn"
                              onClick={() => handleEdit(berkas.id)}
                              disabled={isLoading}
                            >
                              <FaEdit />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
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
