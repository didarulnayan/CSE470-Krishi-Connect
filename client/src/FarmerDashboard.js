import React, { useState, useEffect } from 'react';

// ==========================================
// Requirement 1 - Khalid
// ==========================================
// This component displays the list of crops the logged-in farmer has added.
// It uses 'fetch' to get the data from our backend API.

const FarmerDashboard = ({ user, onNavigate }) => {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/crops/farmer/${user.name}`);
        const data = await response.json();
        if (response.ok) {
          setCrops(data.data);
        } else {
          console.error("Failed to fetch crops");
        }
      } catch (error) {
        console.error("Network Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCrops();
  }, [user.name]);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>My Listed Crops</h2>
        <button 
          onClick={() => onNavigate('add')}
          style={{ padding: '10px 15px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          + Add a new Crop
        </button>
      </div>

      {loading ? (
        <p>Loading your crops...</p>
      ) : crops.length === 0 ? (
        <p>You haven't listed any crops yet.</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {crops.map((crop) => (
            <div key={crop._id} style={{ width: '300px' }}>
              <div style={{ border: '1px solid #007bff', padding: '15px', borderRadius: '10px', backgroundColor: '#f9f9f9', height: '100%' }}>
                {crop.imageUrl ? (
                  <img src={crop.imageUrl} alt="Crop" style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '5px' }} />
                ) : (
                  <div style={{ width: '100%', height: '150px', backgroundColor: '#e9ecef', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '5px' }}>No Image</div>
                )}
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                  <h3 style={{ margin: 0 }}>{crop.name}</h3>
                  <span style={{ backgroundColor: '#ffc107', padding: '2px 6px', borderRadius: '10px', fontSize: '12px' }}>{crop.category}</span>
                </div>
                
                <h3 style={{ color: '#28a745', margin: '10px 0' }}>৳ {crop.price} / Kg</h3>
                
                <div style={{ backgroundColor: '#fff', padding: '10px', border: '1px solid #eee', borderRadius: '5px', fontSize: '13px', marginBottom: '10px' }}>
                  <p style={{ margin: '3px 0' }}>🌱 <b>Harvested:</b> {new Date(crop.harvestDate).toLocaleDateString()}</p>
                  <p style={{ margin: '3px 0' }}>⏳ <b>Expires:</b> {new Date(crop.expiryDate).toLocaleDateString()}</p>
                  <p style={{ margin: '3px 0' }}>📦 <b>Stock:</b> {crop.totalStock} Kg</p>
                  <p style={{ margin: '3px 0' }}>⚖️ <b>Min Order:</b> {crop.minOrder} Kg</p>
                </div>

                <p style={{ color: '#444', fontSize: '14px', wordWrap: 'break-word', whiteSpace: 'pre-wrap', backgroundColor: '#fff', padding: '8px', borderRadius: '5px', border: '1px solid #eee' }}>
                  {crop.description}
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                  <p style={{ fontSize: '12px', fontWeight: 'bold', margin: 0 }}>👨‍🌾 By: {crop.farmerName}</p>
                  <p style={{ fontSize: '12px', color: '#007bff', margin: 0 }}>📞 {crop.farmerContact}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ==========================================
// End of Requirement 1 - Khalid
// ==========================================

export default FarmerDashboard;
