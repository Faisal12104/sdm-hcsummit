import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaFileAlt,
  FaSignOutAlt,
  FaHome,
  FaUserCircle,
  FaBars,
} from "react-icons/fa";
import "./UserSector.css";
import Footer from "../../../Footer/Footer";
import esdmLogo from "../../../../assets/Logo_Kementerian_ESDM.png";

const UserSector = () => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filter, setFilter] = useState("pending");
  const [searchTerm, setSearchTerm] = useState("");
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const sektorId = 3; // contoh sektorId

  // 🔹 Ambil data user
  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `http://localhost:3000/api/auth/adminsatker?sektorId=${sektorId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) throw new Error("Gagal mengambil data user");

        const data = await response.json();

        const mapped = (data.data || []).map((u) => ({
          id: u.id,
          nama: u.nama_lengkap,
          email: u.email,
          perusahaan: u.perusahaan?.nama_perusahaan || "-",
          jabatan: u.jabatan?.nama_jabatan || "-",
          sektor: u.sektor?.nama_sektor || "-",
          role: u.role?.nama_role || "-",
          status: u.eksternal?.status_registrasi || "Pending",
          daftar: new Date(u.createdAt).toLocaleString("id-ID"),
          approve: u.eksternal?.tanggal_approval
            ? new Date(u.eksternal.tanggal_approval).toLocaleString("id-ID")
            : "-",
        }));

        setUserList(mapped);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [sektorId]);

  // 🔹 Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  // 🔹 Approve / Reject
  const handleUserAction = async (userId, action) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:3000/api/auth/adminsatker",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            userId,
            action: action === "approve" ? "Approved" : "Rejected",
            sektorId,
          }),
        }
      );

      if (!response.ok) throw new Error(`Gagal ${action} user`);

      // update state
      setUserList((prev) =>
        prev.map((u) =>
          u.id === userId
            ? {
                ...u,
                status: action === "approve" ? "Approved" : "Rejected",
                approve:
                  action === "approve"
                    ? new Date().toLocaleString("id-ID")
                    : u.approve,
              }
            : u
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  // 🔹 Filter & Search
  const filteredUsers = userList
    .filter((u) => {
      if (filter === "approve") return u.status === "Approved";
      if (filter === "reject") return u.status === "Rejected";
      if (filter === "pending") return u.status === "Pending";
      return true;
    })
    .filter((u) => {
      if (!searchTerm) return true;
      return (
        u.nama?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.perusahaan?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

  return (
    <div className="dashboard-usersector">
      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? "open" : ""} ${isCollapsed ? "collapsed" : ""}`}>

        <div className="sidebar-header">
          <button className="burger-btn desktop-only" onClick={() => setIsCollapsed(!isCollapsed)}>
            <FaBars size={20} />
          </button>
          <img src={esdmLogo} alt="Kementerian ESDM" className="sidebar-logo" />
          <span>BPSDM ESDM</span>
        </div>
        <nav className="nav-links">
          <button onClick={() => navigate("/AdminSector")}>
            <FaHome /> <span>Dashboard</span>
          </button>
          <button className="active-link" onClick={() => navigate("/usersector")}>
            <FaUser /> <span>Manajemen User</span>
          </button>
          <button onClick={() => navigate("/berkassector")}>
            <FaFileAlt /> <span>Manajemen Berkas</span>
          </button>
          <button onClick={() => navigate("/profilesector")}>
            <FaUserCircle /> <span>Profile</span>
          </button>
        </nav>
        <button onClick={handleLogout} className="logout-button">
          <FaSignOutAlt /> <span>LOGOUT</span>
        </button>
      </aside>

      {/* Main */}
      <main className="main-content">
        <div className="header-right">
             <button className="burger-btn mobile-only" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                 <FaBars size={20} />
              </button>
           <span>HI ADMIN!</span>
        </div>

        <div className="manajemen-container">
          <div className="toolbar">
            <input
              type="text"
              placeholder="Search"
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="toolbar-right">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="filter-select"
            >
              <option value="pending">Filter</option>
              <option value="approve">Approved</option>
              <option value="reject">Rejected</option>
            </select>

            <button
              className="add-button"
              onClick={() => navigate('/berkas/add')} // sesuaikan route/fungsi
            >
              Tambah User +
            </button>
          </div>
          </div>

          {isLoading ? (
            <div>Memuat data...</div>
          ) : (
            <div className="table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>NAMA</th>
                    <th>EMAIL</th>
                    <th>PERUSAHAAN</th>
                    <th>JABATAN</th>
                    <th>SEKTOR</th>
                    <th>ROLE</th>
                    <th>{filter === "pending" ? "AKSI" : "STATUS"}</th>
                    <th>TANGGAL DAFTAR</th>
                    <th>TANGGAL APPROVE</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((u) => (
                      <tr key={u.id}>
                        <td>{u.id}</td>
                        <td>{u.nama}</td>
                        <td>{u.email}</td>
                        <td>{u.perusahaan}</td>
                        <td>{u.jabatan}</td>
                        <td>{u.sektor}</td>
                        <td>{u.role}</td>
                        <td>
                          {filter === "pending" ? (
                            <div className="action-buttons">
                              <button
                                className="approve-btn"
                                onClick={() => handleUserAction(u.id, "approve")}
                              >
                                Approve
                              </button>
                              <button
                                className="reject-btn"
                                onClick={() => handleUserAction(u.id, "reject")}
                              >
                                Reject
                              </button>
                            </div>
                          ) : (
                            <span className={`status-badge ${u.status.toLowerCase()}`}>
                              {u.status}
                            </span>
                          )}
                        </td>
                        <td>{u.daftar}</td>
                        <td>{u.approve}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="10" style={{ textAlign: "center" }}>
                        Tidak ada data
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default UserSector;
