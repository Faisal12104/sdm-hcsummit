import React, { useState, useEffect } from "react";
import {
  FaBars,
  FaHome,
  FaUser,
  FaBuilding,
  FaFileAlt,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Berkas.css";
import Footer from "../../../Footer/Footer";
import esdmLogo from "../../../../assets/Logo_Kementerian_ESDM.png";

const Berkas = () => {
  const navigate = useNavigate();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [berkasList, setBerkasList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSektor, setFilterSektor] = useState("");

  // ✅ Fetch data berkas
  const fetchBerkas = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "http://localhost:3000/api/berkas/superadmin/berkas"
      );
      if (!response.ok) throw new Error("Gagal mengambil data");
      const data = await response.json();
      setBerkasList(data.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBerkas();
  }, []);

  // 🔹 Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  // 🔹 Approve / Reject / Download
  const handleAction = async (id, action) => {
    try {
      if (action === "download") {
        const res = await fetch(
          `http://localhost:3000/api/berkas/superadmin/berkas/${id}/download`
        );
        if (!res.ok) throw new Error("Gagal download file");
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `berkas_${id}.csv`);
        document.body.appendChild(link);
        link.click();
        link.remove();
      } else {
        const res = await fetch(
          `http://localhost:3000/api/berkas/superadmin/berkas/${id}/${action}`,
          { method: "PUT" }
        );
        if (!res.ok) throw new Error(`Gagal ${action} berkas`);
        const result = await res.json();
        alert(result.message);
        fetchBerkas(); // refresh list
      }
    } catch (err) {
      alert(err.message);
    }
  };

  // ✅ Filtering data (nama_file + status + sektor)
  const filteredData = berkasList.filter((item) => {
    const matchSearch =
      (item.nama_file || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (item.status || "").toLowerCase().includes(searchTerm.toLowerCase());

    const matchSektor =
      filterSektor === "" || String(item.id_sektor) === filterSektor;

    return matchSearch && matchSektor;
  });

  return (
    <div className="dashboard-berkasadmin">
      {/* Sidebar */}
      <aside
        className={`sidebar ${isCollapsed ? "collapsed" : ""} ${
          isSidebarOpen ? "open" : ""
        }`}
      >
        <div className="sidebar-header">
          <button
            className="burger-btn desktop-only"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
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
          <button onClick={() => navigate("/berkas")} className="active-link">
            <FaFileAlt />
            <span>Manajemen Berkas</span>
          </button>
          <button onClick={() => navigate("/profile")}>
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
          <button
            className="burger-btn mobile-only"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <FaBars size={20} />
          </button>
          <span>HI, SUPERADMIN!</span>
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

            {/* ✅ Filter Sektor */}
            <select
              className="filter-sektor"
              value={filterSektor}
              onChange={(e) => setFilterSektor(e.target.value)}
            >
              <option value="">Semua Sektor</option>
              {[...new Set(berkasList.map((b) => b.id_sektor))].map((sektor) => (
                <option key={sektor} value={sektor}>
                  Sektor {sektor}
                </option>
              ))}
            </select>
          </div>

          <div className="table-wrapper">
            {isLoading ? (
              <p>Loading...</p>
            ) : error ? (
              <p style={{ color: "red" }}>Error: {error}</p>
            ) : (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>SEKTOR</th>
                    <th>NAMA FILE</th>
                    <th>STATUS</th>
                    <th>TANGGAL UPLOAD</th>
                    <th>TANGGAL APPROVE</th>
                    <th>PERUSAHAAN</th>
                    <th>AKSI</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.length > 0 ? (
                    filteredData.map((item) => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.id_sektor}</td>
                        <td>{item.nama_file}</td>
                        <td>{item.status || "-"}</td>
                        <td>
                          {item.tanggal_upload
                            ? new Date(item.tanggal_upload).toLocaleDateString(
                                "id-ID"
                              )
                            : "-"}
                        </td>
                        <td>
                          {item.tanggal_approve
                            ? new Date(item.tanggal_approve).toLocaleDateString(
                                "id-ID"
                              )
                            : "-"}
                        </td>
                        <td>{item.id_perusahaan}</td>
                        <td>
                          <select
                            className="action-select"
                            onChange={(e) =>
                              handleAction(item.id, e.target.value)
                            }
                            defaultValue=""
                          >
                            <option value="" disabled>
                              Pilih
                            </option>
                            <option value="approve">Approve</option>
                            <option value="reject">Reject</option>
                            <option value="download">Download</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" style={{ textAlign: "center" }}>
                        Tidak ada data
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>

        <Footer />
      </main>
    </div>
  );
};

export default Berkas;
