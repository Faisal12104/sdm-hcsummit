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

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    nama_lengkap: '',
    email: '',
    no_telp: '',
    nama_perusahaan: '',
    nama_jabatan: '',
    nama_sektor: ''
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

// -------------------- HANDLE LOGIN --------------------
const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: formData.username,
        password: formData.password,
      }),
    });

    const result = await response.json();
    console.log("Login Response:", result);

    if (response.ok) {
      // Simpan user ke localStorage
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("user", JSON.stringify(result.user));

      // --- Normalisasi role ---
      let roleStr = result.user.role?.toLowerCase() || "";
      roleStr = roleStr.replace(/_/g, " "); // "admin_satuan_kerja" → "admin satuan kerja"

      // --- Mapping role → route ---
      const roleMapping = {
        "superadmin": "/SuperAdmin",
        "admin sektor": "/AdminSector",
        "admin eksternal": "/AdminExternal",
        "admin satuan kerja": "/AdminSector", // 🔑 langsung arahkan ke AdminSector
      };

      const targetRoute = roleMapping[roleStr] || "/";

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
          nama_perusahaan: formData.nama_perusahaan,
          nama_jabatan: formData.nama_jabatan,
          nama_sektor: formData.nama_sektor
        }),
      });

      const result = await response.json();
      console.log('Register Response:', result);

      if (response.ok) {
        setIsLoginSuccess(true);
        setShowPopup(true);

        // reset form
        setFormData({
          username: '',
          password: '',
          confirmPassword: '',
          nama_lengkap: '',
          email: '',
          no_telp: '',
          nama_perusahaan: '',
          nama_jabatan: '',
          nama_sektor: ''
        });
      } else {
        console.error(result.error || result.message || "Registrasi gagal");
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
                <div className="auth-input-group">
                  <label>Username</label>
                  <input
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
                  <label>Password</label>
                  <div className="password-input-container">
                    <input
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
                {/* contoh form registrasi */}
                <div className="auth-input-group">
                  <label>Nama Lengkap</label>
                  <input
                    type="text"
                    name="nama_lengkap"
                    className="auth-input"
                    placeholder="Masukkan nama lengkap Anda"
                    value={formData.nama_lengkap}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="auth-input-group">
                  <label>Username</label>
                  <input
                    type="text"
                    name="username"
                    className="auth-input"
                    placeholder="Masukkan username Anda"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="auth-input-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    className="auth-input"
                    placeholder="Masukkan email Anda"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="auth-input-group">
                  <label>No. Telp</label>
                  <input
                    type="text"
                    name="no_telp"
                    className="auth-input"
                    placeholder="Masukkan nomor HP Anda"
                    value={formData.no_telp}
                    onChange={handleChange}
                  />
                </div>
                <div className="auth-input-group">
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    className="auth-input"
                    placeholder="Buat password Anda (min. 8 karakter)"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="auth-input-group">
                  <label>Konfirmasi Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    className="auth-input"
                    placeholder="Ulangi password Anda"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="auth-input-group">
                  <label>Nama Perusahaan</label>
                  <input
                    type="text"
                    name="nama_perusahaan"
                    className="auth-input"
                    placeholder="Masukkan Perusahaan Anda"
                    value={formData.nama_perusahaan}
                    onChange={handleChange}
                  />
                </div>
                <div className="auth-input-group">
                  <label>Nama Jabatan</label>
                  <input
                    type="text"
                    name="nama_jabatan"
                    className="auth-input"
                    placeholder="Masukkan Jabatan Anda"
                    value={formData.nama_jabatan}
                    onChange={handleChange}
                  />
                </div>
                <div className="auth-input-group">
                  <label>Nama Sektor</label>
                  <input
                    type="text"
                    name="nama_sektor"
                    className="auth-input"
                    placeholder="Masukkan Sektor Anda"
                    value={formData.nama_sektor}
                    onChange={handleChange}
                  />
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
                : 'Registrasi berhasil! Menunggu approval admin.'
              : 'Login / Registrasi gagal'
          }
          onClose={() => setShowPopup(false)}
        />
      )}

      <Footer />
    </div>
  );
};

export default AuthForm;
