import React, { useState } from 'react';
import LoginPage from './LoginPage';
import AddCropForm from './AddCropForm';
import FarmerDashboard from './FarmerDashboard';
import FarmerOrders from './FarmerOrders';
import OrderPage from './OrderPage';
import AdminDashboard from './AdminDashboard';
import BuyerHomepage from './BuyerHomepage';
import DetailedView from './DetailedView';

function App() {
  const [user, setUser] = useState(null);
  const [farmerView, setFarmerView] = useState('dashboard');
  const [buyerView, setBuyerView] = useState('home');
  const [selectedCrop, setSelectedCrop] = useState(null);

  const handleLogout = () => {
    setUser(null);
    setFarmerView('dashboard');
    setBuyerView('home');
    setSelectedCrop(null);
  };

  const roleBadgeColor = {
    farmer: { bg: '#dcfce7', color: '#15803d' },
    buyer:  { bg: '#dbeafe', color: '#1d4ed8' },
    admin:  { bg: '#fce7f3', color: '#9d174d' },
  };

  const badge = user ? roleBadgeColor[user.role] || { bg: '#f1f5f9', color: '#475569' } : null;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8faf8' }}>

      {/* ── NAV HEADER ── */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid #e2e8f0',
        boxShadow: '0 1px 8px rgba(0,0,0,0.06)',
        padding: '0 24px',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '26px' }}>🌾</span>
          <span style={{ fontSize: '20px', fontWeight: '800', color: '#15803d', letterSpacing: '-0.5px' }}>
            Krishi-Connect
          </span>
        </div>

        {/* User info + logout */}
        {user && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#0f172a' }}>{user.name}</div>
              <div style={{
                display: 'inline-block',
                fontSize: '10px',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.6px',
                padding: '2px 8px',
                borderRadius: '999px',
                backgroundColor: badge.bg,
                color: badge.color,
              }}>
                {user.role}
              </div>
            </div>
            <button
              onClick={handleLogout}
              style={{
                padding: '7px 16px',
                backgroundColor: 'transparent',
                color: '#64748b',
                border: '1.5px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#ef4444'; e.currentTarget.style.color = '#ef4444'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.color = '#64748b'; }}
            >
              Log Out
            </button>
          </div>
        )}
      </header>

      {/* ── ROUTING ── */}
      <main>
        {!user ? (
          <LoginPage onLoginSuccess={setUser} />
        ) : user.role === 'farmer' ? (
          farmerView === 'dashboard' ? (
            <FarmerDashboard user={user} onNavigate={setFarmerView} />
          ) : farmerView === 'orders' ? (
            <FarmerOrders user={user} onGoBack={() => setFarmerView('dashboard')} />
          ) : (
            <AddCropForm user={user} onGoBack={() => setFarmerView('dashboard')} />
          )
        ) : user.role === 'admin' ? (
          <AdminDashboard user={user} />
        ) : (
          buyerView === 'home' ? (
            <BuyerHomepage
              user={user}
              onSelectCrop={(crop) => { setSelectedCrop(crop); setBuyerView('detail'); }}
            />
          ) : buyerView === 'detail' ? (
            <DetailedView
              crop={selectedCrop}
              onGoBack={() => setBuyerView('home')}
              onOrderNow={() => setBuyerView('order')}
            />
          ) : (
            <div style={{ padding: '28px 24px', maxWidth: '600px', margin: '0 auto' }}>
              <button
                className="kc-btn-secondary"
                onClick={() => setBuyerView('home')}
                style={{ marginBottom: '20px' }}
              >
                ← Back to Crops
              </button>
              <OrderPage />
            </div>
          )
        )}
      </main>
    </div>
  );
}

export default App;