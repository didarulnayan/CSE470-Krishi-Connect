import React, { useState } from 'react';
import { Leaf, Package, Truck, CheckCircle } from 'lucide-react';

const PurchaseRequestForm = ({ crop }) => {
  const [quantity, setQuantity] = useState(crop.minOrder || 1);
  const [submitted, setSubmitted] = useState(false);

  // Auto-calculated total price
  const totalPrice = quantity * crop.price;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:5000/api/orders/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          produceId: crop._id || crop.produceId,
          quantity: Number(quantity)
        })
      });
      
      const data = await response.json();
      if (response.ok) {
        setSubmitted(true);
      } else {
        alert(data.error || 'Failed to place order.');
      }
    } catch (err) {
      alert('Network error. Could not connect to the server.');
    }
  };

  if (submitted) {
    return (
      <div className="success-card glass-panel">
        <CheckCircle size={48} className="success-icon" />
        <h3>Order Placed Successfully!</h3>
        <p>Your request for {quantity}kg of {crop.name} has been sent to {crop.farmerName}.</p>
      </div>
    );
  }

  return (
    <div className="purchase-form-container glass-panel">
      <h3>Place an Order</h3>
      <div className="stock-info">
        <div className="info-item">
          <Package className="info-icon" />
          <div>
            <p className="info-label">Available Stock</p>
            <p className="info-value">{crop.totalStock} kg</p>
          </div>
        </div>
        <div className="info-item">
          <Leaf className="info-icon" />
          <div>
            <p className="info-label">Min Order</p>
            <p className="info-value">{crop.minOrder} kg</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="order-form">
        <div className="form-group">
          <label htmlFor="quantity">Required Quantity (kg)</label>
          <input 
            type="number" 
            id="quantity" 
            min={crop.minOrder} 
            max={crop.totalStock}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="input-field"
            required
          />
        </div>

        <div className="price-calculation">
          <div className="calc-row">
            <span>Price per kg:</span>
            <span>৳{crop.price}</span>
          </div>
          <div className="calc-divider"></div>
          <div className="calc-total">
            <span>Total Price:</span>
            <span className="total-highlight">৳{totalPrice}</span>
          </div>
        </div>

        <button type="submit" className="btn-primary w-full shadow-hover">
          <Truck className="btn-icon" /> Order Now
        </button>
      </form>
    </div>
  );
};

export default PurchaseRequestForm;
