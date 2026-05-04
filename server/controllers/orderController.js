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
      produceName: produce.name,
      farmerName: produce.farmerName || '',
      imageUrl: produce.imageUrl || '',
      unitPrice: Number(produce.price),
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

    const primaryItem = savedOrder?.orderItems?.[0];

    res.status(201).json({
      message: 'Order request submitted successfully.',
      data: savedOrder,
      summary: primaryItem ? {
        orderId: savedOrder.orderId,
        status: savedOrder.status,
        orderDate: savedOrder.orderDate,
        totalAmount: savedOrder.totalAmount,
        item: {
          id: primaryItem._id,
          produceId: primaryItem.produce?._id || primaryItem.produce,
          produceName: primaryItem.produceName,
          farmerName: primaryItem.farmerName,
          imageUrl: primaryItem.imageUrl,
          unitPrice: primaryItem.unitPrice,
          quantity: primaryItem.quantity,
          finalPrice: primaryItem.finalPrice
        }
      } : null
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ error: 'Failed to create order.' });
  }
};

module.exports = { createOrder };
