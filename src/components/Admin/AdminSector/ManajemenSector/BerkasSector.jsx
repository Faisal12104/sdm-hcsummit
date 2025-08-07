import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaUser, FaFileAlt, FaSignOutAlt, FaHome,
  FaUserCircle, FaBars, FaFileSignature, FaEdit
} from 'react-icons/fa';
import './BerkasSector.css';
import Footer from '../../../Footer/Footer';
import esdmLogo from '../../../../assets/Logo_Kementerian_ESDM.png';

const BerkasSector = () => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userList] = useState([
  { id: 2, email: 'rahayu@gmail.com', status: 'pending' },
  { id: 3, email: 'radian@gmail.com', status: 'rejected' }
]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/');
  };

  return (
    <div className="dashboard-container">
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
          <button onClick={() => navigate('/daftarsector')}><FaFileSignature /><span>Manajemen Pendaftaran</span></button>
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
    {userList.map((user) => (
      <tr key={user.id}>
        <td>{user.id}</td>
        <td>{user.email}</td>
        <td>
          <span
            className={`status ${
              user.status === 'approved'
                ? 'approved'
                : user.status === 'rejected'
                ? 'rejected'
                : 'pending'
            }`}
          >
            {user.status === 'approved'
              ? 'Approve'
              : user.status === 'rejected'
              ? 'Rejected'
              : 'Pending'}
          </span>
        </td>
        <td>
          <button className="edit-btn">
            <FaEdit /> Edit
          </button>
        </td>
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

export default BerkasSector;
