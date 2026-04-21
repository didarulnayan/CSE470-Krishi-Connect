const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  cropId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'CropListing', 
    required: true 
  },
  buyerName: { 
    type: String, 
    required: true 
  },
  buyerEmail: { 
    type: String, 
    required: true 
  },
  buyerPhone: { 
    type: String, 
    required: true 
  },
  cropName: { 
    type: String, 
    required: true 
  },
  farmerName: { 
    type: String, 
    required: true 
  },
  quantity: { 
    type: Number, 
    required: true 
  },
  price: { 
    type: Number, 
    required: true 
  },
  totalPrice: { 
    type: Number, 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['Pending', 'Accepted', 'Rejected'], 
    default: 'Pending' 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
}, { versionKey: false });

module.exports = mongoose.model('Order', orderSchema);
