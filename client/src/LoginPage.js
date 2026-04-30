import React, { useState } from 'react';

const LoginPage = ({ onLoginSuccess }) => {
  // New state to toggle between Login and Register modes
  const [isRegistering, setIsRegistering] = useState(false);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Extra fields needed for Registration
  const [name, setName] = useState('');
  const [role, setRole] = useState('buyer');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Decide which API endpoint to hit based on the mode
    const endpoint = isRegistering ? 'http://localhost:5000/api/auth/register' : 'http://localhost:5000/api/auth/login';
    
    // Build the data payload
    const payload = isRegistering 
      ? { name, email, password, role } 
      : { email, password };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        onLoginSuccess(data.user); // Tells App.js to change the screen!
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Network Error:", error);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px', fontFamily: 'Arial' }}>
      <div style={{ width: '350px', border: '1px solid #ddd', padding: '20px', borderRadius: '8px', backgroundColor: '#fff', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        
        <h2 style={{ textAlign: 'center', color: '#333' }}>
          {isRegistering ? "Create an Account" : "Krishi-Connect Login"}
        </h2>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          
          {/* ONLY SHOW NAME IF REGISTERING */}
          {isRegistering && (
            <div>
              <label>Full Name:</label>
              <input 
                type="text" value={name} onChange={(e) => setName(e.target.value)} required 
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
            </div>
          )}

          <div>
            <label>Email Address:</label>
            <input 
              type="email" value={email} onChange={(e) => setEmail(e.target.value)} required 
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </div>
          
          <div>
            <label>Password:</label>
            <input 
              type="password" value={password} onChange={(e) => setPassword(e.target.value)} required 
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </div>

          {/* ONLY SHOW ROLE DROPDOWN IF REGISTERING */}
          {isRegistering && (
            <div>
              <label>I am a:</label>
              <select 
                value={role} onChange={(e) => setRole(e.target.value)} 
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              >
                <option value="buyer">Buyer (Customer)</option>
                <option value="farmer">Farmer (Vendor)</option>
                <option value="admin">System Admin</option>
              </select>
            </div>
          )}

          <button type="submit" style={{ padding: '10px', backgroundColor: isRegistering ? '#28a745' : '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
            {isRegistering ? "Sign Up" : "Sign In"}
          </button>
        </form>

        {/* Toggle Button to switch modes */}
        <p style={{ textAlign: 'center', marginTop: '15px', fontSize: '14px' }}>
          {isRegistering ? "Already have an account? " : "Don't have an account? "}
          <span 
            onClick={() => setIsRegistering(!isRegistering)} 
            style={{ color: '#007bff', cursor: 'pointer', textDecoration: 'underline' }}
          >
            {isRegistering ? "Log In" : "Sign Up"}
          </span>
        </p>

      </div>
    </div>
  );
};

export default LoginPage;