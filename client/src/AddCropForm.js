import React, { useState, useEffect } from 'react';

// ==========================================
// Requirement 1 - Khalid (UX Improved)
// ==========================================

const AddCropForm = ({ user, onGoBack }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Vegetable');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [farmerName, setFarmerName] = useState(user?.name || '');
  const [farmerContact, setFarmerContact] = useState(user?.contact || '');
  const [harvestDate, setHarvestDate] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [totalStock, setTotalStock] = useState('');
  const [minOrder, setMinOrder] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    if (user?.name) setFarmerName(user.name);
    if (user?.contact) setFarmerContact(user.contact);
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    const cropData = { name, category, price, description, imageUrl, farmerName, farmerContact, harvestDate, expiryDate, totalStock, minOrder };

    try {
      const response = await fetch('http://localhost:5000/api/crops/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cropData),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccessMsg('🎉 Crop listed successfully!');
        setName(''); setCategory('Vegetable'); setPrice(''); setDescription('');
        setImageUrl(''); setHarvestDate(''); setExpiryDate(''); setTotalStock(''); setMinOrder('');
        setTimeout(() => { if (onGoBack) onGoBack(); }, 1200);
      } else {
        setErrorMsg(data.error || 'Failed to add crop. Please check your inputs.');
      }
    } catch (error) {
      setErrorMsg('Cannot connect to the server.');
    } finally {
      setLoading(false);
    }
  };

  const inputRow = (label, children) => (
    <div>
      <label className="kc-label">{label}</label>
      {children}
    </div>
  );

  const categoryColor = {
    Vegetable: '#16a34a', Fruit: '#d97706', Grain: '#ca8a04', Spice: '#db2777',
  };

  return (
    <div style={{ padding: '28px 24px', maxWidth: '1000px', margin: '0 auto' }}>
      {/* Back button */}
      <button className="kc-btn-secondary" onClick={onGoBack} style={{ marginBottom: '20px' }}>
        ← Back to Dashboard
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '28px', alignItems: 'start' }}>

        {/* ── FORM PANEL ── */}
        <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '28px', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
          <h2 style={{ margin: '0 0 22px', fontSize: '20px', fontWeight: '800', color: '#0f172a' }}>
            📦 Add a New Crop Listing
          </h2>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

            {inputRow('Crop Name',
              <input className="kc-input" type="text" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Tomato" required />
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              {inputRow('Category',
                <select className="kc-input" value={category} onChange={e => setCategory(e.target.value)} style={{ cursor: 'pointer' }}>
                  <option value="Vegetable">🥦 Vegetable</option>
                  <option value="Fruit">🍎 Fruit</option>
                  <option value="Grain">🌾 Grain</option>
                  <option value="Spice">🌶️ Spice</option>
                </select>
              )}
              {inputRow('Price (৳/Kg)',
                <input className="kc-input" type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="e.g. 45" required />
              )}
            </div>

            {inputRow('Image URL',
              <input className="kc-input" type="text" value={imageUrl} onChange={e => setImageUrl(e.target.value)} placeholder="https://..." required />
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              {inputRow('Harvest Date',
                <input className="kc-input" type="date" value={harvestDate} onChange={e => setHarvestDate(e.target.value)} required />
              )}
              {inputRow('Expiry Date',
                <input className="kc-input" type="date" value={expiryDate} onChange={e => setExpiryDate(e.target.value)} required />
              )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              {inputRow('Total Stock (Kg)',
                <input className="kc-input" type="number" value={totalStock} onChange={e => setTotalStock(e.target.value)} placeholder="e.g. 500" required />
              )}
              {inputRow('Min Order (Kg)',
                <input className="kc-input" type="number" value={minOrder} onChange={e => setMinOrder(e.target.value)} placeholder="e.g. 10" required />
              )}
            </div>

            <div>
              <label className="kc-label">Description <span style={{ color: '#94a3b8', fontWeight: 400 }}>(max 100 chars)</span></label>
              <textarea
                className="kc-input"
                value={description}
                onChange={e => setDescription(e.target.value)}
                maxLength="100"
                required
                placeholder="Brief description of your crop..."
                style={{ height: '80px', resize: 'none' }}
              />
              <div style={{ textAlign: 'right', fontSize: '12px', color: description.length >= 90 ? '#ef4444' : '#94a3b8', marginTop: '3px' }}>
                {description.length}/100
              </div>
            </div>

            {inputRow('Farmer Name',
              <input className="kc-input" type="text" value={farmerName} onChange={e => setFarmerName(e.target.value)} required />
            )}

            {/* Feedback */}
            {errorMsg && <div className="kc-toast-error">⚠️ {errorMsg}</div>}
            {successMsg && <div className="kc-toast-success">{successMsg}</div>}

            <button
              type="submit"
              className="kc-btn-primary"
              disabled={loading}
              style={{ padding: '13px', fontSize: '15px', width: '100%', marginTop: '4px', opacity: loading ? 0.7 : 1 }}
            >
              {loading ? '⏳ Publishing...' : '🚀 Publish Listing'}
            </button>
          </form>
        </div>

        {/* ── LIVE PREVIEW PANEL ── */}
        <div>
          <div style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.8px', color: '#64748b', marginBottom: '10px' }}>
            👀 Live Preview
          </div>
          <div style={{
            background: '#fff',
            borderRadius: '14px',
            border: '1px solid #e2e8f0',
            overflow: 'hidden',
            boxShadow: '0 4px 16px rgba(0,0,0,0.07)',
          }}>
            {imageUrl ? (
              <img src={imageUrl} alt="Preview" style={{ width: '100%', height: '170px', objectFit: 'cover' }} />
            ) : (
              <div style={{ width: '100%', height: '170px', background: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px' }}>🌿</div>
            )}

            <div style={{ padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>{name || 'Crop Name'}</h3>
                <span style={{
                  fontSize: '10px', fontWeight: '700', textTransform: 'uppercase',
                  padding: '3px 8px', borderRadius: '999px',
                  backgroundColor: '#dcfce7', color: categoryColor[category] || '#16a34a',
                }}>{category}</span>
              </div>

              <div style={{ fontSize: '18px', fontWeight: '800', color: '#16a34a', marginBottom: '12px' }}>
                ৳ {price || '0'} <span style={{ fontSize: '12px', fontWeight: '500', color: '#64748b' }}>/ Kg</span>
              </div>

              <div style={{ background: '#f8faf8', borderRadius: '8px', padding: '10px', fontSize: '12px', color: '#475569', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px', marginBottom: '10px' }}>
                <span>🌱 {harvestDate || 'Harvest TBD'}</span>
                <span>⏳ {expiryDate || 'Expiry TBD'}</span>
                <span>📦 {totalStock || '0'} Kg</span>
                <span>⚖️ Min {minOrder || '0'} Kg</span>
              </div>

              <p style={{ margin: '0 0 10px', fontSize: '13px', color: '#64748b', lineHeight: '1.5' }}>
                {description || 'No description provided.'}
              </p>

              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #f1f5f9', paddingTop: '10px', fontSize: '12px' }}>
                <span style={{ fontWeight: '600' }}>👨‍🌾 {farmerName || 'Farmer'}</span>
                <span style={{ color: '#16a34a', fontWeight: '600' }}>📞 {farmerContact || 'Contact'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// End of Requirement 1 - Khalid
// ==========================================

export default AddCropForm;