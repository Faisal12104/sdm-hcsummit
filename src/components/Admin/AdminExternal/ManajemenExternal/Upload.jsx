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
  const [formData, setFormData] = useState({
    title: '',
    sector: '',
    file: null,
    uploadDate: new Date().toLocaleDateString('id-ID')
  });

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      file: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.sector || !formData.file) {
      setError('Semua field harus diisi');
      return;
    }

    setIsUploading(true);
    setError(null);
    setSuccess(null);

    try {
      const token = localStorage.getItem('token');
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('sector', formData.sector);
      formDataToSend.append('file', formData.file);

      const response = await fetch('http://localhost:3000/api/berkas/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataToSend
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Gagal mengupload berkas');
      }

      setSuccess('Berkas berhasil diupload!');
      setFormData({
        title: '',
        sector: '',
        file: null,
        uploadDate: new Date().toLocaleDateString('id-ID')
      });
    } catch (err) {
      setError(err.message);
      console.error('Upload error:', err);
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
          <button onClick={() => navigate('/AdminExternal')}>
            <FaUser />
            <span>Profile</span>
          </button>
          <button className="active-link" onClick={() => navigate('/upload')}>
            <FaUpload />
            <span>Upload Berkas</span>
          </button>
          <button onClick={() => navigate('/approval')}>
            <FaCheckCircle />
            <span>Approval</span>
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
          <span>HI, External!</span>
        </div>

        {/* Upload Form */}
        <div className="upload-form-container">
          <h2>Upload Berkas</h2>
          
          {error && <div className="alert error">{error}</div>}
          {success && <div className="alert success">{success}</div>}

          <form className="upload-form" onSubmit={handleSubmit}>
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
                placeholder="Masukkan nama sektor"
                value={formData.sector}
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
                  accept=".csv"
                  onChange={handleFileChange}
                  required
                />
                {formData.file && (
                  <div className="file-info">
                    {formData.file.name} ({Math.round(formData.file.size / 1024)} KB)
                  </div>
                )}
              </div>
            </div>

            <div className="form-group">
              <label>Tanggal Upload</label>
              <input
                type="text"
                value={formData.uploadDate}
                readOnly
              />
            </div>

            <button type="submit" disabled={isUploading}>
              {isUploading ? (
                <>
                  <FaSpinner className="spinner" /> Mengupload...
                </>
              ) : (
                'Upload'
              )}
            </button>
          </form>
        </div>

        <Footer />
      </main>
    </div>
  );
};

export default Upload;
