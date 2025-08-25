// Upload.jsx
import React, { useState } from 'react';  
import { useNavigate } from 'react-router-dom';
import {
  FaUser,
  FaUpload,
  FaSignOutAlt,
  FaCheckCircle,
  FaBars,
  FaSpinner
} from 'react-icons/fa';
import './Upload.css';
import Footer from '../../../Footer/Footer';
import esdmLogo from '../../../../assets/Logo_Kementerian_ESDM.png';

const Upload = () => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // form data UI
  const [formData, setFormData] = useState({
    title: '',
    sector: '',
    category: '',
    file: null,
    uploadDate: new Date().toLocaleDateString('id-ID')
  });

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isLoggedIn');
    navigate('/');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.sector || !formData.category || !formData.file) {
      setError('Semua field harus diisi');
      return;
    }

    if (formData.file && !/\.csv$/i.test(formData.file.name)) {
      setError('File harus berformat .csv');
      return;
    }

    setIsUploading(true);
    setError(null);
    setSuccess(null);

    try {
      const token = localStorage.getItem('token') || null;
      const rawUser = JSON.parse(localStorage.getItem('user') || '{}');

      const id_user        = rawUser?.id;
      const id_perusahaan  = rawUser?.id_perusahaan;
      const id_sektor      = rawUser?.id_sektor;
      const id_jabatan     = rawUser?.id_jabatan;
      const id_tipe        = rawUser?.id_tipe ?? 1;

      const missing = [];
      if (!id_user)       missing.push('id_user');
      if (!id_perusahaan) missing.push('id_perusahaan');
      if (!id_sektor)     missing.push('id_sektor');
      if (!id_jabatan)    missing.push('id_jabatan');
      if (!id_tipe)       missing.push('id_tipe');

      if (missing.length) {
        setError(`Data berikut belum tersedia pada localStorage.user: ${missing.join(', ')}. 
          Silakan pastikan endpoint login mengembalikan ID referensi (bukan hanya nama).`);
        setIsUploading(false);
        return;
      }

      const fd = new FormData();
      fd.append('id_user', id_user);
      fd.append('id_perusahaan', id_perusahaan);
      fd.append('id_sektor', id_sektor);
      fd.append('id_jabatan', id_jabatan);
      fd.append('id_tipe', id_tipe);
      fd.append('file', formData.file);

      fd.append('judul', formData.title);
      fd.append('sektor_nama', formData.sector);
      fd.append('kategori_nama', formData.category);

      const headers = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const response = await fetch('http://localhost:3000/api/berkas/upload', {
        method: 'POST',
        headers,
        body: fd
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.error || result?.message || 'Gagal mengupload berkas');
      }

      setSuccess(result?.message || 'Berkas CSV berhasil diunggah');
      setFormData({
        title: '',
        sector: '',
        category: '',
        file: null,
        uploadDate: new Date().toLocaleDateString('id-ID')
      });
    } catch (err) {
      console.error('Upload error:', err);
      setError(err.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="dashboard-upload">
      {/* Sidebar */}
      <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''} ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <button className="burger-btn desktop-only" onClick={() => setIsCollapsed(!isCollapsed)}>
            <FaBars size={20} />
          </button>
          <img src={esdmLogo} alt="Kementerian ESDM" className="sidebar-logo" />
          {!isCollapsed && <span className="logo-text">BPSDM ESDM</span>}
        </div>

         <nav className="nav-links">
                  <button className="active-link" onClick={() => navigate('/upload')}>
                    <FaUpload />
                    <span>Upload Berkas</span>
                  </button>
                  <button onClick={() => navigate('/approval')}>
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
          <button className="burger-btn mobile-only" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <FaBars size={20} />
          </button>
          <span>HI, EKSTERNAL!</span>
        </div>


        {/* Upload Form */}
        <div className="upload-form-container">
          <form className="upload-form" onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="form-group">
              <label htmlFor="title">Judul Berkas</label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Judul Berkas"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="sector">Sektor</label>
              <input
                type="text"
                id="sector"
                name="sector"
                placeholder="Sektor"
                value={formData.sector}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Kategori</label>
              <input
                type="text"
                id="category"
                name="category"
                placeholder="Kategori"
                value={formData.category}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="file">Upload File</label>
              <div className="upload-file-group">
                <input
                  type="file"
                  id="file"
                  accept=".csv,text/csv"
                  onChange={handleFileChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Tanggal Upload</label>
              <input type="text" value={formData.uploadDate} readOnly />
            </div>

            <button type="submit" disabled={isUploading}>
              {isUploading ? (<><FaSpinner className="spinner" /> Mengupload...</>) : ('Upload')}
            </button>

            {error && <p className="error-text">{error}</p>}
            {success && <p className="success-text">{success}</p>}
          </form>
        </div>

        <Footer />
      </main>
    </div>
  );
};

export default Upload;
