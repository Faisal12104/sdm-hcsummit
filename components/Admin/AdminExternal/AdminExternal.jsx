import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import {
  FaUser,
  FaUpload,
  FaCheckCircle,
  FaSignOutAlt,
  FaBars,
  FaEnvelope
} from 'react-icons/fa';
import './AdminExternal.css';
import Footer from '../../Footer/Footer';
import esdmLogo from '../../../assets/Logo_Kementerian_ESDM.png';

const AdminExternal = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    id: null,
    nama_lengkap: '',
    email: '',
    no_telp: '',
    sektor: '',
    jabatan: '',
    perusahaan: ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser(parsed);
      setFormData(parsed);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/auth/profilesatker/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          nama_lengkap: formData.nama_lengkap,
          email: formData.email,
          no_telp: formData.no_telp,
          sektor: formData.sektor,
          perusahaan: formData.perusahaan,
          jabatan: formData.jabatan
        })
      });

      const result = await response.json();
      if (response.ok) {
        setUser(result.user);
        setFormData(result.user);
        localStorage.setItem("user", JSON.stringify(result.user));
        setIsEditing(false);
        alert("Profil berhasil diperbarui!");
      } else {
        alert(result.message || "Gagal update profil");
      }
    } catch (error) {
      console.error("Update Error:", error);
      alert("Terjadi kesalahan saat update profil");
    }
  };

  const handleCancel = () => {
    setFormData(user); // Kembalikan formData ke state user asli
    setIsEditing(false);
  };

  return (
    <div className="dashboard-external">
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
          <button onClick={() => navigate('/approval')}>
            <FaCheckCircle />
            <span>Status Berkas</span>
          </button>
          <button className="active-link">
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
          <span>HI, {user.nama_lengkap?.toUpperCase() || 'USER'}!</span>
        </div>

        <div className="profile-container">
          <div className="profile-header">
            <div className="profile-info">
              <img src="https://i.pravatar.cc/100" alt="Profile" className="profile-avatar" />
              <div>
                <div className="profile-name">{user.nama_lengkap}</div>
                <div className="profile-email">{user.email}</div>
              </div>
            </div>

            {isEditing ? (
              <div className="button-group">
                <button className="save-btn" onClick={handleSave}>Save</button>
                <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
              </div>
            ) : (
              <button className="edit-btn" onClick={() => setIsEditing(true)}>Edit</button>
            )}
          </div>

          <div className="profile-form">
                      <div className="form-row">
                        <div className="form-group">
                          <label>Nama Lengkap</label>
                          <input
                            type="text"
                            name="nama_lengkap"
                            value={user.nama_lengkap}
                            onChange={handleChange}
                            readOnly={!isEditing}
                          />
                        </div>
                        <div className="form-group">
                          <label>Nomor Hp</label>
                          <input
                            type="text"
                            name="no_telp"
                            value={user.no_telp}
                            onChange={handleChange}
                            readOnly={!isEditing}
                          />
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group">
                          <label>Sektor</label>
                          <input
                            type="text"
                            name="sektor"
                            value={user.sektor}
                            onChange={handleChange}
                            readOnly={!isEditing}
                          />
                        </div>
                        <div className="form-group">
                          <label>Jabatan</label>
                          <input
                            type="text"
                            name="jabatan"
                            value={user.jabatan}
                            onChange={handleChange}
                            readOnly={!isEditing}
                          />
                        </div>
                      </div>
                      <div className="form-group full-width">
                        <label>Perusahaan</label>
                        <input
                          type="text"
                          name="perusahaan"
                          value={user.perusahaan}
                          onChange={handleChange}
                          readOnly={!isEditing}
                        />
                      </div>
                    </div>
          
                    <div className="email-section">
                      <div className="section-title">My email Address</div>
                      <div className="email-item">
                        <FaEnvelope className="email-icon" />
                        <div>
                          <div className="email-text">{user.email}</div>
                          <div className="email-date">Last updated just now</div>
                        </div>
                      </div>
                    </div>
                  </div>
        <Footer />
      </main>
    </div>
  );
};

export default AdminExternal;
