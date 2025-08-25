import React, { useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { FaUser, FaFileAlt, FaSignOutAlt, FaHome, FaUserCircle, FaBars, FaEnvelope } from 'react-icons/fa';
import './ProfileSector.css';
import Footer from '../../../Footer/Footer';
import esdmLogo from '../../../../assets/Logo_Kementerian_ESDM.png';
import axios from 'axios';

const ProfileSector = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  // State untuk data user
  const [user, setUser] = useState({
    id: null,
    name: '',
    email: '',
    phone: '',
    sektor: '',
    jabatan: '',
    perusahaan: ''
  });

  // State untuk input form sementara
  const [formData, setFormData] = useState({ ...user });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const u = JSON.parse(storedUser);
      setUser(u);
      setFormData({
        id: u.id,
        name: u.name,
        email: u.email,
        phone: u.phone,
        sektor: u.sektor,
        jabatan: u.jabatan,
        perusahaan: u.perusahaan
      });
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

  const handleSubmit = async () => {
    try {
      const payload = {
        userId: formData.id,
        nama_lengkap: formData.name,
        email: formData.email,
        no_telp: formData.phone,
        sektor: formData.sektor,
        perusahaan: formData.perusahaan,
        jabatan: formData.jabatan
      };

      const response = await axios.put('http://localhost:3000/api/auth/profilesatker/update', payload);
      
      const updatedUser = {
        id: response.data.user.id,
        name: response.data.user.nama_lengkap,
        email: response.data.user.email,
        phone: response.data.user.no_telp,
        sektor: response.data.user.sektor,
        jabatan: response.data.user.jabatan,
        perusahaan: response.data.user.perusahaan
      };

      setUser(updatedUser);
      setFormData(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setIsEditing(false);
      alert('Profil berhasil diperbarui!');
    } catch (error) {
      console.error('Update profil error:', error.response?.data || error.message);
      alert(error.response?.data?.error || 'Terjadi kesalahan saat update profil');
    }
  };

  return (
    <div className="dashboard-profilesector">
      <aside className="sidebar">
              <div className="sidebar-header">
                <button className="burger-btn desktop-only">
                  <FaBars size={20} />
                </button>
                <img src={esdmLogo} alt="Kementerian ESDM" className="sidebar-logo" />
                <span>BPSDM ESDM</span>
              </div>
        <nav className="nav-links">
          <button onClick={() => navigate('/AdminSector')}><FaHome /><span>Dashboard</span></button>
          <button onClick={() => navigate('/usersector')}><FaUser /><span>Manajemen User</span></button>
          <button onClick={() => navigate('/berkassector')}><FaFileAlt /><span>Manajemen Berkas</span></button>
          <button className="active-link" onClick={() => navigate('/profilesector')}><FaUserCircle /><span>Profile</span></button>
        </nav>
        <button onClick={handleLogout} className="logout-button">
          <FaSignOutAlt /><span>LOGOUT</span>
        </button>
      </aside>

      <main className="main-content">
        <div className="header-right">
          <span>HI, {user.name?.toUpperCase() || 'USER'}!</span>
        </div>

        <div className="profile-container">
          <div className="profile-header">
            <div className="profile-info">
              <img src="https://i.pravatar.cc/100" alt="Profile" className="profile-avatar" />
              <div>
                <div className="profile-name">{user.name}</div>
                <div className="profile-email">{user.email}</div>
              </div>
            </div>
            {isEditing ? (
              <div className="button-group">
                <button
                  className="save-btn"
                  onClick={handleSubmit} // ganti dari handleSave ke handleSubmit
                >
                  Save
                </button>
                <button
                  className="cancel-btn"
                  onClick={() => {
                    setFormData(user); // kembalikan ke data user asli
                    setIsEditing(false); // matikan mode edit
                  }}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button className="edit-btn" onClick={() => setIsEditing(true)}>
                Edit
              </button>
            )}

          </div>

          <div className="profile-form">
            <div className="form-row">
              <div className="form-group">
                <label>Nama Lengkap</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} readOnly={!isEditing} />
              </div>
              <div className="form-group">
                <label>Nomor Hp</label>
                <input type="text" name="phone" value={formData.phone} onChange={handleChange} readOnly={!isEditing} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Sektor</label>
                <input type="text" name="sektor" value={formData.sektor} onChange={handleChange} readOnly={!isEditing} />
              </div>
              <div className="form-group">
                <label>Jabatan</label>
                <input type="text" name="jabatan" value={formData.jabatan} onChange={handleChange} readOnly={!isEditing} />
              </div>
            </div>
            <div className="form-group full-width">
              <label>Perusahaan</label>
              <input type="text" name="perusahaan" value={formData.perusahaan} onChange={handleChange} readOnly={!isEditing} />
            </div>
          </div>

          <div className="email-section">
            <div className="section-title">My email Address</div>
            <div className="email-item">
              <FaEnvelope className="email-icon" />
              <div>
                <div className="email-text">{user.email}</div>
                <div className="email-date">1 month ago</div>
              </div>
            </div>
            <button className="add-email-btn">+ Add Email Address</button>
          </div>
        </div>

        <Footer />
      </main>
    </div>
  );
};

export default ProfileSector;
