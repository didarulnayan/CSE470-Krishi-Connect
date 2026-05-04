import React, { useState, useEffect } from 'react';

const FarmerOrders = ({ user, onGoBack }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/orders/farmer/${user.name}`);
        const data = await response.json();
        if (response.ok) {
          setOrders(data.data);
        } else {
          console.error("Failed to fetch orders");
        }
      } catch (error) {
        console.error("Network Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user.name]);

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      
      if (response.ok) {
        setOrders(prevOrders => 
          prevOrders.map(order => 
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
      } else {
        console.error("Failed to update status");
      }
    } catch (error) {
      console.error("Network Error:", error);
    }
  };

  const handleRemoveOrder = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/orders/${orderId}/hide`, {
        method: 'PUT',
      });
      if (response.ok) {
        setOrders(prevOrders => 
          prevOrders.map(order => 
            order._id === orderId ? { ...order, hiddenByFarmer: true } : order
          )
        );
      } else {
        console.error("Failed to hide order");
      }
    } catch (error) {
      console.error("Network Error:", error);
    }
  };

  const displayedOrders = showHistory 
    ? orders 
    : orders.filter(order => !order.hiddenByFarmer);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <button 
            onClick={onGoBack}
            style={{ padding: '8px 12px', backgroundColor: '#6c757d', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '15px' }}
          >
            ← Back to Dashboard
          </button>
          <span style={{ fontSize: '24px', fontWeight: 'bold' }}>
            {showHistory ? 'Order History' : 'Incoming Orders'}
          </span>
        </div>
        <button 
          onClick={() => setShowHistory(!showHistory)}
          style={{ padding: '10px 15px', backgroundColor: showHistory ? '#17a2b8' : '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          {showHistory ? 'View Active Dashboard' : 'Order History'}
        </button>
      </div>

      {loading ? (
        <p>Loading incoming orders...</p>
      ) : displayedOrders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {displayedOrders.map((order) => {
            // Aggregate info from items
            const firstItem = order.orderItems[0];
            const produceName = firstItem ? firstItem.produceName : 'Unknown Produce';
            const totalQty = order.orderItems.reduce((sum, item) => sum + item.quantity, 0);

            return (
              <div key={order._id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '10px', backgroundColor: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <div>
                  <h3 style={{ margin: '0 0 10px 0' }}>Order #{order.orderId}</h3>
                  <p style={{ margin: '5px 0', fontSize: '14px' }}><b>Item:</b> {produceName}</p>
                  <p style={{ margin: '5px 0', fontSize: '14px' }}><b>Quantity:</b> {totalQty} Kg</p>
                  <p style={{ margin: '5px 0', fontSize: '14px' }}><b>Total Amount:</b> ৳ {order.totalAmount}</p>
                  <p style={{ margin: '5px 0', fontSize: '14px' }}><b>Date:</b> {new Date(order.orderDate).toLocaleString()}</p>
                  <p style={{ margin: '10px 0 0 0', fontSize: '14px' }}>
                    <b>Status: </b> 
                    <span style={{ 
                      padding: '4px 8px', 
                      borderRadius: '4px', 
                      color: '#fff',
                      backgroundColor: order.status === 'pending' ? '#ffc107' : 
                                      order.status === 'accepted' ? '#28a745' : '#dc3545'
                    }}>
                      {order.status.toUpperCase()}
                    </span>
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {order.status === 'pending' && (
                    <>
                      <button 
                        onClick={() => handleUpdateStatus(order._id, 'accepted')}
                        style={{ padding: '8px 15px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                      >
                        Accept
                      </button>
                      <button 
                        onClick={() => handleUpdateStatus(order._id, 'rejected')}
                        style={{ padding: '8px 15px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                      >
                        Reject
                      </button>
                    </>
                  )}
                  {order.status !== 'pending' && !showHistory && (
                    <button 
                      onClick={() => handleRemoveOrder(order._id)}
                      style={{ padding: '8px 15px', backgroundColor: '#6c757d', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                      Remove Order
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
