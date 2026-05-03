import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DetailedViewPage from './pages/DetailedViewPage';
import AddCropForm from './AddCropForm';
import OrderPage from './OrderPage';
import './index.css';

function App() {
  return (
    <Router>
      <nav className="App-navbar">
        <Link to="/" className="nav-brand">Krishi-Connect 🌾</Link>
        <Link to="/orders" className="nav-link" style={{marginLeft: 'auto', marginRight: '1rem', fontWeight: 'bold', color: '#3B82F6', textDecoration: 'none'}}>Orders Check</Link>
      </nav>
      <main className="App-main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/crop/:id" element={<DetailedViewPage />} />
          <Route path="/orders" element={<OrderPage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
