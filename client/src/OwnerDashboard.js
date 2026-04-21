import React, { useState, useEffect } from 'react';
import './styles/OwnerDashboard.css';

function OwnerDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch orders on component mount
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/orders');
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      const data = await response.json();
      setOrders(data.data || []);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'Accepted' }),
      });

      if (!response.ok) {
        throw new Error('Failed to accept order');
      }

      const data = await response.json();
      // Update the order in the local state
      setOrders(orders.map(order => 
        order._id === orderId ? data.data : order
      ));
    } catch (err) {
      console.error('Error accepting order:', err);
      alert('Error accepting order: ' + err.message);
    }
  };

  const handleReject = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'Rejected' }),
      });

      if (!response.ok) {
        throw new Error('Failed to reject order');
      }

      const data = await response.json();
      // Update the order in the local state
      setOrders(orders.map(order => 
        order._id === orderId ? data.data : order
      ));
    } catch (err) {
      console.error('Error rejecting order:', err);
      alert('Error rejecting order: ' + err.message);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Accepted':
        return '#28a745'; // Green
      case 'Rejected':
        return '#dc3545'; // Red
      case 'Pending':
        return '#ffc107'; // Orange
      default:
        return '#6c757d'; // Gray
    }
  };

  if (loading) {
    return <div className="dashboard-container"><p>Loading orders...</p></div>;
  }

  if (error) {
    return <div className="dashboard-container"><p className="error">Error: {error}</p></div>;
  }

  const pendingOrders = orders.filter(order => order.status === 'Pending');

  return (
    <div className="dashboard-container">
      <h2>Incoming Orders</h2>
      
      {pendingOrders.length === 0 ? (
        <p className="no-orders">No pending orders at the moment.</p>
      ) : (
        <div className="table-wrapper">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Buyer Name</th>
                <th>Crop Name</th>
                <th>Quantity</th>
                <th>Total Price</th>
                <th>Buyer Email</th>
                <th>Buyer Phone</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {pendingOrders.map((order) => (
                <tr key={order._id} className="order-row">
                  <td>{order.buyerName}</td>
                  <td>{order.cropName}</td>
                  <td>{order.quantity}</td>
                  <td>₹{order.totalPrice}</td>
                  <td>{order.buyerEmail}</td>
                  <td>{order.buyerPhone}</td>
                  <td>
                    <span 
                      className="status-badge" 
                      style={{ backgroundColor: getStatusColor(order.status) }}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="action-buttons">
                    <button 
                      className="btn btn-accept"
                      onClick={() => handleAccept(order._id)}
                    >
                      Accept
                    </button>
                    <button 
                      className="btn btn-reject"
                      onClick={() => handleReject(order._id)}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Show completed orders summary */}
      {orders.filter(order => order.status !== 'Pending').length > 0 && (
        <div className="summary-section">
          <h3>Order Summary</h3>
          <div className="summary-stats">
            <div className="stat">
              <span className="stat-label">Accepted</span>
              <span className="stat-value accepted">
                {orders.filter(order => order.status === 'Accepted').length}
              </span>
            </div>
            <div className="stat">
              <span className="stat-label">Rejected</span>
              <span className="stat-value rejected">
                {orders.filter(order => order.status === 'Rejected').length}
              </span>
            </div>
            <div className="stat">
              <span className="stat-label">Total Revenue</span>
              <span className="stat-value revenue">
                ₹{orders
                  .filter(order => order.status === 'Accepted')
                  .reduce((sum, order) => sum + order.totalPrice, 0)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OwnerDashboard;
