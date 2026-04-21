const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: {
    type: Number,
    unique: true
  },
  orderDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending'
  },
  totalAmount: {
    type: Number,
    required: true,
    min: 0
  },
  orderItems: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'OrderItem'
    }],
    default: [],
    validate: {
      validator: (items) => items.length > 0,
      message: 'An order must contain at least one order item.'
    }
  }
}, {
  versionKey: false
});

orderSchema.pre('save', async function (next) {
  if (!this.isNew || this.orderId) {
    return next();
  }

  const lastOrder = await this.constructor
    .findOne()
    .sort({ orderId: -1 })
    .select('orderId')
    .lean();

  this.orderId = lastOrder ? lastOrder.orderId + 1 : 1;
  next();
});

orderSchema.methods.confirmOrder = function () {
  this.status = 'pending';
  return this.save();
};

orderSchema.methods.trackStatus = function () {
  return this.status;
};

module.exports = mongoose.model('Order', orderSchema);
