import React, { useEffect, useState } from 'react';
import CropCard from './CropCard';

// ==========================================
// Requirement 2 - Nayan (Glassmorphism UI)
// ==========================================

const BuyerHomepage = ({ user, onSelectCrop }) => {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  useEffect(() => {
    const fetchCrops = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await fetch('http://localhost:5000/api/crops');
        const result = await response.json();
        if (!response.ok) { setError(result.error || 'Failed to load crops.'); return; }
        setCrops(result.data || []);
      } catch {
        setError('Could not connect to the server.');
      } finally {
        setLoading(false);
      }
    };
    fetchCrops();
  }, []);

  const categories = ['All', 'Vegetable', 'Fruit', 'Grain', 'Spice'];
  const filtered = crops.filter(c => {
    const matchCat = filterCategory === 'All' || c.category === filterCategory;
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
      (c.farmerName && c.farmerName.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  // ── STYLES ──────────────────────────────────────────────────────────────
  const pageStyle = {
    minHeight: 'calc(100vh - 60px)',
    position: 'relative',
    overflow: 'hidden',
  };

  // Layer 1 — farm/field background with colour gradient overlay
  const bgStyle = {
    position: 'fixed',
    inset: 0,
    zIndex: 0,
    backgroundImage: `
      linear-gradient(
        155deg,
        rgba(5, 46, 22, 0.80) 0%,
        rgba(20, 83, 45, 0.65) 35%,
        rgba(22, 101, 52, 0.50) 65%,
        rgba(134, 239, 172, 0.15) 100%
      ),
      url('https://images.unsplash.com/photo-1500076656116-558758c991c1?w=1600&q=80&fit=crop')
    `,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };

  // Layer 2 — content
  const contentStyle = {
    position: 'relative',
    zIndex: 1,
    padding: '32px 28px 48px',
    maxWidth: '1120px',
    margin: '0 auto',
  };

  const glass = {
    background: 'rgba(255,255,255,0.10)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    border: '1px solid rgba(255,255,255,0.22)',
    borderRadius: '18px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
  };

  const glassSearchInput = {
    background: 'rgba(255,255,255,0.12)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    border: '1px solid rgba(255,255,255,0.28)',
    borderRadius: '10px',
    padding: '10px 16px',
    fontSize: '14px',
    color: '#fff',
    outline: 'none',
    fontFamily: 'Inter, sans-serif',
    width: '100%',
    maxWidth: '340px',
    transition: 'border-color 0.18s ease, box-shadow 0.18s ease',
  };

  return (
    <div style={pageStyle}>
      {/* ── LAYER 1: Farm Background ── */}
      <div style={bgStyle} />

      {/* ── LAYER 2: Glass Content ── */}
      <div style={contentStyle}>

        {/* ── Header glass panel ── */}
        <div style={{ ...glass, padding: '26px 28px', marginBottom: '24px' }}>
          <h2 style={{ margin: '0 0 4px', fontSize: '24px', fontWeight: '800', color: '#fff', letterSpacing: '-0.3px', textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
            🌾 Available Crops
          </h2>
          <p style={{ margin: 0, fontSize: '14px', color: 'rgba(255,255,255,0.70)' }}>
            Welcome, <strong style={{ color: '#86efac' }}>{user.name}</strong>! Browse fresh crops directly from local farmers.
          </p>
        </div>

        {/* ── Search + Filter glass panel ── */}
        <div style={{ ...glass, padding: '18px 22px', marginBottom: '24px', display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
          <input
            style={glassSearchInput}
            type="text"
            placeholder="🔍 Search crop or farmer..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            onFocus={e => { e.target.style.borderColor = '#86efac'; e.target.style.boxShadow = '0 0 0 3px rgba(134,239,172,0.15)'; }}
            onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.28)'; e.target.style.boxShadow = 'none'; }}
          />
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {categories.map(cat => {
              const active = filterCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  style={{
                    padding: '7px 16px',
                    borderRadius: '999px',
                    border: `1.5px solid ${active ? '#86efac' : 'rgba(255,255,255,0.28)'}`,
                    fontSize: '13px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    fontFamily: 'Inter, sans-serif',
                    background: active ? 'rgba(134,239,172,0.25)' : 'rgba(255,255,255,0.08)',
                    color: active ? '#86efac' : 'rgba(255,255,255,0.75)',
                    backdropFilter: 'blur(8px)',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Result count ── */}
        {!loading && !error && crops.length > 0 && (
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.55)', marginBottom: '16px' }}>
            Showing {filtered.length} of {crops.length} crops
          </p>
        )}

        {/* ── States ── */}
        {loading && (
          <div style={{ ...glass, padding: '60px', textAlign: 'center', color: 'rgba(255,255,255,0.7)' }}>
            ⏳ Loading crops...
          </div>
        )}
        {error && (
          <div style={{
            ...glass,
            padding: '16px 20px',
            color: '#fca5a5',
            fontSize: '14px',
            background: 'rgba(239,68,68,0.15)',
            border: '1px solid rgba(239,68,68,0.35)',
          }}>
            ⚠️ {error}
          </div>
        )}
        {!loading && !error && filtered.length === 0 && (
          <div style={{ ...glass, padding: '60px 20px', textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>🔍</div>
            <h3 style={{ color: '#fff', margin: '0 0 6px' }}>No crops found</h3>
            <p style={{ color: 'rgba(255,255,255,0.6)', margin: 0 }}>
              {crops.length === 0 ? 'No crops are currently available.' : 'Try adjusting your search or filter.'}
            </p>
          </div>
        )}

        {/* ── Crop Grid ── */}
        {!loading && !error && filtered.length > 0 && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: '20px',
          }}>
            {filtered.map(crop => (
              <CropCard key={crop._id} crop={crop} onClick={onSelectCrop} glassMode={true} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ==========================================
// End of Requirement 2 - Nayan
// ==========================================

export default BuyerHomepage;
