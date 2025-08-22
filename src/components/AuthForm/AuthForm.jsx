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
    confirmPassword: '',
    nama_lengkap: '',
    no_telp: '',
    id_perusahaan: '',
    id_jabatan: '',
    id_sektor: ''
  });

  const navigate = useNavigate();

  // -------------------- HANDLE INPUT --------------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  // -------------------- HANDLE LOGIN --------------------
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          emailOrUsername: formData.email,
          password: formData.password,
        }),
      });

      const result = await response.json();
      console.log('Login Response:', result);

      if (response.ok && result.success) {
        // simpan data
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));
        localStorage.setItem("role", result.user.id_role);
        localStorage.setItem("isApproved", String(result.user.is_approved));

        // baca role dari backend (string atau object)
        const roleStr =
          typeof result.user.role === "string"
            ? result.user.role
            : result.user.role?.nama_role || "";

        const userRole = roleStr.toLowerCase();

        // mapping dashboard sesuai role - synchronized with backend
        const roleMapping = {
          "superadmin": "/SuperAdmin",
          "super admin": "/SuperAdmin",
          "admin sektor": "/AdminSector",
          "adminsector": "/AdminSector",
          "admin eksternal": "/AdminExternal",
          "adminexternal": "/AdminExternal",
          "eksternal": "/AdminExternal", // maintain backward compatibility
        };

        const targetRoute = roleMapping[userRole] || "/AdminExternal";
        console.log("Redirecting to:", targetRoute);

        setIsLoginSuccess(true);
        setShowPopup(true);

        navigate(targetRoute);
      } else {
        console.error(result.error || result.message || "Login gagal");
        setIsLoginSuccess(false);
        setShowPopup(true);
      }
    } catch (error) {
      console.error("Login Error:", error);
      setIsLoginSuccess(false);
      setShowPopup(true);
    }
  };

  // -------------------- HANDLE REGISTER --------------------
  const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setIsLoginSuccess(false);
      setShowPopup(true);
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nama_lengkap: formData.nama_lengkap,
          username: formData.username,
          email: formData.email,
          no_telp: formData.no_telp,
          password: formData.password,
          id_role: 3, 
          id_perusahaan: formData.id_perusahaan,
          id_jabatan: formData.id_jabatan,
          id_sektor: formData.id_sektor
        }),
      });

      const result = await response.json();
      console.log('Register Response:', result);

      if (response.ok && result.success) {
        setIsLoginSuccess(true);
        setShowPopup(true);

        // reset form
        setFormData({
          email: '',
          username: '',
          password: '',
          confirmPassword: '',
          nama_lengkap: '',
          no_telp: '',
          id_perusahaan: '',
          id_jabatan: '',
          id_sektor: ''
        });
      } else {
        setIsLoginSuccess(false);
        setShowPopup(true);
      }
    } catch (error) {
      console.error('Register Error:', error);
      setIsLoginSuccess(false);
      setShowPopup(true);
    }
  };

  return (
    <div className="landing-page">
      <Header />

      <div className="auth-page">
        <div className="auth-container">
          <div className="auth-logo-container">
            <img src={esdmLogo} alt="Kementerian ESDM" className="auth-logo" />
          </div>

          <h1 className="auth-title">
            PORTAL BERKAS <br /> BPSDM ESDM
          </h1>
          <p className="auth-subtitle">Human Capital Summit 2025</p>

          <div className="auth-active-tab-title">
            {activeTab === 'login' ? 'LOGIN' : 'REGISTRASI'}
          </div>

          <form
            className="auth-form"
            onSubmit={activeTab === 'login' ? handleLogin : handleRegister}
          >
            {activeTab === 'login' ? (
              <>
                {/* LOGIN FORM */}
                <div className="auth-input-group">
                  <label htmlFor="login-email" className="auth-input-label">
                    Email atau Username
                  </label>
                  <input
                    id="login-email"
                    type="text"
                    name="email"
                    placeholder="Masukkan email atau username Anda"
                    className="auth-input"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="auth-input-group">
                  <label htmlFor="login-password" className="auth-input-label">
                    Password
                  </label>
                  <div className="password-input-container">
                    <input
                      id="login-password"
                      type={showPassword ? 'text' : 'password'}
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
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                <button type="submit" className="auth-button">
                  MASUK
                </button>
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
                {/* REGISTER FORM */}
                <div className="auth-input-group">
                  <label htmlFor="register-name" className="auth-input-label">
                    Nama Lengkap
                  </label>
                  <input
                    id="register-name"
                    type="text"
                    name="nama_lengkap"
                    placeholder="Masukkan nama lengkap Anda"
                    className="auth-input"
                    value={formData.nama_lengkap}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="auth-input-group">
                  <label htmlFor="register-username" className="auth-input-label">
                    Username
                  </label>
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
                  <label htmlFor="register-email" className="auth-input-label">
                    Email
                  </label>
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
                  <label htmlFor="register-phone" className="auth-input-label">
                    Nomor HP
                  </label>
                  <input
                    id="register-phone"
                    type="tel"
                    name="no_telp"
                    placeholder="Masukkan nomor HP Anda"
                    className="auth-input"
                    value={formData.no_telp}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Perusahaan, Jabatan, Sektor */}
                <div className="auth-input-group">
                  <label htmlFor="register-company" className="auth-input-label">
                    Perusahaan
                  </label>
                  <input
                    id="register-company"
                    type="text"
                    name="id_perusahaan"
                    placeholder="Masukkan ID Perusahaan"
                    className="auth-input"
                    value={formData.id_perusahaan}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="auth-input-group">
                  <label htmlFor="register-position" className="auth-input-label">
                    Jabatan
                  </label>
                  <input
                    id="register-position"
                    type="text"
                    name="id_jabatan"
                    placeholder="Masukkan ID Jabatan"
                    className="auth-input"
                    value={formData.id_jabatan}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="auth-input-group">
                  <label htmlFor="register-sector" className="auth-input-label">
                    Sektor
                  </label>
                  <input
                    id="register-sector"
                    type="text"
                    name="id_sektor"
                    placeholder="Masukkan ID Sektor"
                    className="auth-input"
                    value={formData.id_sektor}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Password */}
                <div className="auth-input-group">
                  <label htmlFor="register-password" className="auth-input-label">
                    Password
                  </label>
                  <div className="password-input-container">
                    <input
                      id="register-password"
                      type={showPassword ? 'text' : 'password'}
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
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                <div className="auth-input-group">
                  <label htmlFor="register-confirm-password" className="auth-input-label">
                    Konfirmasi Password
                  </label>
                  <div className="password-input-container">
                    <input
                      id="register-confirm-password"
                      type={showConfirmPassword ? 'text' : 'password'}
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
                    Saya menyetujui{' '}
                    <a href="/comingsoon" className="terms-link">
                      Syarat dan Ketentuan
                    </a>
                  </label>
                </div>

                <button type="submit" className="auth-button">
                  DAFTAR
                </button>
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
          message={
            isLoginSuccess
              ? activeTab === 'login'
                ? 'Login berhasil!'
                : 'Registrasi berhasil!'
              : 'Waiting For Approved'
          }
          onClose={() => setShowPopup(false)}
        />
      )}

      <Footer />
    </div>
  );
};

export default AuthForm;
