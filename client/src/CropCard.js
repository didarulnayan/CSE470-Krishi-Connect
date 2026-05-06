import React from 'react';

// ==========================================
// Requirement 2 - Nayan
// CropCard Component
// ==========================================
// A reusable card that shows a crop's image, name, and price.
// Clicking it navigates to the DetailedView page.

const CropCard = ({ crop, onClick }) => {
  const cardStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    border: '1px solid #e0e8da',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
  };

  const imgStyle = {
    width: '100%',
    height: '180px',
    objectFit: 'cover',
    backgroundColor: '#f0f5ec',
  };

  const infoStyle = {
    padding: '14px 16px',
  };

  const nameStyle = {
    margin: '0 0 6px 0',
    fontSize: '16px',
    fontWeight: '700',
    color: '#1b3a1f',
    fontFamily: 'Arial, sans-serif',
  };

  const priceStyle = {
    margin: 0,
    fontSize: '14px',
    color: '#2f7d32',
    fontWeight: '600',
    fontFamily: 'Arial, sans-serif',
  };

  const categoryStyle = {
    display: 'inline-block',
    fontSize: '11px',
    backgroundColor: '#e8f5e9',
    color: '#388e3c',
    borderRadius: '4px',
    padding: '2px 7px',
    marginBottom: '8px',
    fontFamily: 'Arial, sans-serif',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  };

  return (
    <div
      style={cardStyle}
      onClick={() => onClick(crop)}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.13)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.07)';
      }}
    >
      {/* Feature 2: Crop Image */}
      {crop.imageUrl ? (
        <img src={crop.imageUrl} alt={crop.name} style={imgStyle} />
      ) : (
        <div style={{ ...imgStyle, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa', fontSize: '13px' }}>
          No Image
        </div>
      )}

      <div style={infoStyle}>
        {/* Feature 2: Category Badge */}
        {crop.category && <span style={categoryStyle}>{crop.category}</span>}

        {/* Feature 2: Crop Name */}
        <p style={nameStyle}>{crop.name}</p>

        {/* Feature 2: Crop Price */}
        <p style={priceStyle}>BDT {crop.price} / Kg</p>
      </div>
    </div>
  );
};

// ==========================================
// End of Requirement 2 - Nayan
// ==========================================

export default CropCard;
