import React, { useState, useEffect } from 'react';

// ==========================================
// Requirement 1 - Khalid (UX Improved)
// ==========================================

const FarmerDashboard = ({ user, onNavigate }) => {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/crops/farmer/${user.name}`);
        const data = await response.json();
        if (response.ok) {
          setCrops(data.data);
        }
      } catch (error) {
        console.error('Network Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCrops();
  }, [user.name]);

  const categoryColor = {
    Vegetable: { bg: '#dcfce7', color: '#15803d' },
    Fruit: { bg: '#fef3c7', color: '#92400e' },
    Grain: { bg: '#fef9c3', color: '#713f12' },
    Spice: { bg: '#fce7f3', color: '#9d174d' },
  };

  return (
    <div style={{ padding: '28px 24px', maxWidth: '1100px', margin: '0 auto' }}>

      {/* ── Page Header ── */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '28px',
        flexWrap: 'wrap',
        gap: '12px',
      }}>
        <div>
          <h2 style={{ margin: '0 0 4px', fontSize: '22px', fontWeight: '800', color: '#0f172a' }}>
            My Crop Listings
          </h2>
          <p style={{ margin: 0, fontSize: '14px', color: '#64748b' }}>
            {loading ? 'Loading...' : `${crops.length} listing${crops.length !== 1 ? 's' : ''} published`}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            className="kc-btn-secondary"
            onClick={() => onNavigate('orders')}
          >
            📋 Check Orders
          </button>
          <button
            className="kc-btn-primary"
            onClick={() => onNavigate('add')}
          >
            + Add New Crop
          </button>
        </div>
      </div>

      {/* ── Content ── */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px', color: '#94a3b8', fontSize: '15px' }}>
          ⏳ Loading your crops...
        </div>
      ) : crops.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '60px 20px',
          background: '#fff',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
        }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>🌱</div>
          <h3 style={{ color: '#0f172a', marginBottom: '8px' }}>No crops listed yet</h3>
          <p style={{ color: '#64748b', marginBottom: '20px' }}>Add your first crop listing to get started.</p>
          <button className="kc-btn-primary" onClick={() => onNavigate('add')}>
            + Add Your First Crop
          </button>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '20px',
        }}>
          {crops.map((crop) => {
            const catStyle = categoryColor[crop.category] || { bg: '#f1f5f9', color: '#475569' };
            return (
              <div key={crop._id} style={{
                background: '#fff',
                borderRadius: '14px',
                border: '1px solid #e2e8f0',
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                transition: 'transform 0.18s ease, box-shadow 0.18s ease',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)'; }}
              >
                {/* Image */}
                {crop.imageUrl ? (
                  <img src={crop.imageUrl} alt={crop.name} style={{ width: '100%', height: '160px', objectFit: 'cover' }} />
                ) : (
                  <div style={{ width: '100%', height: '160px', background: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px' }}>🌿</div>
                )}

                <div style={{ padding: '16px' }}>
                  {/* Name + badge */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>{crop.name}</h3>
                    <span style={{
                      fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px',
                      padding: '3px 8px', borderRadius: '999px',
                      backgroundColor: catStyle.bg, color: catStyle.color,
                      whiteSpace: 'nowrap', marginLeft: '8px',
                    }}>{crop.category}</span>
                  </div>

                  {/* Price */}
                  <div style={{ fontSize: '18px', fontWeight: '800', color: '#16a34a', marginBottom: '12px' }}>
                    ৳ {crop.price} <span style={{ fontSize: '13px', fontWeight: '500', color: '#64748b' }}>/ Kg</span>
                  </div>

                  {/* Details grid */}
                  <div style={{
                    display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px',
                    background: '#f8faf8', borderRadius: '8px', padding: '10px',
                    fontSize: '12px', color: '#475569', marginBottom: '10px',
                  }}>
                    <span>🌱 Harvested: <strong>{new Date(crop.harvestDate).toLocaleDateString()}</strong></span>
                    <span>⏳ Expires: <strong>{new Date(crop.expiryDate).toLocaleDateString()}</strong></span>
                    <span>📦 Stock: <strong>{crop.totalStock} Kg</strong></span>
                    <span>⚖️ Min: <strong>{crop.minOrder} Kg</strong></span>
                  </div>

                  {/* Description */}
                  <p style={{ margin: '0 0 10px', fontSize: '13px', color: '#64748b', lineHeight: '1.5' }}>
                    {crop.description}
                  </p>

                  {/* Footer */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '10px', fontSize: '12px' }}>
                    <span style={{ color: '#0f172a', fontWeight: '600' }}>👨‍🌾 {crop.farmerName}</span>
                    <a href={`tel:${crop.farmerContact}`} style={{ color: '#16a34a', fontWeight: '600', textDecoration: 'none' }}>📞 {crop.farmerContact}</a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

// ==========================================
// End of Requirement 1 - Khalid
// ==========================================

export default FarmerDashboard;
