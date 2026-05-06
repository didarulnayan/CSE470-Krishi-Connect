import React, { useEffect, useState } from 'react';
import CropCard from './CropCard';

// ==========================================
// Requirement 2 - Nayan
// BuyerHomepage Component
// ==========================================
// Feature 1: Displays a homepage grid of all available crops from the database.
// Feature 2: Each crop is shown via the CropCard component (image, name, price).
// Feature 3: Clicking a card navigates to the DetailedView.

const BuyerHomepage = ({ user, onSelectCrop, onGoToOrder }) => {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCrops = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await fetch('http://localhost:5000/api/crops');
        const result = await response.json();

        if (!response.ok) {
          setError(result.error || 'Failed to load crops.');
          setCrops([]);
          return;
        }

        setCrops(result.data || []);
      } catch (err) {
        setError('Could not connect to the server. Make sure the server is running.');
        setCrops([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCrops();
  }, []);

  const pageStyle = {
    padding: '28px 24px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f8fbf5',
    minHeight: '80vh',
  };

  const headingStyle = {
    margin: '0 0 6px 0',
    fontSize: '26px',
    fontWeight: '700',
    color: '#1b3a1f',
  };

  const subheadingStyle = {
    margin: '0 0 28px 0',
    color: '#4b5d47',
    fontSize: '14px',
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: '20px',
  };

  const emptySyle = {
    textAlign: 'center',
    color: '#888',
    marginTop: '60px',
    fontSize: '15px',
  };

  return (
    <div style={pageStyle}>
      <h2 style={headingStyle}>🌾 Available Crops</h2>
      <p style={subheadingStyle}>
        Welcome, <strong>{user.name}</strong>! Browse all available crops below and click a card to view details.
      </p>

      {loading && <p style={{ textAlign: 'center', color: '#555' }}>Loading crops...</p>}
      {error && <p style={{ textAlign: 'center', color: '#c62828' }}>{error}</p>}

      {/* Feature 1: Grid of crops */}
      {!loading && !error && crops.length === 0 && (
        <p style={emptySyle}>No crops are currently available. Check back later!</p>
      )}

      {!loading && !error && crops.length > 0 && (
        <div style={gridStyle}>
          {/* Feature 2 & 3: CropCard renders each crop and triggers navigation on click */}
          {crops.map((crop) => (
            <CropCard key={crop._id} crop={crop} onClick={onSelectCrop} />
          ))}
        </div>
      )}
    </div>
  );
};

// ==========================================
// End of Requirement 2 - Nayan
// ==========================================

export default BuyerHomepage;
