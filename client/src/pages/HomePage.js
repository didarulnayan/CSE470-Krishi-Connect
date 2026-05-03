import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CropCard from '../components/CropCard';
import { Search, Filter, AlertCircle } from 'lucide-react';
import dummyData from '../dummyData.json';

const HomePage = () => {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCrops = async () => {
      setLoading(true);
      try {
        let qs = `?`;
        if (searchTerm) qs += `search=${searchTerm}&`;

        const { data } = await axios.get(`http://localhost:5000/api/crops${qs}`);
        setCrops(data);
        setError(null);
      } catch (err) {
        console.error("Backend fetch failed, falling back to dummyData", err);
        // Fallback to dummy data
        const fallbackData = dummyData.filter(crop => {
            return crop.name.toLowerCase().includes(searchTerm.toLowerCase());
        });
        setCrops(fallbackData);
        setError("Could not connect to live database. Displaying offline data.");
      } finally {
        setLoading(false);
      }
    };
    
    // Add debounce for search typing
    const delayDebounce = setTimeout(() => {
      fetchCrops();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  return (
    <div className="home-container">
      <header className="home-header glass-panel">
        <div className="hero-text">
          <h1>Find Fresh Produce, Directly from Farmers</h1>
          <p>Connecting urban buyers with the best local harvests.</p>
        </div>

        <div className="search-filter-hub">
          <div className="search-bar">
            <Search className="search-icon" />
            <input 
              type="text" 
              placeholder="Search for crops..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="filters">
            <Filter size={18} />
          </div>
        </div>
      </header>
      
      {error && (
        <div className="alert-box warning fade-in">
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      <div className="crops-grid-container">
        {loading ? (
          <div className="loader-spinner">Loading crops...</div>
        ) : crops.length === 0 ? (
          <div className="empty-state">No crops found matching your criteria.</div>
        ) : (
          <div className="crops-grid fade-in">
            {crops.map((crop) => (
              <CropCard key={crop._id} crop={crop} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
