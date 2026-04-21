import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';

const CropCard = ({ crop }) => {
  return (
    <Link to={`/crop/${crop._id}`} className="crop-card-link">
      <div className="crop-card">
        <div className="card-image-wrap">
          <img src={crop.imageUrl} alt={crop.name} className="card-image" />
          <span className="card-badge">{crop.category}</span>
        </div>
        <div className="card-content">
          <h3 className="card-title">{crop.name}</h3>
          <p className="card-location">
            <MapPin size={16} className="location-icon" /> 
            {crop.district}, {crop.division}
          </p>
          <div className="card-footer">
            <div className="price-block">
              <span className="price-symbol">৳</span>
              <span className="price-value">{crop.price}</span>
              <span className="price-unit">/kg</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CropCard;
