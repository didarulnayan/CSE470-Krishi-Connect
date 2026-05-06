import React from 'react';

// ==========================================
// Requirement 2 - Nayan
// DetailedView Component
// ==========================================
// Feature 3: Navigated to by clicking a CropCard on the BuyerHomepage.
// Feature 4: Shows the selling farmer's contact details.
// Clicking "Order Now" directs to Member 3's OrderPage.

const DetailedView = ({ crop, onGoBack, onOrderNow }) => {
  if (!crop) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
        <p>No crop selected.</p>
        <button onClick={onGoBack} style={backBtnStyle}>← Back to Crops</button>
      </div>
    );
  }

  const pageStyle = {
    padding: '28px 24px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f8fbf5',
    minHeight: '80vh',
  };

  const cardStyle = {
    maxWidth: '700px',
    margin: '0 auto',
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    border: '1px solid #e0e8da',
    overflow: 'hidden',
    boxShadow: '0 4px 18px rgba(0,0,0,0.08)',
  };

  const imgStyle = {
    width: '100%',
    height: '280px',
    objectFit: 'cover',
    backgroundColor: '#f0f5ec',
  };

  const bodyStyle = {
    padding: '28px',
  };

  const titleStyle = {
    margin: '0 0 6px 0',
    fontSize: '24px',
    fontWeight: '700',
    color: '#1b3a1f',
  };

  const categoryBadgeStyle = {
    display: 'inline-block',
    fontSize: '12px',
    backgroundColor: '#e8f5e9',
    color: '#388e3c',
    borderRadius: '4px',
    padding: '3px 10px',
    marginBottom: '14px',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  };

  const priceStyle = {
    fontSize: '22px',
    fontWeight: '700',
    color: '#2f7d32',
    margin: '0 0 18px 0',
  };

  const descStyle = {
    color: '#4b5d47',
    fontSize: '15px',
    lineHeight: '1.6',
    margin: '0 0 20px 0',
  };

  const dividerStyle = {
    border: 'none',
    borderTop: '1px solid #e8f0e4',
    margin: '20px 0',
  };

  const sectionTitleStyle = {
    fontSize: '13px',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '0.6px',
    color: '#888',
    margin: '0 0 10px 0',
  };

  const infoRowStyle = {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
    margin: '6px 0',
    color: '#2c4a30',
    fontSize: '15px',
  };

  const orderBtnStyle = {
    display: 'block',
    width: '100%',
    padding: '14px',
    marginTop: '24px',
    backgroundColor: '#2f7d32',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div style={pageStyle}>
      {/* Back Button */}
      <button onClick={onGoBack} style={backBtnStyle}>← Back to Crops</button>

      <div style={cardStyle}>
        {/* Feature 3: Crop Image */}
        {crop.imageUrl ? (
          <img src={crop.imageUrl} alt={crop.name} style={imgStyle} />
        ) : (
          <div style={{ ...imgStyle, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa', fontSize: '14px' }}>
            No Image Available
          </div>
        )}

        <div style={bodyStyle}>
          {crop.category && <span style={categoryBadgeStyle}>{crop.category}</span>}
          <h2 style={titleStyle}>{crop.name}</h2>
          <p style={priceStyle}>BDT {crop.price} / Kg</p>

          {/* Description */}
          {crop.description && <p style={descStyle}>{crop.description}</p>}

          <hr style={dividerStyle} />

          {/* Stock & Order Info */}
          <p style={sectionTitleStyle}>Availability</p>
          <div style={infoRowStyle}><span>📦</span><span>Total Stock: <strong>{crop.totalStock} Kg</strong></span></div>
          <div style={infoRowStyle}><span>🛒</span><span>Minimum Order: <strong>{crop.minOrder} Kg</strong></span></div>
          {crop.harvestDate && (
            <div style={infoRowStyle}><span>🌱</span><span>Harvest Date: <strong>{formatDate(crop.harvestDate)}</strong></span></div>
          )}
          {crop.expiryDate && (
            <div style={infoRowStyle}><span>⏳</span><span>Expiry Date: <strong>{formatDate(crop.expiryDate)}</strong></span></div>
          )}

          <hr style={dividerStyle} />

          {/* Feature 4: Farmer Contact Details */}
          <p style={sectionTitleStyle}>Farmer Contact</p>
          <div style={infoRowStyle}><span>👨‍🌾</span><span>Farmer: <strong>{crop.farmerName || 'N/A'}</strong></span></div>
          <div style={infoRowStyle}>
            <span>📞</span>
            <span>
              Contact:{' '}
              <strong>
                {crop.farmerContact ? (
                  <a href={`tel:${crop.farmerContact}`} style={{ color: '#2f7d32', textDecoration: 'none' }}>
                    {crop.farmerContact}
                  </a>
                ) : 'N/A'}
              </strong>
            </span>
          </div>

          {/* Order Now → Member 3's OrderPage */}
          <button
            style={orderBtnStyle}
            onClick={onOrderNow}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1b5e20')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#2f7d32')}
          >
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
};

const backBtnStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  padding: '8px 16px',
  marginBottom: '20px',
  backgroundColor: '#f0f5ec',
  border: '1px solid #c8dcc0',
  borderRadius: '8px',
  color: '#2f7d32',
  fontSize: '14px',
  fontWeight: '600',
  cursor: 'pointer',
  fontFamily: 'Arial, sans-serif',
};

// ==========================================
// End of Requirement 2 - Nayan
// ==========================================

export default DetailedView;
