import React from 'react';

// ==========================================
// Requirement 2 - Nayan (UX Improved)
// ==========================================

const categoryColors = {
  Vegetable: { bg: '#dcfce7', color: '#15803d' },
  Fruit:     { bg: '#fef3c7', color: '#92400e' },
  Grain:     { bg: '#fef9c3', color: '#713f12' },
  Spice:     { bg: '#fce7f3', color: '#9d174d' },
};

const CropCard = ({ crop, onClick }) => {
  const cat = categoryColors[crop.category] || { bg: '#f1f5f9', color: '#475569' };

  return (
    <div
      onClick={() => onClick(crop)}
      style={{
        background: '#fff',
        borderRadius: '14px',
        border: '1px solid #e2e8f0',
        overflow: 'hidden',
        cursor: 'pointer',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        transition: 'transform 0.18s ease, box-shadow 0.18s ease',
        display: 'flex',
        flexDirection: 'column',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 12px 28px rgba(0,0,0,0.11)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)';
      }}
    >
      {/* Image */}
      {crop.imageUrl ? (
        <img src={crop.imageUrl} alt={crop.name} style={{ width: '100%', height: '175px', objectFit: 'cover' }} />
      ) : (
        <div style={{
          width: '100%', height: '175px', background: '#f0fdf4',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '42px',
        }}>🌿</div>
      )}

      <div style={{ padding: '14px 16px', flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {/* Category badge */}
        {crop.category && (
          <span style={{
            alignSelf: 'flex-start',
            fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px',
            padding: '3px 9px', borderRadius: '999px',
            backgroundColor: cat.bg, color: cat.color,
          }}>
            {crop.category}
          </span>
        )}

        {/* Name */}
        <p style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: '#0f172a', lineHeight: '1.3' }}>
          {crop.name}
        </p>

        {/* Farmer */}
        {crop.farmerName && (
          <p style={{ margin: 0, fontSize: '12px', color: '#94a3b8' }}>
            👨‍🌾 {crop.farmerName}
          </p>
        )}

        {/* Price */}
        <p style={{ margin: '4px 0 0', fontSize: '17px', fontWeight: '800', color: '#16a34a' }}>
          ৳ {crop.price} <span style={{ fontSize: '12px', fontWeight: '500', color: '#94a3b8' }}>/ Kg</span>
        </p>

        {/* View details hint */}
        <div style={{
          marginTop: 'auto', paddingTop: '10px',
          borderTop: '1px solid #f1f5f9',
          fontSize: '12px', color: '#16a34a', fontWeight: '600',
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
