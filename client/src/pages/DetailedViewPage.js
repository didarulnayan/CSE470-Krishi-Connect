import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import PurchaseRequestForm from '../components/PurchaseRequestForm';
import ReviewInterface from '../components/ReviewInterface';
import dummyData from '../dummyData.json';
import { Share2, Heart, ArrowLeft, Phone, User, Calendar, Tag } from 'lucide-react';

const DetailedViewPage = () => {
  const { id } = useParams();
  const [crop, setCrop] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCrop = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`http://localhost:5000/api/crops/${id}`);
        setCrop(data);
      } catch (err) {
        // Fallback to dummy data mapping
        const dummyCrop = dummyData.find(c => c._id === id);
        setCrop(dummyCrop || null);
      } finally {
        setLoading(false);
      }
    };
    fetchCrop();
  }, [id]);

  if (loading) return <div className="loader-spinner">Loading...</div>;
  if (!crop) return <div className="empty-state">Crop not found. <Link to="/">Go Back</Link></div>;

  return (
    <div className="detail-container fade-in">
      <Link to="/" className="back-link"><ArrowLeft size={18} /> Back to market</Link>
      
      <div className="detail-layout">
        {/* Left Column: Image and Description */}
        <div className="detail-col-left">
          <div className="image-hero glass-panel">
            <img src={crop.imageUrl} alt={crop.name} />
            <div className="action-buttons">
              <button className="icon-btn"><Heart size={20} /></button>
              <button className="icon-btn"><Share2 size={20} /></button>
            </div>
            <span className="badge category-badge">{crop.category}</span>
          </div>

          <div className="section-block glass-panel mt-4">
            <h2>Description</h2>
            <p className="description-text">{crop.description}</p>

            <div className="info-tags">
               <div className="tag"><Tag size={16}/> Batch: {crop.batchId || 'N/A'}</div>
               <div className="tag"><Calendar size={16}/> Harvested: {new Date(crop.harvestDate).toLocaleDateString()}</div>
               <div className="tag"><Calendar size={16}/> Expires: {new Date(crop.expiryDate).toLocaleDateString()}</div>
            </div>
          </div>

          <div className="section-block mt-4 glass-panel">
            <h2>Farmer Information</h2>
            <div className="farmer-profile">
              <div className="avatar">
                <User size={32} />
              </div>
              <div className="farmer-details">
                <h3>{crop.farmerName}</h3>
                <p className="farmer-location">{crop.district}, {crop.division}</p>
                <div className="contact-badge">
                  <Phone size={14} /> Contact capabilities unlocked upon order
                </div>
              </div>
            </div>
          </div>

          {/* Review Interface inserted here to fulfill Req 5 */}
          <div className="section-block mt-4 glass-panel">
             <ReviewInterface farmerName={crop.farmerName} />
          </div>
        </div>

        {/* Right Column: Checkout/Purchase Request */}
        <div className="detail-col-right">
          <div className="sticky-sidebar">
             <div className="price-tag-big mb-4">
                <span>৳</span>{crop.price}<small>/kg</small>
             </div>
             
             {/* Purchase Request component handles Req 3 logic */}
             <PurchaseRequestForm crop={crop} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedViewPage;
