import React, { useState, useEffect } from 'react';

const FarmerOrders = ({ user, onGoBack }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showHistory, setShowHistory] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/orders/farmer/${user.name}`);
        const data = await response.json();
        if (response.ok) setOrders(data.data);
      } catch (error) {
        console.error('Network Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user.name]);

  const handleUpdateStatus = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    try {
      const response = await fetch(`http://localhost:5000/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (response.ok) {
        setOrders(prev => prev.map(o => o._id === orderId ? { ...o, status: newStatus } : o));
      }
    } catch (error) {
      console.error('Network Error:', error);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleRemoveOrder = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/orders/${orderId}/hide`, { method: 'PUT' });
      if (response.ok) {
        setOrders(prev => prev.map(o => o._id === orderId ? { ...o, hiddenByFarmer: true } : o));
      }
    } catch (error) {
      console.error('Network Error:', error);
    }
  };

  const displayedOrders = showHistory ? orders : orders.filter(o => !o.hiddenByFarmer);

  const statusConfig = {
    pending:  { bg: '#fef9c3', color: '#713f12', border: '#fde68a', label: 'PENDING' },
    accepted: { bg: '#dcfce7', color: '#15803d', border: '#86efac', label: 'ACCEPTED' },
    rejected: { bg: '#fee2e2', color: '#dc2626', border: '#fca5a5', label: 'REJECTED' },
  };

  return (
    <div style={{ padding: '28px 24px', maxWidth: '900px', margin: '0 auto' }}>

      {/* ── Header ── */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginBottom: '24px', flexWrap: 'wrap', gap: '12px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button className="kc-btn-secondary" onClick={onGoBack}>← Dashboard</button>
          <div>
            <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '800', color: '#0f172a' }}>
              {showHistory ? '📜 Order History' : '📬 Incoming Orders'}
            </h2>
            <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>
              {loading ? 'Loading...' : `${displayedOrders.length} order${displayedOrders.length !== 1 ? 's' : ''}`}
            </p>
          </div>
        </div>
        <button
          className={showHistory ? 'kc-btn-secondary' : 'kc-btn-primary'}
          onClick={() => setShowHistory(!showHistory)}
        >
          {showHistory ? '📬 Active Orders' : '📜 View History'}
        </button>
      </div>

      {/* ── Content ── */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px', color: '#94a3b8' }}>⏳ Loading orders...</div>
      ) : displayedOrders.length === 0 ? (
        <div style={{
          textAlign: 'center', padding: '60px 20px',
          background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0',
        }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>📭</div>
          <h3 style={{ color: '#0f172a', margin: '0 0 6px' }}>No orders yet</h3>
          <p style={{ color: '#64748b', margin: 0 }}>New orders from buyers will appear here.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {displayedOrders.map((order) => {
            const firstItem = order.orderItems[0];
            const produceName = firstItem ? firstItem.produceName : 'Unknown';
            const totalQty = order.orderItems.reduce((sum, item) => sum + item.quantity, 0);
            const st = statusConfig[order.status] || statusConfig.pending;
            const isUpdating = updatingId === order._id;

            return (
              <div key={order._id} style={{
                background: '#fff',
                border: '1px solid #e2e8f0',
                borderRadius: '14px',
                padding: '20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '16px',
                flexWrap: 'wrap',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              }}>
                {/* Order info */}
                <div style={{ flex: 1, minWidth: '220px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a' }}>
                      Order #{order.orderId}
                    </span>
                    <span style={{
                      fontSize: '11px', fontWeight: '700', padding: '3px 10px',
                      borderRadius: '999px', border: `1px solid ${st.border}`,
                      backgroundColor: st.bg, color: st.color,
                    }}>
                      {st.label}
                    </span>
                    {order.hiddenByFarmer && showHistory && (
                      <span style={{ fontSize: '11px', color: '#94a3b8', fontStyle: 'italic' }}>archived</span>
                    )}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px 16px', fontSize: '13px', color: '#475569' }}>
                    <span>🌾 <strong>{produceName}</strong></span>
                    <span>⚖️ {totalQty} Kg</span>
                    <span>💰 ৳ {order.totalAmount}</span>
                    <span>📅 {new Date(order.orderDate).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Action buttons */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '130px' }}>
                  {order.status === 'pending' && (
                    <>
                      <button
                        className="kc-btn-primary"
                        onClick={() => handleUpdateStatus(order._id, 'accepted')}
                        disabled={isUpdating}
                        style={{ padding: '9px 14px', fontSize: '13px' }}
                      >
                        {isUpdating ? '⏳' : '✅ Accept'}
                      </button>
                      <button
                        className="kc-btn-danger"
                        onClick={() => handleUpdateStatus(order._id, 'rejected')}
                        disabled={isUpdating}
                        style={{ padding: '9px 14px', fontSize: '13px' }}
                      >
                        {isUpdating ? '⏳' : '❌ Reject'}
                      </button>
                    </>
                  )}
                  {order.status !== 'pending' && !showHistory && (
                    <button
                      className="kc-btn-secondary"
                      onClick={() => handleRemoveOrder(order._id)}
                      style={{ padding: '9px 14px', fontSize: '13px' }}
                    >
                      🗑️ Archive
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FarmerOrders;
