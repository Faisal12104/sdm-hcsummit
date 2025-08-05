import React, { useState } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import esdmLogo from '../../assets/Logo_Kementerian_ESDM.png';
import PopupLogin from '../PopupLogin/PopupLogin';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './AuthForm.css';
import { useNavigate } from 'react-router-dom';


const AuthForm = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [showPopup, setShowPopup] = useState(false);
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    name: '',
    company: '',
    position: '',
    phone: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (activeTab === 'login') {
  if (formData.email && formData.username && formData.password) {
    setIsLoginSuccess(true);
    setShowPopup(true);
    // Simpan token dummy atau info login (jika belum ada backend)
    localStorage.setItem('isLoggedIn', 'true');

    // Redirect ke dashboard setelah beberapa saat (misalnya setelah popup sukses ditutup)
    setTimeout(() => {
      navigate('/AdminExternal');
    }, 1000); // tunggu 1 detik biar popup sempat tampil

    // Reset form
    setFormData({
      email: '',
      username: '',
      password: '',
      name: '',
      company: '',
      position: '',
      phone: '',
      confirmPassword: ''
    });
  } else {
    setIsLoginSuccess(false);
    setShowPopup(true);
  }
    } else {
      if (formData.name && formData.username && formData.email && 
          formData.company && formData.position && formData.phone &&
          formData.password && formData.password === formData.confirmPassword &&
          agreeToTerms) {
        setIsLoginSuccess(true);
        setShowPopup(true);
        setFormData({
          email: '',
          username: '',
          password: '',
          name: '',
          company: '',
          position: '',
          phone: '',
          confirmPassword: ''
        });
        setAgreeToTerms(false);
      } else {
        setIsLoginSuccess(false);
        setShowPopup(true);
      }
    }
  };

  return (
    <div className="landing-page">
      <Header />
      
      <div className="auth-page">
        <div className="auth-container">
          <div className="auth-logo-container">
            <img 
              src={esdmLogo} 
              alt="Kementerian ESDM" 
              className="auth-logo"
            />
          </div>
          
          <h1 className="auth-title">PORTAL BERKAS<br/>BPSDM ESDM</h1>
          <p className="auth-subtitle">Human Capital Summit 2025</p>
          
          <div className="auth-active-tab-title">
            {activeTab === 'login' ? 'LOGIN' : 'REGISTRASI'}
          </div>
          
          <form className="auth-form" onSubmit={handleSubmit}>
            {activeTab === 'login' ? (
              <>
                <div className="auth-input-group">
                  <label htmlFor="login-email" className="auth-input-label">Email</label>
                  <input 
                    id="login-email"
                    type="email" 
                    name="email"
                    placeholder="Masukkan email Anda" 
                    className="auth-input" 
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="auth-input-group">
                  <label htmlFor="login-username" className="auth-input-label">Username</label>
                  <input 
                    id="login-username"
                    type="text" 
                    name="username"
                    placeholder="Masukkan username Anda" 
                    className="auth-input" 
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="auth-input-group">
                  <label htmlFor="login-password" className="auth-input-label">Password</label>
                  <div className="password-input-container">
                    <input 
                      id="login-password"
                      type={showPassword ? "text" : "password"} 
                      name="password"
                      placeholder="Masukkan password Anda" 
                      className="auth-input" 
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    <button 
                      type="button"
                      className="password-toggle"
                      onClick={togglePasswordVisibility}
                      aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>
                
                <button type="submit" className="auth-button">MASUK</button>
                
                <p className="auth-switch-text">
                  Belum punya akun?{' '}
                  <span 
                    className="auth-switch-link" 
                    onClick={() => setActiveTab('register')}
                  >
                    Daftar di sini
                  </span>
                </p>
              </>
            ) : (
              <>
                <div className="auth-input-group">
                  <label htmlFor="register-name" className="auth-input-label">Nama Lengkap</label>
                  <input 
                    id="register-name"
                    type="text" 
                    name="name"
                    placeholder="Masukkan nama lengkap Anda" 
                    className="auth-input" 
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="auth-input-group">
                  <label htmlFor="register-username" className="auth-input-label">Username</label>
                  <input 
                    id="register-username"
                    type="text" 
                    name="username"
                    placeholder="Masukkan username Anda" 
                    className="auth-input" 
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="auth-input-group">
                  <label htmlFor="register-email" className="auth-input-label">Email</label>
                  <input 
                    id="register-email"
                    type="email" 
                    name="email"
                    placeholder="Masukkan email Anda" 
                    className="auth-input" 
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="auth-input-group">
                  <label htmlFor="register-company" className="auth-input-label">Perusahaan</label>
                  <input 
                    id="register-company"
                    type="text" 
                    name="company"
                    placeholder="Masukkan nama perusahaan Anda" 
                    className="auth-input" 
                    value={formData.company}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="auth-input-group">
                  <label htmlFor="register-position" className="auth-input-label">Jabatan</label>
                  <input 
                    id="register-position"
                    type="text" 
                    name="position"
                    placeholder="Masukkan jabatan Anda" 
                    className="auth-input" 
                    value={formData.position}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="auth-input-group">
                  <label htmlFor="register-phone" className="auth-input-label">Nomor HP</label>
                  <input 
                    id="register-phone"
                    type="tel" 
                    name="phone"
                    placeholder="Masukkan nomor HP Anda" 
                    className="auth-input" 
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="auth-input-group">
                  <label htmlFor="register-password" className="auth-input-label">Password</label>
                  <div className="password-input-container">
                    <input 
                      id="register-password"
                      type={showPassword ? "text" : "password"} 
                      name="password"
                      placeholder="Buat password Anda (min. 8 karakter)" 
                      className="auth-input" 
                      value={formData.password}
                      onChange={handleChange}
                      minLength="8"
                      required
                    />
                    <button 
                      type="button"
                      className="password-toggle"
                      onClick={togglePasswordVisibility}
                      aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>
                
                <div className="auth-input-group">
                  <label htmlFor="register-confirm-password" className="auth-input-label">Konfirmasi Password</label>
                  <div className="password-input-container">
                    <input 
                      id="register-confirm-password"
                      type={showConfirmPassword ? "text" : "password"} 
                      name="confirmPassword"
                      placeholder="Ulangi password Anda" 
                      className="auth-input" 
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                    <button 
                      type="button"
                      className="password-toggle"
                      onClick={toggleConfirmPasswordVisibility}
                      aria-label={showConfirmPassword ? "Sembunyikan password" : "Tampilkan password"}
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                <div className="terms-checkbox-group">
                  <input
                    type="checkbox"
                    id="agreeTerms"
                    checked={agreeToTerms}
                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                    required
                  />
                  <label htmlFor="agreeTerms">
                    Saya menyetujui <a href="/comingsoon" className="terms-link">Syarat dan Ketentuan</a>
                  </label>
                </div>
                
                <button type="submit" className="auth-button">DAFTAR</button>
                
                <p className="auth-switch-text">
                  Sudah punya akun?{' '}
                  <span 
                    className="auth-switch-link" 
                    onClick={() => setActiveTab('login')}
                  >
                    Login di sini
                  </span>
                </p>
              </>
            )}
          </form>
        </div>
      </div>
      
      {showPopup && (
        <PopupLogin
          isSuccess={isLoginSuccess}
          message={isLoginSuccess 
            ? activeTab === 'login' 
              ? "Login berhasil!" 
              : "Registrasi berhasil!"
            : activeTab === 'login'
              ? "Email, username dan password wajib diisi!"
              : !agreeToTerms
                ? "Anda harus menyetujui Syarat dan Ketentuan!"
                : formData.password !== formData.confirmPassword
                  ? "Password dan konfirmasi password tidak sama!"
                  : "Semua field wajib diisi!"}
          onClose={() => setShowPopup(false)}
        />
      )}
      
      <Footer />
    </div>
  );
};

export default AuthForm;