import React from 'react';
import { useNavigate } from 'react-router-dom';
import AddCropForm from '../AddCropForm';
import '../styles/HomePage.css';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Krishi-Connect</h1>
      
      <div className="home-content">
        <AddCropForm />
        
        <div className="order-button-container">
          <button 
            className="order-btn"
            onClick={() => navigate('/orders')}
          >
            📦 VIEW ORDERS
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
