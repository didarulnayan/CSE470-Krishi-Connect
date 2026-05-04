const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  produce: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Produce',
    required: true
  },
  produceName: {
    type: String,
    required: true,
    trim: true
  },
  farmerName: {
    type: String,
    default: ''
  },
  imageUrl: {
    type: String,
    default: ''
  },
  unitPrice: {
    type: Number,
    required: true,
    min: 0
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  finalPrice: {
    type: Number,
    required: true,
    min: 0
  }
}, {
  versionKey: false
});

module.exports = mongoose.model('OrderItem', orderItemSchema);
