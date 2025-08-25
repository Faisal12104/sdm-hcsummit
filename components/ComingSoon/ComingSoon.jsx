import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './ComingSoon.css';

const ComingSoon = () => {
  // Set target date (30 days from now)
  const [targetDate] = useState(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000));
  const [timeLeft, setTimeLeft] = useState({
    days: 30,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(timer);
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="landing-page">
      <Header />
      
      <div className="coming-soon-container">
        <div className="coming-soon-content">
          <h1>Coming Soon</h1>
          <p>Halaman ini sedang dalam pengembangan</p>
          <div className="countdown">
            <div className="countdown-item">
              <span className="number">{timeLeft.days.toString().padStart(2, '0')}</span>
              <span className="label">Hari</span>
            </div>
            <div className="countdown-item">
              <span className="number">{timeLeft.hours.toString().padStart(2, '0')}</span>
              <span className="label">Jam</span>
            </div>
            <div className="countdown-item">
              <span className="number">{timeLeft.minutes.toString().padStart(2, '0')}</span>
              <span className="label">Menit</span>
            </div>
            <div className="countdown-item">
              <span className="number">{timeLeft.seconds.toString().padStart(2, '0')}</span>
              <span className="label">Detik</span>
            </div>
          </div>
          <button className="notify-button">Beritahu Saya Saat Sudah Rilis</button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ComingSoon;