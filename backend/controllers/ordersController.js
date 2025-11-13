const Orders = require("../models/OrdersModel");

// Get user orders - MATCHES dashboard API call
exports.getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Sample data - replace with actual database call
    const orders = [
      {
        _id: '1',
        stockId: { symbol: 'RELIANCE', name: 'Reliance Industries' },
        type: 'BUY',
        quantity: 5,
        price: 2560,
        status: 'Completed'
      },
      {
        _id: '2',
        stockId: { symbol: 'TCS', name: 'Tata Consultancy' },
        type: 'SELL', 
        quantity: 2,
        price: 3340,
        status: 'Pending'
      },
      {
        _id: '3',
        stockId: { symbol: 'INFY', name: 'Infosys' },
        type: 'BUY',
        quantity: 10,
        price: 1600,
        status: 'Completed'
      }
    ];

    res.status(200).json({
      success: true,
      orders
    });
  } catch (error) {
    console.error("Get orders error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching orders",
      error: error.message
    });
  }
};

// Place order
exports.placeOrder = async (req, res) => {
  try {
    const { userId, stockId, type, quantity, price, orderType } = req.body;
    
    res.status(201).json({
      success: true,
      message: "Order placed successfully"
    });
  } catch (error) {
    console.error("Place order error:", error);
    res.status(500).json({
      success: false,
      message: "Error placing order",
      error: error.message
    });
  }
};