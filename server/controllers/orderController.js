const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const Produce = require('../models/Produce');

const createOrder = async (req, res) => {
  try {
    const { produceId, quantity } = req.body;

    if (!produceId || !quantity) {
      return res.status(400).json({ error: 'Produce and quantity are required.' });
    }

    const produce = await Produce.findById(produceId);

    if (!produce) {
      return res.status(404).json({ error: 'Produce not found.' });
    }

    const numericQuantity = Number(quantity);

    if (numericQuantity < 1) {
      return res.status(400).json({ error: 'Quantity must be at least 1.' });
    }

    if (numericQuantity < Number(produce.minOrder || 1)) {
      return res.status(400).json({
        error: `Minimum order for this produce is ${produce.minOrder || 1} Kg.`
      });
    }

    if (numericQuantity > Number(produce.totalStock)) {
      return res.status(400).json({ error: 'Requested quantity exceeds available stock.' });
    }

    const finalPrice = numericQuantity * Number(produce.price);

    if (!Number.isFinite(finalPrice) || finalPrice < 0) {
      return res.status(400).json({ error: 'Invalid produce price configured.' });
    }

    const orderItem = await OrderItem.create({
      produce: produce._id,
      quantity: numericQuantity,
      finalPrice
    });

    const order = new Order({
      totalAmount: finalPrice,
      orderItems: [orderItem._id]
    });

    await order.confirmOrder();

    const savedOrder = await Order.findById(order._id).populate({
      path: 'orderItems',
      populate: {
        path: 'produce'
      }
    });

    res.status(201).json({
      message: 'Order request submitted successfully.',
      data: savedOrder
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ error: 'Failed to create order.' });
  }
};

const getIncomingOrders = async (req, res) => {
  try {
    const { farmerName } = req.query;

    if (!farmerName || typeof farmerName !== 'string') {
      return res.status(400).json({ error: 'farmerName query param is required.' });
    }

    const orders = await Order.find()
      .sort({ _id: -1 })
      .populate({
        path: 'orderItems',
        populate: {
          path: 'produce'
        }
      })
      .lean();

    const normalizedFarmerName = farmerName.trim().toLowerCase();

    const incoming = orders.filter((order) =>
      Array.isArray(order.orderItems) &&
      order.orderItems.some((item) => {
        const produce = item?.produce;
        if (!produce) return false;
        const produceFarmer = String(produce.farmerName || '').trim().toLowerCase();
        return produceFarmer === normalizedFarmerName;
      })
    );

    res.status(200).json(incoming);
  } catch (error) {
    console.error('Get incoming orders error:', error);
    res.status(500).json({ error: 'Failed to fetch incoming orders.' });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['accepted', 'rejected'].includes(status)) {
      return res.status(400).json({ error: 'Status must be accepted or rejected.' });
    }

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found.' });
    }

    if (order.status !== 'pending') {
      return res.status(409).json({ error: 'Only pending orders can be updated.' });
    }

    order.status = status;
    await order.save();

    const savedOrder = await Order.findById(order._id).populate({
      path: 'orderItems',
      populate: {
        path: 'produce'
      }
    });

    res.status(200).json({
      message: 'Order status updated successfully.',
      data: savedOrder
    });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({ error: 'Failed to update order status.' });
  }
};

module.exports = { createOrder, getIncomingOrders, updateOrderStatus };
