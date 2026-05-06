import React, { useEffect, useState } from 'react';
import CropCard from './CropCard';

// ==========================================
// Requirement 2 - Nayan (UX Improved)
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

  return (
    <div style={{ padding: '28px 24px', maxWidth: '1100px', margin: '0 auto' }}>

      {/* ── Page Header ── */}
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ margin: '0 0 4px', fontSize: '22px', fontWeight: '800', color: '#0f172a' }}>
          🌾 Available Crops
        </h2>
        <p style={{ margin: 0, fontSize: '14px', color: '#64748b' }}>
          Welcome, <strong>{user.name}</strong>! Browse fresh crops directly from local farmers.
        </p>
      </div>

      {/* ── Search + Filter ── */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <input
          className="kc-input"
          style={{ maxWidth: '320px' }}
          type="text"
          placeholder="🔍 Search by crop or farmer name..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              style={{
                padding: '8px 16px',
                borderRadius: '999px',
                border: '1.5px solid',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
                transition: 'all 0.15s ease',
                borderColor: filterCategory === cat ? '#16a34a' : '#e2e8f0',
                backgroundColor: filterCategory === cat ? '#16a34a' : '#fff',
                color: filterCategory === cat ? '#fff' : '#475569',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── Content ── */}
      {loading && (
        <div style={{ textAlign: 'center', padding: '60px', color: '#94a3b8' }}>⏳ Loading crops...</div>
      )}
      {error && (
        <div className="kc-toast-error" style={{ maxWidth: '480px' }}>⚠️ {error}</div>
      )}
      {!loading && !error && filtered.length === 0 && (
        <div style={{
          textAlign: 'center', padding: '60px 20px',
          background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0',
        }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>🔍</div>
          <h3 style={{ color: '#0f172a', marginBottom: '6px' }}>No crops found</h3>
          <p style={{ color: '#64748b', margin: 0 }}>
            {crops.length === 0 ? 'No crops are currently available.' : 'Try adjusting your search or filter.'}
          </p>
        </div>
      )}
      {!loading && !error && filtered.length > 0 && (
        <>
          <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '14px' }}>
            Showing {filtered.length} of {crops.length} crops
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))',
            gap: '20px',
          }}>
            {filtered.map(crop => (
              <CropCard key={crop._id} crop={crop} onClick={onSelectCrop} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// ==========================================
// End of Requirement 2 - Nayan
// ==========================================

export default BuyerHomepage;
