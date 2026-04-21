const Order = require('../models/Order');

// Get all pending orders for the dashboard
const getOrders = async (req, res) => {
  try {
    // Get all orders sorted by newest first
    const orders = await Order.find().populate('cropId').sort({ createdAt: -1 });
    res.status(200).json({ data: orders });
  } catch (error) {
    console.log("🔥 MONGOOSE ERROR:", error.message);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

// Update order status (Accept or Reject)
const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    // Validate status
    if (!['Accepted', 'Rejected', 'Pending'].includes(status)) {
      return res.status(400).json({ error: "Invalid status. Must be 'Accepted', 'Rejected', or 'Pending'." });
    }

    // Update the order
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status, updatedAt: Date.now() },
      { new: true }
    ).populate('cropId');

    if (!updatedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.status(200).json({ 
      message: `Order ${status.toLowerCase()} successfully!`, 
      data: updatedOrder 
    });

  } catch (error) {
    console.log("🔥 MONGOOSE ERROR:", error.message);
    res.status(500).json({ error: "Failed to update order" });
  }
};

// Create a new order (for buyers)
const createOrder = async (req, res) => {
  try {
    const { cropId, buyerName, buyerEmail, buyerPhone, cropName, farmerName, quantity, price } = req.body;

    // Validation
    if (quantity <= 0) {
      return res.status(400).json({ error: "Quantity must be greater than 0" });
    }

    const totalPrice = quantity * price;

    const newOrder = new Order({
      cropId,
      buyerName,
      buyerEmail,
      buyerPhone,
      cropName,
      farmerName,
      quantity,
      price,
      totalPrice,
      status: 'Pending'
    });

    await newOrder.save();
    res.status(201).json({ message: "Order created successfully!", data: newOrder });

  } catch (error) {
    console.log("🔥 MONGOOSE ERROR:", error.message);
    res.status(500).json({ error: "Failed to create order" });
  }
};

module.exports = { getOrders, updateOrderStatus, createOrder };
