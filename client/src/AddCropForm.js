import React, { useState } from 'react';

const AddCropForm = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Vegetable');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [farmerName, setFarmerName] = useState('');
  const [harvestDate, setHarvestDate] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [totalStock, setTotalStock] = useState('');
  const [minOrder, setMinOrder] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cropData = { name, category, price, description, imageUrl, farmerName, harvestDate, expiryDate, totalStock, minOrder };

    try {
      const response = await fetch('http://localhost:5000/api/crops/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cropData)
      });

      const data = await response.json();
      if (response.ok) {
        alert("Crop Added Successfully!");
        // Reset all fields upon success
        setName(''); setCategory('Vegetable'); setPrice(''); setDescription(''); setImageUrl(''); setFarmerName(''); setHarvestDate(''); setExpiryDate(''); setTotalStock(''); setMinOrder('');
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '50px', padding: '20px', fontFamily: 'Arial' }}>
      
      {/* FORM SECTION */}
      <div style={{ width: '400px', border: '1px solid #ddd', padding: '20px', borderRadius: '8px', backgroundColor: '#fff' }}>
        <h2>Add a New Crop</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          
          <label>Crop Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ flex: 1 }}>
              <label>Category:</label><br/>
              <select style={{ width: '100%', padding: '3px' }} value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="Vegetable">Vegetable</option>
                <option value="Fruit">Fruit</option>
                <option value="Grain">Grain</option>
                <option value="Spice">Spice</option>
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <label>Price (৳/Kg):</label><br/>
              <input type="number" style={{ width: '100%' }} value={price} onChange={(e) => setPrice(e.target.value)} required />
            </div>
          </div>

          <label>Image URL:</label>
          <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required />

          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ flex: 1 }}>
              <label>Harvest Date:</label>
              <input type="date" style={{ width: '100%' }} value={harvestDate} onChange={(e) => setHarvestDate(e.target.value)} required />
            </div>
            <div style={{ flex: 1 }}>
              <label>Expiry Date:</label>
              <input type="date" style={{ width: '100%' }} value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} required />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ flex: 1 }}>
              <label>Total Stock (Kg):</label>
              <input type="number" style={{ width: '100%' }} value={totalStock} onChange={(e) => setTotalStock(e.target.value)} required />
            </div>
            <div style={{ flex: 1 }}>
              <label>Min Order (Kg):</label>
              <input type="number" style={{ width: '100%' }} value={minOrder} onChange={(e) => setMinOrder(e.target.value)} required />
            </div>
          </div>

          <label>Description (Max 100 chars):</label>
          <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            maxLength="100"
            required 
            style={{ height: '80px', resize: 'none', padding: '5px' }} 
          />
          <small style={{ color: description.length === 100 ? 'red' : 'gray' }}>{description.length}/100 characters</small>

          <label>Farmer Name:</label>
          <input type="text" value={farmerName} onChange={(e) => setFarmerName(e.target.value)} required />

          <button type="submit" style={{ padding: '10px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '10px' }}>
            Publish Listing
          </button>
        </form>
      </div>

      {/* PREVIEW SECTION */}
      <div style={{ width: '300px' }}>
        <h3>Buyer Preview 👀</h3>
        <div style={{ border: '1px solid #007bff', padding: '15px', borderRadius: '10px', backgroundColor: '#f9f9f9' }}>
          
          {imageUrl ? (
             <img src={imageUrl} alt="Crop" style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '5px' }} />
          ) : (
             <div style={{ width: '100%', height: '150px', backgroundColor: '#e9ecef', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '5px' }}>No Image</div>
          )}
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
            <h3 style={{ margin: 0 }}>{name || "Crop Name"}</h3>
            <span style={{ backgroundColor: '#ffc107', padding: '2px 6px', borderRadius: '10px', fontSize: '12px' }}>{category}</span>
          </div>
          
          <h3 style={{ color: '#28a745', margin: '10px 0' }}>৳ {price || "0"} / Kg</h3>
          
          <div style={{ backgroundColor: '#fff', padding: '10px', border: '1px solid #eee', borderRadius: '5px', fontSize: '13px', marginBottom: '10px' }}>
            <p style={{ margin: '3px 0' }}>🌱 <b>Harvested:</b> {harvestDate || "TBD"}</p>
            <p style={{ margin: '3px 0' }}>⏳ <b>Expires:</b> {expiryDate || "TBD"}</p>
            <p style={{ margin: '3px 0' }}>📦 <b>Stock:</b> {totalStock || "0"} Kg</p>
            <p style={{ margin: '3px 0' }}>⚖️ <b>Min Order:</b> {minOrder || "0"} Kg</p>
          </div>

          <p style={{ 
            color: '#444', 
            fontSize: '14px', 
            wordWrap: 'break-word', 
            whiteSpace: 'pre-wrap', 
            backgroundColor: '#fff',
            padding: '8px',
            borderRadius: '5px',
            border: '1px solid #eee'
          }}>
            {description || "No description provided."}
          </p>

          <p style={{ fontSize: '12px', fontWeight: 'bold', textAlign: 'right', marginTop: '10px' }}>👨‍🌾 By: {farmerName || "Farmer"}</p>
        </div>
      </div>
    </div>
  );
};

export default AddCropForm;