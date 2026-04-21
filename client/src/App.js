import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DetailedViewPage from './pages/DetailedViewPage';
import './index.css';

function App() {
  return (
    <Router>
      <nav className="App-navbar">
        <Link to="/" className="nav-brand">Krishi-Connect 🌾</Link>
      </nav>
      <main className="App-main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/crop/:id" element={<DetailedViewPage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
