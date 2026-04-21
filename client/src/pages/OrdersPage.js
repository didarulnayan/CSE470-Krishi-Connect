import React from 'react';
import { useNavigate } from 'react-router-dom';
import OwnerDashboard from '../OwnerDashboard';
import '../styles/OrdersPage.css';

function OrdersPage() {
  const navigate = useNavigate();

  return (
    <div className="orders-page">
      <div className="orders-header">
        <h1>Krishi-Connect - Orders Dashboard</h1>
        <button 
          className="back-btn"
          onClick={() => navigate('/')}
        >
          ← Back to Home
        </button>
      </div>
      <OwnerDashboard />
    </div>
  );
}

export default OrdersPage;
