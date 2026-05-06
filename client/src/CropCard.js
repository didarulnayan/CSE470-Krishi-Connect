import React from 'react';

// ==========================================
// Requirement 2 - Nayan (UX Improved)
// ==========================================

const categoryColors = {
  Vegetable: { bg: '#dcfce7', color: '#15803d', glassBg: 'rgba(134,239,172,0.25)', glassColor: '#86efac', glassBorder: 'rgba(134,239,172,0.4)' },
  Fruit:     { bg: '#fef3c7', color: '#92400e', glassBg: 'rgba(253,224,71,0.25)', glassColor: '#fde047', glassBorder: 'rgba(253,224,71,0.4)' },
  Grain:     { bg: '#fef9c3', color: '#713f12', glassBg: 'rgba(253,211,77,0.25)', glassColor: '#fcd34d', glassBorder: 'rgba(253,211,77,0.4)' },
  Spice:     { bg: '#fce7f3', color: '#9d174d', glassBg: 'rgba(249,168,212,0.25)', glassColor: '#f9a8d4', glassBorder: 'rgba(249,168,212,0.4)' },
};

const CropCard = ({ crop, onClick, glassMode = false }) => {
  const cat = categoryColors[crop.category] || { bg: '#f1f5f9', color: '#475569', glassBg: 'rgba(255,255,255,0.15)', glassColor: '#fff', glassBorder: 'rgba(255,255,255,0.3)' };

  const lightStyle = {
    background: '#fff',
    borderRadius: '14px',
    border: '1px solid #e2e8f0',
    overflow: 'hidden',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    transition: 'transform 0.18s ease, box-shadow 0.18s ease',
    display: 'flex',
    flexDirection: 'column',
  };

  const glassStyle = {
    background: 'rgba(20, 40, 20, 0.65)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    borderRadius: '18px',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    overflow: 'hidden',
    cursor: 'pointer',
    boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
    transition: 'transform 0.18s ease, box-shadow 0.18s ease',
    display: 'flex',
    flexDirection: 'column',
  };

  return (
    <div
      onClick={() => onClick(crop)}
      style={glassMode ? glassStyle : lightStyle}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.boxShadow = glassMode ? '0 18px 48px rgba(0,0,0,0.5)' : '0 12px 28px rgba(0,0,0,0.11)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = glassMode ? '0 8px 32px rgba(0,0,0,0.4)' : '0 2px 8px rgba(0,0,0,0.05)';
      }}
    >
      {/* Image */}
      {crop.imageUrl ? (
        <div style={{ position: 'relative' }}>
          <img
            src={crop.imageUrl}
            alt={crop.name}
            style={{ width: '100%', height: '175px', objectFit: 'cover', display: 'block' }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.style.display = 'none';
              if (glassMode && e.target.nextSibling) e.target.nextSibling.style.display = 'none';
              e.target.parentNode.style.background = glassMode
                ? 'linear-gradient(135deg, rgba(22,163,74,0.3), rgba(5,46,22,0.5))'
                : '#f0fdf4';
              e.target.parentNode.style.height = '175px';
              e.target.parentNode.style.display = 'flex';
              e.target.parentNode.style.alignItems = 'center';
              e.target.parentNode.style.justifyContent = 'center';
              e.target.parentNode.style.fontSize = '42px';
              e.target.parentNode.innerHTML = '🌿';
            }}
          />
          {/* gradient fade on image bottom for glassMode */}
          {glassMode && (
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0, height: '60px',
              background: 'linear-gradient(to top, rgba(5,30,15,0.6), transparent)',
            }} />
          )}
        </div>
      ) : (
        <div style={{
          width: '100%', height: '175px',
          background: glassMode ? 'linear-gradient(135deg, rgba(22,163,74,0.3), rgba(5,46,22,0.5))' : '#f0fdf4',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '42px',
        }}>🌿</div>
      )}

      <div style={{ padding: '14px 16px', flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {/* Category badge */}
        {crop.category && (
          <span style={{
            alignSelf: 'flex-start',
            fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px',
            padding: '3px 9px', borderRadius: '999px',
            backgroundColor: glassMode ? cat.glassBg : cat.bg,
            color: glassMode ? cat.glassColor : cat.color,
            border: glassMode ? `1px solid ${cat.glassBorder}` : 'none',
          }}>
            {crop.category}
          </span>
        )}

        {/* Name */}
        <p style={{ margin: 0, fontSize: '16px', fontWeight: '800', color: glassMode ? '#fff' : '#0f172a', lineHeight: '1.3', textShadow: glassMode ? '0 1px 4px rgba(0,0,0,0.3)' : 'none' }}>
          {crop.name}
        </p>

        {/* Farmer */}
        {crop.farmerName && (
          <p style={{ margin: 0, fontSize: '12px', color: glassMode ? 'rgba(255,255,255,0.8)' : '#94a3b8', fontWeight: '500' }}>
            👨‍🌾 {crop.farmerName}
          </p>
        )}

        {/* Price */}
        <p style={{ margin: '2px 0 0', fontSize: '18px', fontWeight: '900', color: glassMode ? '#86efac' : '#16a34a' }}>
          ৳ {crop.price} <span style={{ fontSize: '12px', fontWeight: '500', color: glassMode ? 'rgba(255,255,255,0.55)' : '#94a3b8' }}>/ Kg</span>
        </p>

        {/* View details hint */}
        <div style={{
          marginTop: 'auto', paddingTop: '10px',
          borderTop: `1px solid ${glassMode ? 'rgba(255,255,255,0.12)' : '#f1f5f9'}`,
          fontSize: '12px', color: glassMode ? '#86efac' : '#16a34a', fontWeight: '700',
          display: 'flex', alignItems: 'center', gap: '4px',
        }}>
          View Details →
        </div>
      </div>
    </div>
  );
};

// ==========================================
// End of Requirement 2 - Nayan
// ==========================================

export default CropCard;
