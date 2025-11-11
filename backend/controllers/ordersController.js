const OrdersModel = require("../models/ordersModel");

// Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await OrdersModel.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Error fetching orders", error: err });
  }
};

// Place a new order
exports.placeOrder = async (req, res) => {
  try {
    const newOrder = new OrdersModel(req.body);
    await newOrder.save();
    res.status(201).json({ message: "Order placed successfully", data: newOrder });
  } catch (err) {
    res.status(500).json({ message: "Error placing order", error: err });
  }
};

// Cancel an order
exports.cancelOrder = async (req, res) => {
  try {
    await OrdersModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Order cancelled successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error cancelling order", error: err });
  }
};
