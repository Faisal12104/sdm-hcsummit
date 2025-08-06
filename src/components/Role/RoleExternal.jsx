import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import esdmLogo from '../../assets/Logo_Kementerian_ESDM.png';
import './Role.css';

const RoleExternal = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    if (selectedRole) {
      // bisa kirim role lewat state jika perlu: navigate('/register', { state: { role: selectedRole } });
      navigate('/register');
    } else {
      alert('Silakan pilih role terlebih dahulu.');
    }
  };

  return (
    <div className="role-container">
      <div className="role-left">
        <img src={esdmLogo} alt="Logo ESDM" className="role-logo" />
        <h2>
          PORTAL BERKAS
          <br />
          BPSDM ESDM
        </h2>
        <p>Human Capital Summit 2025</p>
      </div>
      <div className="role-right">
        <h2>Register</h2>
        <p>
          <strong>Register sebagai:</strong>
        </p>
        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          className="role-select"
          aria-label="Pilih role"
        >
          <option value="">Pilih Role</option>
          <option value="external">External</option>
        </select>

        <button className="role-button" onClick={handleRegister}>
          Register sekarang
        </button>

        <p className="forgot-password">Lupa Password?</p>

        {selectedRole && (
          <p className="debug-role">
            Role yang dipilih: <strong>{selectedRole}</strong>
          </p>
        )}
      </div>
    </div>
  );
};

export default RoleExternal;
