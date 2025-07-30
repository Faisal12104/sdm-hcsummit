import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import esdmLogo from '../../assets/Logo_Kementerian_ESDM.png';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate('/auth');
  };

  return (
    <div className="landing-page">
      <Header />
      
      <main className="main-content">
        <section className="hero">
          <div className="hero-logo-container">
            <img 
              src={esdmLogo} 
              alt="Kementerian ESDM" 
              className="hero-logo"
            />
          </div>
          <h1>PORTAL BERKAS BPSDM ESDM</h1>
          <p>Human Capital Summit 2025</p>
          <button 
            className="cta-button"
            onClick={handleStartClick}
          >
            Mulai Sekarang
          </button>
        </section>
        
        <section className="features" id="features">
          <h2>Berita Terbaru</h2>
          <div className="feature-cards">
            <div className="card">
              <h3>Berita 1</h3>
              <p>Coming Soon</p>
            </div>
            <div className="card">
              <h3>Berita 2</h3>
              <p>Coming Soon</p>
            </div>
            <div className="card">
              <h3>Berita 3</h3>
              <p>Coming Soon</p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default HomePage;