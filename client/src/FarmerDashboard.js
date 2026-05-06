import React, { useState, useEffect } from 'react';

// ==========================================
// Requirement 1 - Khalid (Glassmorphism UI)
// ==========================================

const FarmerDashboard = ({ user, onNavigate }) => {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/crops/farmer/${user.name}`);
        const data = await response.json();
        if (response.ok) setCrops(data.data);
      } catch (error) {
        console.error('Network Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCrops();
  }, [user.name]);

  const categoryColors = {
    Vegetable: { bg: 'rgba(134,239,172,0.25)', color: '#86efac', border: 'rgba(134,239,172,0.4)' },
    Fruit:     { bg: 'rgba(253,224,71,0.25)',  color: '#fde047', border: 'rgba(253,224,71,0.4)' },
    Grain:     { bg: 'rgba(253,211,77,0.25)',  color: '#fcd34d', border: 'rgba(253,211,77,0.4)' },
    Spice:     { bg: 'rgba(249,168,212,0.25)', color: '#f9a8d4', border: 'rgba(249,168,212,0.4)' },
  };

  // ── STYLES ──────────────────────────────────────────────────────────────
  const pageStyle = {
    minHeight: 'calc(100vh - 60px)',
    position: 'relative',
    overflow: 'hidden',
  };

  // Layer 1 — background: field photo + gradient overlay
  const bgStyle = {
    position: 'fixed',
    inset: 0,
    zIndex: 0,
    backgroundImage: `
      linear-gradient(
        160deg,
        rgba(5, 46, 22, 0.82) 0%,
        rgba(20, 83, 45, 0.70) 30%,
        rgba(22, 101, 52, 0.55) 60%,
        rgba(134, 239, 172, 0.18) 100%
      ),
      url('https://images.unsplash.com/photo-1500076656116-558758c991c1?w=1600&q=80&fit=crop')
    `,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };

  // Layer 2 — content container
  const contentStyle = {
    position: 'relative',
    zIndex: 1,
    padding: '32px 28px 48px',
    maxWidth: '1120px',
    margin: '0 auto',
  };

  // Glass panel base
  const glass = {
    background: 'rgba(255, 255, 255, 0.10)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    border: '1px solid rgba(255, 255, 255, 0.22)',
    borderRadius: '18px',
  };

  // Page header glass panel
  const headerPanelStyle = {
    ...glass,
    padding: '24px 28px',
    marginBottom: '28px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '14px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
  };

  const headingStyle = {
    margin: 0,
    fontSize: '24px',
    fontWeight: '800',
    color: '#fff',
    textShadow: '0 2px 8px rgba(0,0,0,0.3)',
    letterSpacing: '-0.3px',
  };

  const subStyle = {
    margin: '4px 0 0',
    fontSize: '13px',
    color: 'rgba(255,255,255,0.70)',
  };

  const glassButtonPrimary = {
    padding: '10px 20px',
    background: 'rgba(22, 163, 74, 0.85)',
    color: '#fff',
    border: '1px solid rgba(134,239,172,0.5)',
    borderRadius: '10px',
    fontSize: '14px',
    fontWeight: '700',
    cursor: 'pointer',
    fontFamily: 'Inter, sans-serif',
    backdropFilter: 'blur(8px)',
    transition: 'all 0.18s ease',
    boxShadow: '0 4px 14px rgba(22,163,74,0.3)',
  };

  const glassButtonSecondary = {
    padding: '10px 20px',
    background: 'rgba(255,255,255,0.12)',
    color: 'rgba(255,255,255,0.9)',
    border: '1px solid rgba(255,255,255,0.28)',
    borderRadius: '10px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    fontFamily: 'Inter, sans-serif',
    backdropFilter: 'blur(8px)',
    transition: 'all 0.18s ease',
  };

  // Crop card
  const cardStyle = {
    ...glass,
    background: 'rgba(20, 40, 20, 0.65)', // Darker frosted background for visibility
    border: '1px solid rgba(255, 255, 255, 0.15)',
    overflow: 'hidden',
    boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    display: 'flex',
    flexDirection: 'column',
  };

  return (
    <div style={pageStyle}>
      {/* ── LAYER 1: Farm Background ── */}
      <div style={bgStyle} />

      {/* ── LAYER 2: Glass Content ── */}
      <div style={contentStyle}>

        {/* Header panel */}
        <div style={headerPanelStyle}>
          <div>
            <h2 style={headingStyle}>🌾 My Crop Listings</h2>
            <p style={subStyle}>
              {loading ? 'Loading...' : `${crops.length} listing${crops.length !== 1 ? 's' : ''} published`}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              style={glassButtonSecondary}
              onClick={() => onNavigate('orders')}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.22)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; }}
            >
              📋 Check Orders
            </button>
            <button
              style={glassButtonPrimary}
              onClick={() => onNavigate('add')}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(22,163,74,1)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(22,163,74,0.85)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              + Add New Crop
            </button>
          </div>
        </div>

        {/* ── Crop Grid ── */}
        {loading ? (
          <div style={{ ...glass, padding: '60px', textAlign: 'center', color: 'rgba(255,255,255,0.7)', fontSize: '15px' }}>
            ⏳ Loading your crops...
          </div>
        ) : crops.length === 0 ? (
          <div style={{ ...glass, padding: '60px 20px', textAlign: 'center', boxShadow: '0 8px 32px rgba(0,0,0,0.18)' }}>
            <div style={{ fontSize: '52px', marginBottom: '14px' }}>🌱</div>
            <h3 style={{ color: '#fff', margin: '0 0 8px', fontWeight: '700' }}>No crops listed yet</h3>
            <p style={{ color: 'rgba(255,255,255,0.65)', marginBottom: '20px' }}>Start by adding your first crop listing.</p>
            <button style={glassButtonPrimary} onClick={() => onNavigate('add')}>
              + Add Your First Crop
            </button>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(285px, 1fr))',
            gap: '22px',
          }}>
            {crops.map((crop) => {
              const cat = categoryColors[crop.category] || { bg: 'rgba(255,255,255,0.15)', color: '#fff', border: 'rgba(255,255,255,0.3)' };
              return (
                <div
                  key={crop._id}
                  style={cardStyle}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 18px 48px rgba(0,0,0,0.32)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.22)';
                  }}
                >
                  {/* Crop image */}
                  {crop.imageUrl ? (
                    <div style={{ position: 'relative' }}>
                      <img
                        src={crop.imageUrl}
                        alt={crop.name}
                        style={{ width: '100%', height: '170px', objectFit: 'cover', display: 'block' }}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'none';
                          e.target.parentNode.style.background = 'linear-gradient(135deg, rgba(22,163,74,0.3), rgba(5,46,22,0.5))';
                          e.target.parentNode.style.height = '170px';
                          e.target.parentNode.style.display = 'flex';
                          e.target.parentNode.style.alignItems = 'center';
                          e.target.parentNode.style.justifyContent = 'center';
                          e.target.parentNode.style.fontSize = '48px';
                          e.target.parentNode.innerHTML = '🌿';
                        }}
                      />
                      {/* gradient fade on image bottom */}
                      <div style={{
                        position: 'absolute', bottom: 0, left: 0, right: 0, height: '60px',
                        background: 'linear-gradient(to top, rgba(5,30,15,0.6), transparent)',
                      }} />
                    </div>
                  ) : (
                    <div style={{
                      height: '170px',
                      background: 'linear-gradient(135deg, rgba(22,163,74,0.3), rgba(5,46,22,0.5))',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px',
                    }}>🌿</div>
                  )}

                  {/* Card body */}
                  <div style={{ padding: '16px 18px 18px', flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>

                    {/* Name + category badge */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <h3 style={{ margin: 0, fontSize: '17px', fontWeight: '800', color: '#fff', textShadow: '0 1px 4px rgba(0,0,0,0.3)' }}>
                        {crop.name}
                      </h3>
                      <span style={{
                        fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px',
                        padding: '4px 10px', borderRadius: '999px',
                        backgroundColor: cat.bg, color: cat.color,
                        border: `1px solid ${cat.border}`,
                        whiteSpace: 'nowrap', marginLeft: '8px',
                      }}>
                        {crop.category}
                      </span>
                    </div>

                    {/* Price */}
                    <div style={{ fontSize: '20px', fontWeight: '900', color: '#86efac', letterSpacing: '-0.5px' }}>
                      ৳ {crop.price} <span style={{ fontSize: '13px', fontWeight: '500', color: 'rgba(255,255,255,0.55)' }}>/ Kg</span>
                    </div>

                    {/* Details grid */}
                    <div style={{
                      display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 12px',
                      background: 'rgba(0,0,0,0.18)',
                      borderRadius: '10px', padding: '10px 12px',
                      fontSize: '12px', color: 'rgba(255,255,255,0.75)',
                      border: '1px solid rgba(255,255,255,0.1)',
                    }}>
                      <span>🌱 Harvested: <strong style={{ color: '#fff' }}>{new Date(crop.harvestDate).toLocaleDateString()}</strong></span>
                      <span>⏳ Expires: <strong style={{ color: '#fff' }}>{new Date(crop.expiryDate).toLocaleDateString()}</strong></span>
                      <span>📦 Stock: <strong style={{ color: '#fff' }}>{crop.totalStock} Kg</strong></span>
                      <span>⚖️ Min: <strong style={{ color: '#fff' }}>{crop.minOrder} Kg</strong></span>
                    </div>

                    {/* Description */}
                    <p style={{ margin: 0, fontSize: '13px', color: 'rgba(255,255,255,0.65)', lineHeight: '1.5' }}>
                      {crop.description}
                    </p>

                    {/* Footer */}
                    <div style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      borderTop: '1px solid rgba(255,255,255,0.12)',
                      paddingTop: '10px', marginTop: 'auto',
                      fontSize: '12px',
                    }}>
                      <span style={{ color: 'rgba(255,255,255,0.8)', fontWeight: '600' }}>👨‍🌾 {crop.farmerName}</span>
                      <a
                        href={`tel:${crop.farmerContact}`}
                        style={{ color: '#86efac', fontWeight: '700', textDecoration: 'none', fontSize: '12px' }}
                      >
                        📞 {crop.farmerContact}
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

// ==========================================
// End of Requirement 1 - Khalid
// ==========================================

export default FarmerDashboard;
