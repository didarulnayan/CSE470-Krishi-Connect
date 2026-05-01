const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  produce: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Produce',
    required: true
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
