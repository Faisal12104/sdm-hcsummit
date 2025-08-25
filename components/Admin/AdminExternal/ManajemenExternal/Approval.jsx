import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import {
  FaUser,
  FaUpload,
  FaSignOutAlt,
  FaCheckCircle,
  FaBars
} from 'react-icons/fa';
import './Approval.css';
import Footer from '../../../Footer/Footer';
import esdmLogo from '../../../../assets/Logo_Kementerian_ESDM.png';

const Approval = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [files, setFiles] = useState([]);

  const token = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");

  useEffect(() => {
    // 🔑 Ambil user dari localStorage (bukan fetch lagi)
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // 🔑 Ambil data berkas berdasarkan user.id
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      fetch(`http://localhost:3000/api/berkas/berkas/mine?id_user=${parsedUser.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(res => res.json())
        .then(result => {
          console.log("Berkas API result:", result);
          if (result && result.data) {
            setFiles(result.data);
          }
        })
        .catch(err => console.error(err));
    }
  }, [token, storedUser]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="dashboard-approval">
      {/* Sidebar */}
      <aside className="sidebar">
              <div className="sidebar-header">
                <button className="burger-btn desktop-only">
                  <FaBars size={20} />
                </button>
                <img src={esdmLogo} alt="Kementerian ESDM" className="sidebar-logo" />
                <span>BPSDM ESDM</span>
              </div>

        <nav className="nav-links">
          <button onClick={() => navigate('/upload')}>
            <FaUpload />
            <span>Upload Berkas</span>
          </button>
          <button className="active-link" onClick={() => navigate('/approval')}>
            <FaCheckCircle />
            <span>Status Berkas</span>
          </button>
          <button onClick={() => navigate('/AdminExternal')}>
            <FaUser />
            <span>Profil</span>
          </button>
        </nav>

        <button onClick={handleLogout} className="logout-button">
          <FaSignOutAlt />
          <span>LOGOUT</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <div className="header-right">
          <span className="header-title">HI, EKSTERNAL!</span>
        </div>

        <div className="content-wrapper">
          {/* Tabel User */}
          <div className="approval-table">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>EMAIL</th>
                  <th>SEKTOR</th>
                  <th>KATEGORI</th>
                </tr>
              </thead>
              <tbody>
                {user && (
                  <tr>
                    <td>{user.id}</td>
                    <td>{user.email}</td>
                    <td>{user.sektor}</td>
                    <td>{user.role}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Tabel Berkas */}
          <div className="approval-table">
            <table>
              <thead>
                <tr>
                  <th>Judul Berkas</th>
                  <th>Tanggal Upload</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {files.map((file) => (
                  <tr key={file.id}>
                    <td>{file.nama_file}</td>
                    <td>{formatDate(file.tanggal_upload)}</td>
                    <td>
                      {file.status === 'Approve' && (
                        <span className="status-label approve">Approve</span>
                      )}
                      {file.status === 'Rejected' && (
                        <span className="status-label reject">Rejected</span>
                      )}
                      {file.status === 'Waiting' && (
                        <span className="status-label waiting">Waiting</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <Footer />
      </main>
    </div>
  );
};

export default Approval;
