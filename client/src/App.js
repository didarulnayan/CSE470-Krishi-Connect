import React, { useState } from 'react';
import LoginPage from './LoginPage';
import AddCropForm from './AddCropForm'; // Bring back your awesome form!

function App() {
  // App.js now tracks who is logged in for the whole website
  const [user, setUser] = useState(null);

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
              onClick={() => setUser(null)} 
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
        // Route 2: Logged in as Farmer? Show Add Crop Form
        <AddCropForm />
      ) : (
        // Route 3: Logged in as Buyer/Admin? Show a temporary placeholder
        <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'Arial' }}>
          <h2>Welcome to the {user.role.toUpperCase()} Dashboard!</h2>
          <p>This marketplace view will be built in the next sprint.</p>
        </div>
      )}
      
    </div>
  );
}

export default App;