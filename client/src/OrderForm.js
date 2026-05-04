import React, { useEffect, useMemo, useRef, useState } from 'react';

function OrderForm({ produceOptions = [] }) {
  const [selectedProduceId, setSelectedProduceId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [orderSummary, setOrderSummary] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [ordering, setOrdering] = useState(false);
  const quantityInputRef = useRef(null);

  useEffect(() => {
    if (!selectedProduceId && produceOptions.length > 0) {
      setSelectedProduceId(produceOptions[0]._id);
    }
  }, [produceOptions, selectedProduceId]);

  const selectedProduce = useMemo(
    () => produceOptions.find((item) => item._id === selectedProduceId),
    [produceOptions, selectedProduceId]
  );

  useEffect(() => {
    setOrdering(false);
    setQuantity('');
    setMessage('');
    setError('');
    setOrderSummary(null);
  }, [selectedProduceId]);

  const totalPrice = useMemo(() => {
    if (!selectedProduce || !quantity) {
      return 0;
    }

    return Number(quantity) * Number(selectedProduce.price || 0);
  }, [quantity, selectedProduce]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    setError('');
    setOrderSummary(null);
    setSubmitting(true);

    try {
      const response = await fetch('http://localhost:5000/api/orders/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          produceId: selectedProduceId,
          quantity: Number(quantity)
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to place order.');
      } else {
        setMessage(data.message || 'Order confirmed.');
        setOrderSummary(data.summary || null);
        setQuantity('');
        setOrdering(false);
      }
    } catch (submitError) {
      setError('Could not connect to the server.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleOrderNow = () => {
    if (!selectedProduce) {
      return;
    }

    setOrdering(true);
    setQuantity((currentQuantity) => currentQuantity || String(selectedProduce.minOrder || 1));

    window.setTimeout(() => {
      quantityInputRef.current?.focus();
    }, 0);
  };

  return (
    <div style={{ maxWidth: '460px', margin: '0 auto', padding: '24px', border: '1px solid #d7e3d2', borderRadius: '12px', backgroundColor: '#ffffff' }}>
      <h2 style={{ marginTop: 0 }}>Place Order</h2>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '12px' }}>
        <label htmlFor="produce-select">Produce</label>
        <select
          id="produce-select"
          value={selectedProduceId}
          onChange={(event) => setSelectedProduceId(event.target.value)}
          required
          disabled={produceOptions.length === 0}
        >
          {produceOptions.length === 0 ? (
            <option value="">No produce available</option>
          ) : (
            produceOptions.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name} - BDT {item.price}/Kg
              </option>
            ))
          )}
        </select>

        {selectedProduce && (
          <div style={{ padding: '16px', border: '1px solid #d7e3d2', borderRadius: '10px', backgroundColor: '#f8fbf5', display: 'grid', gap: '10px' }}>
            <div>
              <strong>{selectedProduce.name}</strong>
              <p style={{ margin: '6px 0 0', color: '#4b5d47' }}>
                Farmer: {selectedProduce.farmerName || 'N/A'} | Price: BDT {selectedProduce.price}/Kg
              </p>
            </div>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', color: '#4b5d47', fontSize: '14px' }}>
              <span>Min Order: {selectedProduce.minOrder || 1} Kg</span>
              <span>Stock: {selectedProduce.totalStock} Kg</span>
            </div>

            <button
              type="button"
              onClick={handleOrderNow}
              style={{ padding: '10px', backgroundColor: '#f0f7ea', border: '1px solid #b7d6a5', borderRadius: '8px', cursor: 'pointer' }}
            >
              Order Now
            </button>
          </div>
        )}

        {ordering && (
          <>
            <label htmlFor="quantity-input">Quantity (Kg)</label>
            <input
              id="quantity-input"
              ref={quantityInputRef}
              type="number"
              min={selectedProduce?.minOrder || 1}
              max={selectedProduce?.totalStock || undefined}
              value={quantity}
              onChange={(event) => setQuantity(event.target.value)}
              required
            />

            <div style={{ padding: '12px', backgroundColor: '#f7f7f7', borderRadius: '8px' }}>
              <strong>Total Price:</strong> BDT {totalPrice}
            </div>

            <button
              type="submit"
              disabled={submitting || produceOptions.length === 0}
              style={{ padding: '12px', backgroundColor: '#2f7d32', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
            >
              {submitting ? 'Submitting...' : 'Confirm Order'}
            </button>
          </>
        )}

        {message && <p style={{ color: '#2f7d32', margin: 0 }}>{message}</p>}
        {orderSummary && (
          <div style={{ padding: '14px', border: '1px solid #cfe3c2', borderRadius: '10px', backgroundColor: '#f5fbef', display: 'grid', gap: '8px' }}>
            <strong>Order #{orderSummary.orderId}</strong>
            <span>Status: {orderSummary.status}</span>
            <span>Produce: {orderSummary.item.produceName}</span>
            <span>Farmer: {orderSummary.item.farmerName || 'N/A'}</span>
            <span>Unit Price: BDT {orderSummary.item.unitPrice}/Kg</span>
            <span>Quantity: {orderSummary.item.quantity} Kg</span>
            <span>Total: BDT {orderSummary.totalAmount}</span>
          </div>
        )}
        {error && <p style={{ color: '#c62828', margin: 0 }}>{error}</p>}
      </form>
    </div>
  );
}

export default OrderForm;
