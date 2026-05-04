import React from 'react';
import AddCropForm from './AddCropForm';
import OrderPage from './OrderPage';

function App() {
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Krishi-Connect</h1>
      <AddCropForm />
      {/* Member 3 integration */}
      <div style={{ padding: '32px 20px 48px' }}>
        <OrderPage />
      </div>
    </div>
  );
}

export default App;
