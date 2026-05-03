import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';

const CropCard = ({ crop }) => {
  return (
    <Link to={`/crop/${crop._id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
      <div style={{ border: '1px solid #007bff', padding: '15px', borderRadius: '10px', backgroundColor: '#f9f9f9', height: '100%' }}>
        {crop.imageUrl ? (
           <img src={crop.imageUrl} alt="Crop" style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '5px' }} />
        ) : (
           <div style={{ width: '100%', height: '150px', backgroundColor: '#e9ecef', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '5px' }}>No Image</div>
        )}
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
          <h3 style={{ margin: 0 }}>{crop.name || "Crop Name"}</h3>
          <span style={{ backgroundColor: '#ffc107', padding: '2px 6px', borderRadius: '10px', fontSize: '12px' }}>{crop.category}</span>
        </div>
        
        <h3 style={{ color: '#28a745', margin: '10px 0' }}>৳ {crop.price || "0"} / Kg</h3>
        
        <div style={{ backgroundColor: '#fff', padding: '10px', border: '1px solid #eee', borderRadius: '5px', fontSize: '13px', marginBottom: '10px' }}>
          <p style={{ margin: '3px 0' }}>🌱 <b>Harvested:</b> {crop.harvestDate ? new Date(crop.harvestDate).toLocaleDateString() : "TBD"}</p>
          <p style={{ margin: '3px 0' }}>⏳ <b>Expires:</b> {crop.expiryDate ? new Date(crop.expiryDate).toLocaleDateString() : "TBD"}</p>
          <p style={{ margin: '3px 0' }}>📦 <b>Stock:</b> {crop.totalStock || "0"} Kg</p>
          <p style={{ margin: '3px 0' }}>⚖️ <b>Min Order:</b> {crop.minOrder || "0"} Kg</p>
        </div>

        <p style={{ 
          color: '#444', 
          fontSize: '14px', 
          wordWrap: 'break-word', 
          whiteSpace: 'pre-wrap', 
          backgroundColor: '#fff',
          padding: '8px',
          borderRadius: '5px',
          border: '1px solid #eee',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
        }}>
          {crop.description || "No description provided."}
        </p>

        <p style={{ fontSize: '12px', fontWeight: 'bold', textAlign: 'right', marginTop: '10px' }}>👨‍🌾 By: {crop.farmerName || "Farmer"}</p>
      </div>
    </Link>
  );
};

export default CropCard;
