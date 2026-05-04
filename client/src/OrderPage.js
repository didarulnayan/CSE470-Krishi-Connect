import React, { useEffect, useState } from 'react';
import OrderForm from './OrderForm';

function OrderPage() {
  const [produceOptions, setProduceOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduce = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await fetch('http://localhost:5000/api/produce');
        const data = await response.json();

        if (!response.ok) {
          setError(data.error || 'Failed to load produce.');
          setProduceOptions([]);
          return;
        }

        setProduceOptions(data);
      } catch (fetchError) {
        setError('Could not connect to the server.');
        setProduceOptions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProduce();
  }, []);

  return (
    <section>
      <h2 style={{ textAlign: 'center', marginBottom: '16px' }}>Buyer Order Request</h2>
      {loading ? (
        <p style={{ textAlign: 'center' }}>Loading available produce...</p>
      ) : error ? (
        <p style={{ textAlign: 'center', color: '#c62828' }}>{error}</p>
      ) : (
        <OrderForm produceOptions={produceOptions} />
      )}
    </section>
  );
}

export default OrderPage;
