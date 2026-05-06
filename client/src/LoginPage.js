import React, { useState } from 'react';

// ==========================================
// Requirement 1 - Khalid (UX Improved)
// ==========================================

const LoginPage = ({ onLoginSuccess }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('buyer');
  const [contact, setContact] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const switchMode = () => {
    setIsRegistering(!isRegistering);
    setErrorMsg('');
    setSuccessMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    const endpoint = isRegistering
      ? 'http://localhost:5000/api/auth/register'
      : 'http://localhost:5000/api/auth/login';

    const payload = isRegistering
      ? { name, email, password, role, contact }
      : { email, password };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMsg(data.message || 'Success!');
        setTimeout(() => onLoginSuccess(data.user), 600);
      } else {
        setErrorMsg(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setErrorMsg('Cannot connect to the server. Please make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: 'calc(100vh - 60px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #f0fdf4 100%)',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '420px',
        background: '#ffffff',
        borderRadius: '20px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
        overflow: 'hidden',
      }}>

        {/* ── Green top banner ── */}
        <div style={{
          background: 'linear-gradient(135deg, #16a34a, #15803d)',
          padding: '32px 32px 28px',
          textAlign: 'center',
          color: '#fff',
        }}>
          <div style={{ fontSize: '40px', marginBottom: '10px' }}>🌾</div>
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '800', letterSpacing: '-0.5px' }}>
            Krishi-Connect
          </h1>
          <p style={{ margin: '6px 0 0', fontSize: '14px', opacity: 0.85 }}>
            {isRegistering ? 'Create your account to get started' : 'Sign in to your account'}
          </p>
        </div>

        {/* ── Tab toggle ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          borderBottom: '1px solid #e2e8f0',
        }}>
          {['Sign In', 'Sign Up'].map((label, i) => {
            const active = i === 0 ? !isRegistering : isRegistering;
            return (
              <button
                key={label}
                onClick={() => { setIsRegistering(i === 1); setErrorMsg(''); setSuccessMsg(''); }}
                style={{
                  padding: '14px',
                  border: 'none',
                  borderBottom: active ? '2.5px solid #16a34a' : '2.5px solid transparent',
                  background: 'transparent',
                  color: active ? '#16a34a' : '#94a3b8',
                  fontWeight: active ? '700' : '500',
                  fontSize: '14px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* ── Form body ── */}
        <div style={{ padding: '28px 32px 32px' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

            {/* Name – register only */}
            {isRegistering && (
              <div>
                <label className="kc-label">Full Name</label>
                <input
                  className="kc-input"
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Rahim Miah"
                  required
                />
              </div>
            )}

            {/* Email */}
            <div>
              <label className="kc-label">Email Address</label>
              <input
                className="kc-input"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="kc-label">Password</label>
              <input
                className="kc-input"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            {/* Role – register only */}
            {isRegistering && (
              <div>
                <label className="kc-label">I am a</label>
                <select
                  className="kc-input"
                  value={role}
                  onChange={e => setRole(e.target.value)}
                  style={{ cursor: 'pointer' }}
                >
                  <option value="buyer">🛒 Buyer (Customer)</option>
                  <option value="farmer">👨‍🌾 Farmer (Vendor)</option>
                  <option value="admin">🔐 System Admin</option>
                </select>
              </div>
            )}

            {/* Contact – register as farmer only */}
            {isRegistering && role === 'farmer' && (
              <div>
                <label className="kc-label">Contact Number</label>
                <input
                  className="kc-input"
                  type="text"
                  value={contact}
                  onChange={e => setContact(e.target.value)}
                  placeholder="e.g. +8801700000000"
                  required
                />
              </div>
            )}

            {/* Feedback messages */}
            {errorMsg && (
              <div className="kc-toast-error" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>⚠️</span> {errorMsg}
              </div>
            )}
            {successMsg && (
              <div className="kc-toast-success" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>✅</span> {successMsg}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="kc-btn-primary"
              disabled={loading}
              style={{ width: '100%', padding: '13px', fontSize: '15px', marginTop: '4px', opacity: loading ? 0.7 : 1 }}
            >
              {loading ? '⏳ Please wait...' : isRegistering ? '✅ Create Account' : '🔑 Sign In'}
            </button>
          </form>

          {/* Bottom switch */}
          <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: '#64748b' }}>
            {isRegistering ? 'Already have an account? ' : "Don't have an account? "}
            <span
              onClick={switchMode}
              style={{ color: '#16a34a', fontWeight: '700', cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: '2px' }}
            >
              {isRegistering ? 'Sign In' : 'Sign Up'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// End of Requirement 1 - Khalid
// ==========================================

export default LoginPage;