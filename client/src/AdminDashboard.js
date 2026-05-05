import React, { useState, useEffect } from 'react';

const AdminDashboard = ({ user }) => {
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState([]);
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deletingCropId, setDeletingCropId] = useState(null);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'users') {
        const res = await fetch('http://localhost:5000/api/admin/users');
        const data = await res.json();
        setUsers(data);
      } else {
        const res = await fetch('http://localhost:5000/api/admin/crops');
        const data = await res.json();
        setCrops(data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCrop = async (cropId, cropName) => {
    const confirmed = window.confirm(`Delete "${cropName}" from active crop listings?`);
    if (!confirmed) return;

    setDeletingCropId(cropId);

    try {
      const res = await fetch(`http://localhost:5000/api/admin/crops/${cropId}`, {
        method: 'DELETE'
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to delete crop listing');
      }

      setCrops(prevCrops => prevCrops.filter(crop => crop._id !== cropId));
    } catch (error) {
      console.error('Error deleting crop:', error);
      alert(error.message);
    } finally {
      setDeletingCropId(null);
    }
  };

  // Modern UI Styles
  const styles = {
    container: {
      padding: '40px 20px',
      maxWidth: '1200px',
      margin: '0 auto',
      fontFamily: '"Inter", "Segoe UI", Roboto, sans-serif',
      minHeight: '100vh',
      backgroundColor: '#f8f9fa'
    },
    headerCard: {
      background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
      borderRadius: '16px',
      padding: '30px',
      color: 'white',
      boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
      marginBottom: '30px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    title: {
      margin: 0,
      fontSize: '2.5rem',
      fontWeight: '800',
      letterSpacing: '-1px'
    },
    subtitle: {
      margin: '10px 0 0 0',
      fontSize: '1.1rem',
      opacity: 0.9
    },
    tabsContainer: {
      display: 'flex',
      gap: '15px',
      marginBottom: '30px',
      padding: '5px',
      background: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
      display: 'inline-flex'
    },
    tab: (isActive) => ({
      padding: '12px 24px',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '1.1rem',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      backgroundColor: isActive ? '#2a5298' : 'transparent',
      color: isActive ? 'white' : '#6c757d'
    }),
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '20px'
    },
    card: {
      background: 'white',
      borderRadius: '12px',
      padding: '20px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
      border: '1px solid #e9ecef',
      transition: 'transform 0.3s ease, boxShadow 0.3s ease',
      cursor: 'default'
    },
    cardHeader: {
      borderBottom: '1px solid #e9ecef',
      paddingBottom: '12px',
      marginBottom: '15px'
    },
    badge: (role) => {
      let bg = '#e9ecef';
      let color = '#495057';
      if (role === 'farmer') { bg = '#d1e7dd'; color = '#0f5132'; }
      if (role === 'buyer') { bg = '#cff4fc'; color = '#055160'; }
      if (role === 'admin') { bg = '#f8d7da'; color = '#842029'; }
      
      return {
        display: 'inline-block',
        padding: '5px 10px',
        borderRadius: '20px',
        fontSize: '0.8rem',
        fontWeight: 'bold',
        backgroundColor: bg,
        color: color,
        textTransform: 'uppercase',
        letterSpacing: '1px'
      };
    },
    detailRow: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '8px',
      fontSize: '0.95rem'
    },
    detailLabel: {
      color: '#6c757d',
      fontWeight: '600'
    },
    detailValue: {
      color: '#212529',
      fontWeight: '500'
    },
    image: {
      width: '100%',
      height: '200px',
      objectFit: 'cover',
      borderRadius: '8px',
      marginBottom: '15px'
    },
    actionRow: {
      marginTop: '18px',
      paddingTop: '15px',
      borderTop: '1px solid #e9ecef',
      display: 'flex',
      justifyContent: 'flex-end'
    },
    deleteButton: (disabled) => ({
      backgroundColor: disabled ? '#f5c2c7' : '#dc3545',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      padding: '10px 14px',
      fontSize: '0.95rem',
      fontWeight: '700',
      cursor: disabled ? 'not-allowed' : 'pointer'
    })
  };

  return (
    <div style={styles.container}>
      <div style={styles.headerCard}>
        <div>
          <h1 style={styles.title}>Admin Control Center</h1>
          <p style={styles.subtitle}>Welcome back, {user?.name || 'Administrator'}</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>
            {activeTab === 'users' ? users.length : crops.length}
          </div>
          <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>
            Total {activeTab === 'users' ? 'Registered Users' : 'Active Listings'}
          </div>
        </div>
      </div>

      <div style={styles.tabsContainer}>
        <button 
          style={styles.tab(activeTab === 'users')} 
          onClick={() => setActiveTab('users')}
        >
          Registered Users
        </button>
        <button 
          style={styles.tab(activeTab === 'crops')} 
          onClick={() => setActiveTab('crops')}
        >
          Active Crop Listings
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '50px', fontSize: '1.2rem', color: '#6c757d' }}>
          Loading data...
        </div>
      ) : (
        <div style={styles.grid}>
          {activeTab === 'users' && users.map(u => (
            <div key={u._id} style={styles.card}>
              <div style={styles.cardHeader}>
                <h3 style={{ margin: '0 0 10px 0', color: '#212529' }}>{u.name}</h3>
                <span style={styles.badge(u.role)}>{u.role}</span>
              </div>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>Email</span>
                <span style={styles.detailValue}>{u.email}</span>
              </div>
              {u.contact && (
                <div style={styles.detailRow}>
                  <span style={styles.detailLabel}>Contact</span>
                  <span style={styles.detailValue}>{u.contact}</span>
                </div>
              )}
            </div>
          ))}

          {activeTab === 'crops' && crops.map(c => (
            <div key={c._id} style={styles.card}>
              {c.imageUrl && <img src={c.imageUrl} alt={c.name} style={styles.image} />}
              <div style={styles.cardHeader}>
                <h3 style={{ margin: '0 0 5px 0', color: '#212529' }}>{c.name}</h3>
                <span style={{ color: '#28a745', fontWeight: 'bold', fontSize: '1.2rem' }}>৳{c.price}/kg</span>
              </div>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>Category</span>
                <span style={styles.detailValue}>{c.category}</span>
              </div>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>Stock</span>
                <span style={styles.detailValue}>{c.totalStock} kg</span>
              </div>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>Farmer</span>
                <span style={styles.detailValue}>{c.farmerName}</span>
              </div>
              <div style={styles.actionRow}>
                <button
                  style={styles.deleteButton(deletingCropId === c._id)}
                  onClick={() => handleDeleteCrop(c._id, c.name)}
                  disabled={deletingCropId === c._id}
                >
                  {deletingCropId === c._id ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          ))}

          {!loading && activeTab === 'users' && users.length === 0 && (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#6c757d' }}>
              No users found.
            </div>
          )}
          {!loading && activeTab === 'crops' && crops.length === 0 && (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#6c757d' }}>
              No crop listings found.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
