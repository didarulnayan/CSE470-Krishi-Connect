import React, { useState } from 'react';
import LoginPage from './LoginPage';
import AddCropForm from './AddCropForm';
import OrderPage from './OrderPage';

function App() {
  const [user, setUser] = useState(null);

  return (
    <div>
      <div style={{ backgroundColor: '#f4f4f4', padding: '10px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #ddd' }}>
        <h1 style={{ margin: 0, fontFamily: 'Arial', color: '#28a745' }}>Krishi-Connect</h1>

        {user && (
          <div>
            <span style={{ marginRight: '15px', fontFamily: 'Arial' }}>
              Logged in as: <b>{user.name}</b> ({user.role})
            </span>
            <button
              onClick={() => setUser(null)}
              style={{ padding: '6px 12px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Log Out
            </button>
          </div>
        )}
      </div>

      {!user ? (
        <LoginPage onLoginSuccess={setUser} />
      ) : user.role === 'farmer' ? (
        <AddCropForm />
      ) : (
        <div style={{ padding: '32px 20px 48px' }}>
          <OrderPage />
        </div>
      )}
    </div>
  );
}

export default App;
