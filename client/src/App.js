import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DetailedViewPage from './pages/DetailedViewPage';
import AddCropForm from './AddCropForm';
import './index.css';

function App() {
  return (
    <Router>
      <nav className="App-navbar">
        <Link to="/" className="nav-brand">Krishi-Connect 🌾</Link>
        <Link to="/add" className="nav-link" style={{marginLeft: 'auto', marginRight: '1rem', fontWeight: 'bold', color: '#10B981', textDecoration: 'none'}}>+ Add Crop</Link>
      </nav>
      <main className="App-main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/crop/:id" element={<DetailedViewPage />} />
          <Route path="/add" element={<AddCropForm />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;