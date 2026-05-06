import React, { useState } from 'react';
import LoginPage from './LoginPage';
import AddCropForm from './AddCropForm'; // Bring back your awesome form!
import FarmerDashboard from './FarmerDashboard'; // New Dashboard
import FarmerOrders from './FarmerOrders'; // Member 2 Orders Dashboard
import OrderPage from './OrderPage'; // Member 3 integration
import AdminDashboard from './AdminDashboard'; // Admin Dashboard integration
import BuyerHomepage from './BuyerHomepage'; // Requirement 2 - Buyer Browse
import DetailedView from './DetailedView';   // Requirement 2 - Crop Detail

// ==========================================
// Main Application Component (Router)
// ==========================================
// This component acts as the "Traffic Cop" for our frontend. 
// It decides which screen to show based on who is logged in.

function App() {
  // App.js now tracks who is logged in for the whole website
  const [user, setUser] = useState(null);

  // State to manage what the farmer sees
  const [farmerView, setFarmerView] = useState('dashboard');

  // State to manage what the buyer sees (Requirement 2)
  const [buyerView, setBuyerView] = useState('home'); // 'home' | 'detail' | 'order'
  const [selectedCrop, setSelectedCrop] = useState(null);

  return (
    <div>
      {/* Dynamic Header based on who is logged in */}
      <div style={{ backgroundColor: '#f4f4f4', padding: '10px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #ddd' }}>
        <h1 style={{ margin: 0, fontFamily: 'Arial', color: '#28a745' }}>Krishi-Connect</h1>

        {/* If user is logged in, show their name and a Logout button */}
        {user && (
          <div>
            <span style={{ marginRight: '15px', fontFamily: 'Arial' }}>
              Logged in as: <b>{user.name}</b> ({user.role})
            </span>
            <button
              onClick={() => {
                setUser(null);
                setFarmerView('dashboard'); // Reset view on logout
                setBuyerView('home');       // Reset buyer view on logout
                setSelectedCrop(null);
              }}
              style={{ padding: '6px 12px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Log Out
            </button>
          </div>
        )}
      </div>

      {/* ROUTING LOGIC (The Traffic Cop) */}
      {!user ? (
        // Route 1: Not logged in? Show Login Page
        <LoginPage onLoginSuccess={setUser} />
      ) : user.role === 'farmer' ? (
        // Route 2: Logged in as Farmer? Show Dashboard, Orders, or Add Crop Form
        farmerView === 'dashboard' ? (
          <FarmerDashboard user={user} onNavigate={setFarmerView} />
        ) : farmerView === 'orders' ? (
          <FarmerOrders user={user} onGoBack={() => setFarmerView('dashboard')} />
        ) : (
          <AddCropForm user={user} onGoBack={() => setFarmerView('dashboard')} />
        )
      ) : user.role === 'admin' ? (
        // Route 3: Logged in as Admin? Show AdminDashboard
        <AdminDashboard user={user} />
      ) : (
        // Route 4: Logged in as Buyer? Show Requirement 2 Buyer flow
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
          // Buyer clicked Order Now → Member 3's OrderPage
          <div style={{ padding: '32px 20px 48px' }}>
            <button
              onClick={() => setBuyerView('home')}
              style={{ marginBottom: '16px', padding: '8px 16px', backgroundColor: '#f0f5ec', border: '1px solid #c8dcc0', borderRadius: '8px', color: '#2f7d32', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}
            >
              ← Back to Crops
            </button>
            <OrderPage />
          </div>
        )
      )}

    </div>
  );
}

export default App;