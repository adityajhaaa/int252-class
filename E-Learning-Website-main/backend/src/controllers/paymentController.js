import Order from '../models/Order.js';

// @desc    Create new order (Mock Payment)
// @route   POST /api/orders
// @access  Private
const createOrder = async (req, res) => {
  const { amount, currency, courseId } = req.body;

  // Directly create a paid order
  const order = new Order({
    user: req.user._id,
    course: courseId,
    amount,
    currency,
    status: 'paid', // Auto-approve payment
    razorpayOrderId: `mock_order_${Date.now()}`,
    razorpayPaymentId: `mock_pay_${Date.now()}`,
  });

  const createdOrder = await order.save();

  res.status(201).json({
      ...createdOrder._doc,
      keyId: 'mock_key_id'
  });
};

// @desc    Get order status
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    res.json(order);
  } else {
    res.status(404).json({ message: 'Order not found' });
  }
};

export { createOrder, getOrderById };
