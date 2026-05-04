const mongoose = require('mongoose');

const produceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  harvestDate: {
    type: Date,
    required: true
  },
  price: {
    type: Number,
    required: true,
    alias: 'basePrice'
  },
  totalStock: {
    type: Number,
    required: true,
    alias: 'stockQty'
  },
  status: {
    type: String,
    default: 'available'
  },
  imageUrl: {
    type: String
  },
  farmerName: {
    type: String
  },
  minOrder: {
    type: Number,
    default: 1
  }
}, {
  versionKey: false,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

produceSchema.virtual('produceId').get(function () {
  return this._id;
});

module.exports = mongoose.model('Produce', produceSchema, 'croplistings');
