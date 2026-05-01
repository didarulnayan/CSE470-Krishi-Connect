import React, { useCallback, useEffect, useMemo, useState } from 'react';

const STATUS_STYLES = {
  pending: { background: '#fff3cd', color: '#7a5b00', border: '#ffeeba' },
  accepted: { background: '#d4edda', color: '#155724', border: '#c3e6cb' },
  rejected: { background: '#f8d7da', color: '#721c24', border: '#f5c6cb' }
};

function formatDate(isoOrDate) {
  try {
    const date = new Date(isoOrDate);
    if (Number.isNaN(date.getTime())) return '';
    return date.toLocaleString();
  } catch {
    return '';
  }
}

function FarmerOrdersDashboard({ farmerName }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [busyById, setBusyById] = useState(() => ({}));

  const fetchOrders = useCallback(async () => {
    if (!farmerName) return;

    try {
      setLoading(true);
      setError('');

      const response = await fetch(
        `http://localhost:5000/api/orders/incoming?farmerName=${encodeURIComponent(farmerName)}`
      );
      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to load incoming orders.');
        setOrders([]);
        return;
      }

      setOrders(Array.isArray(data) ? data : []);
    } catch {
      setError('Could not connect to the server.');
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }, [farmerName]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const rows = useMemo(() => {
    return orders.map((order) => {
      const items = Array.isArray(order.orderItems) ? order.orderItems : [];
      const produceSummary = items
        .map((item) => {
          const produceName = item?.produce?.name || 'Unknown produce';
          const qty = item?.quantity ?? '';
          return `${produceName}${qty !== '' ? ` (${qty} Kg)` : ''}`;
        })
        .join(', ');

      return {
        _id: order._id,
        orderId: order.orderId,
        orderDate: order.orderDate,
        totalAmount: order.totalAmount,
        status: order.status,
        produceSummary
      };
    });
  }, [orders]);

  const updateStatus = useCallback(async (orderMongoId, nextStatus) => {
    const previous = orders;

    setBusyById((prev) => ({ ...prev, [orderMongoId]: true }));
    setOrders((prev) =>
      prev.map((o) => (o._id === orderMongoId ? { ...o, status: nextStatus } : o))
    );

    try {
      const response = await fetch(`http://localhost:5000/api/orders/${orderMongoId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus })
      });
      const data = await response.json();

      if (!response.ok) {
        setOrders(previous);
        alert(data.error || 'Failed to update order.');
        return;
      }

      const updated = data?.data;
      if (updated && updated._id) {
        setOrders((prev) => prev.map((o) => (o._id === updated._id ? updated : o)));
      }
    } catch {
      setOrders(previous);
      alert('Could not connect to the server.');
    } finally {
      setBusyById((prev) => ({ ...prev, [orderMongoId]: false }));
    }
  }, [orders]);

  return (
    <section style={{ padding: '0 20px 40px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <h2 style={{ margin: 0 }}>Incoming Orders</h2>
          <button
            type="button"
            onClick={fetchOrders}
            style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #ddd', background: '#fff', cursor: 'pointer' }}
            disabled={loading}
          >
            {loading ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>

        {loading ? (
          <p>Loading incoming orders...</p>
        ) : error ? (
          <p style={{ color: '#c62828' }}>{error}</p>
        ) : rows.length === 0 ? (
          <div style={{ border: '1px solid #eee', background: '#fff', borderRadius: '10px', padding: '16px' }}>
            <p style={{ margin: 0 }}>No incoming orders yet.</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto', border: '1px solid #eee', borderRadius: '10px', background: '#fff' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '820px' }}>
              <thead>
                <tr style={{ background: '#f7f7f7' }}>
                  <th style={{ textAlign: 'left', padding: '12px', borderBottom: '1px solid #eee' }}>Order #</th>
                  <th style={{ textAlign: 'left', padding: '12px', borderBottom: '1px solid #eee' }}>Date</th>
                  <th style={{ textAlign: 'left', padding: '12px', borderBottom: '1px solid #eee' }}>Items</th>
                  <th style={{ textAlign: 'right', padding: '12px', borderBottom: '1px solid #eee' }}>Total</th>
                  <th style={{ textAlign: 'left', padding: '12px', borderBottom: '1px solid #eee' }}>Status</th>
                  <th style={{ textAlign: 'left', padding: '12px', borderBottom: '1px solid #eee' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => {
                  const badge = STATUS_STYLES[row.status] || STATUS_STYLES.pending;
                  const isPending = row.status === 'pending';
                  const busy = !!busyById[row._id];

                  return (
                    <tr key={row._id}>
                      <td style={{ padding: '12px', borderBottom: '1px solid #f0f0f0' }}>
                        {row.orderId ?? '—'}
                      </td>
                      <td style={{ padding: '12px', borderBottom: '1px solid #f0f0f0' }}>
                        {formatDate(row.orderDate) || '—'}
                      </td>
                      <td style={{ padding: '12px', borderBottom: '1px solid #f0f0f0' }}>
                        {row.produceSummary || '—'}
                      </td>
                      <td style={{ padding: '12px', borderBottom: '1px solid #f0f0f0', textAlign: 'right' }}>
                        BDT {Number(row.totalAmount || 0)}
                      </td>
                      <td style={{ padding: '12px', borderBottom: '1px solid #f0f0f0' }}>
                        <span
                          style={{
                            display: 'inline-block',
                            padding: '4px 10px',
                            borderRadius: '999px',
                            border: `1px solid ${badge.border}`,
                            background: badge.background,
                            color: badge.color,
                            fontWeight: 700,
                            textTransform: 'capitalize'
                          }}
                        >
                          {row.status}
                        </span>
                      </td>
                      <td style={{ padding: '12px', borderBottom: '1px solid #f0f0f0' }}>
                        {isPending ? (
                          <div style={{ display: 'flex', gap: '10px' }}>
                            <button
                              type="button"
                              onClick={() => updateStatus(row._id, 'accepted')}
                              disabled={busy}
                              style={{
                                padding: '8px 12px',
                                background: '#28a745',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: 'pointer'
                              }}
                            >
                              {busy ? 'Working...' : 'Accept'}
                            </button>
                            <button
                              type="button"
                              onClick={() => updateStatus(row._id, 'rejected')}
                              disabled={busy}
                              style={{
                                padding: '8px 12px',
                                background: '#dc3545',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: 'pointer'
                              }}
                            >
                              {busy ? 'Working...' : 'Reject'}
                            </button>
                          </div>
                        ) : (
                          <span style={{ color: '#777' }}>—</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

export default FarmerOrdersDashboard;

