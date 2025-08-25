import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaBuilding,
  FaFileAlt,
  FaSignOutAlt,
  FaHome,
  FaUserCircle,
  FaBars,
  FaEnvelope,
} from "react-icons/fa";
import "./Profile.css";
import Footer from "../../../Footer/Footer";
import esdmLogo from "../../../../assets/Logo_Kementerian_ESDM.png";

const Profile = () => {
  const navigate = useNavigate();

  // state user
  const [user, setUser] = useState({
    userId: "",
    nama_lengkap: "",
    email: "",
    no_telp: "",
    sektor: "",
    jabatan: "",
    perusahaan: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser({
        userId: parsedUser.id || "",
        nama_lengkap: parsedUser.nama_lengkap || parsedUser.name || "",
        email: parsedUser.email || "",
        no_telp: parsedUser.no_telp || parsedUser.phone || "",
        sektor: parsedUser.sektor || "",
        jabatan: parsedUser.jabatan || "",
        perusahaan: parsedUser.perusahaan || "",
      });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/auth/profilesatker/update",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        }
      );

      if (!response.ok) throw new Error("Gagal update profil");

      const result = await response.json();
      alert(result.message || "Profil berhasil diperbarui");

      // update localStorage
      localStorage.setItem("user", JSON.stringify(user));
      setIsEditing(false);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="dashboard-profileadmin">
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
          <button onClick={() => navigate("/SuperAdmin")}>
            <FaHome />
            <span>Dashboard</span>
          </button>
          <button onClick={() => navigate("/user")}>
            <FaUser />
            <span>Manajemen User</span>
          </button>
          <button onClick={() => navigate("/sektor")}>
            <FaBuilding />
            <span>List Sektor</span>
          </button>
          <button onClick={() => navigate("/berkas")}>
            <FaFileAlt />
            <span>Manajemen Berkas</span>
          </button>
          <button
            className="active-link"
            onClick={() => navigate("/profile")}
          >
            <FaUserCircle />
            <span>Profile</span>
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
          <span>HI, {user.nama_lengkap?.toUpperCase() || "USER"}!</span>
        </div>

        <div className="profile-container">
          <div className="profile-header">
            <div className="profile-info">
              <img
                src="https://i.pravatar.cc/100"
                alt="Profile"
                className="profile-avatar"
              />
              <div>
                <div className="profile-name">{user.nama_lengkap}</div>
                <div className="profile-email">{user.email}</div>
              </div>
            </div>
            {isEditing ? (
              <>
                {isEditing ? (
                  <div className="button-group">
                    <button className="save-btn" onClick={handleSave}>
                      Save
                    </button>
                    <button className="cancel-btn" onClick={() => setIsEditing(false)}>
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button className="edit-btn" onClick={() => setIsEditing(true)}>
                    Edit
                  </button>
                )}

              </>
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

export default Profile;
