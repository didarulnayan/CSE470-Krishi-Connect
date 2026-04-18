import React, { useState } from 'react';

const AddCropForm = () => {
  // 1. Set up variables to hold the user's typing
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [farmerName, setFarmerName] = useState('');

  // 2. The function that runs when they click "Submit"
  const handleSubmit = async (e) => {
    e.preventDefault(); // Stops the page from refreshing

    // Pack the data into an object
    const cropData = { name, price, description, farmerName };

    try {
      // Send the data to our Express Backend
      const response = await fetch('http://localhost:5000/api/crops/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cropData) // Convert object to JSON text
      });

      if (response.ok) {
        alert("Crop Added Successfully!");
        // Clear the text boxes
        setName(''); setPrice(''); setDescription(''); setFarmerName('');
      } else {
        alert("Failed to add crop.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 3. The actual HTML Form (The View)
  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <h2>Add a New Crop</h2>
      <form onSubmit={handleSubmit}>
        
        <label>Crop Name:</label><br/>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required /><br/><br/>

        <label>Price (Taka):</label><br/>
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required /><br/><br/>

        <label>Description:</label><br/>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required /><br/><br/>

        <label>Farmer Name:</label><br/>
        <input type="text" value={farmerName} onChange={(e) => setFarmerName(e.target.value)} required /><br/><br/>

        <button type="submit" style={{ padding: '10px', backgroundColor: 'green', color: 'white' }}>
          Publish Crop Listing
        </button>
      </form>
    </div>
  );
};

export default AddCropForm;