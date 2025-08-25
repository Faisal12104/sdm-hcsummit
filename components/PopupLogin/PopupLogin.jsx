import React, { useEffect } from 'react';
import './PopupLogin.css';
import { FaCheck, FaTimes } from 'react-icons/fa';

const PopupLogin = ({ isSuccess, message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`popup-container ${isSuccess ? 'success' : 'error'}`}>
      <div className="popup-content">
        <div className="icon-animation">
          {isSuccess ? (
            <FaCheck className="check-icon" />
          ) : (
            <FaTimes className="x-icon" />
          )}
        </div>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default PopupLogin;