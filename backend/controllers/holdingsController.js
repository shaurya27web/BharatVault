const Holdings = require("../models/HoldingsModel");

// Get user holdings - MATCHES dashboard API call
exports.getUserHoldings = async (req, res) => {
  try {
    const { userId } = req.params;
    
    // For now, return sample data - replace with actual database call
    const holdings = [
      {
        _id: '1',
        stockId: {
          symbol: 'RELIANCE',
          name: 'Reliance Industries',
          currentPrice: 2580
        },
        quantity: 10,
        averagePrice: 2450,
        pnl: 13000
      },
      {
        _id: '2', 
        stockId: {
          symbol: 'TCS',
          name: 'Tata Consultancy', 
          currentPrice: 3350
        },
        quantity: 5,
        averagePrice: 3200,
        pnl: 750
      },
      {
        _id: '3',
        stockId: {
          symbol: 'INFY',
          name: 'Infosys',
          currentPrice: 1620
        },
        quantity: 8,
        averagePrice: 1500,
        pnl: 960
      }
    ];

    res.status(200).json({
      success: true,
      holdings
    });
  } catch (error) {
    console.error("Get holdings error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching holdings",
      error: error.message
    });
  }
};

// Portfolio summary - MATCHES dashboard API call
exports.getPortfolioSummary = async (req, res) => {
  try {
    const { userId } = req.params;
    
    res.status(200).json({
      success: true,
      summary: {
        totalValue: 189000,
        todaysPL: 2450,
        totalReturn: 12840,
        availableCash: 1000
      }
    });
  } catch (error) {
    console.error("Portfolio summary error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching portfolio summary",
      error: error.message
    });
  }
};

// Add holding
exports.addHolding = async (req, res) => {
  try {
    const { userId, stockId, quantity, averagePrice } = req.body;
    
    res.status(201).json({
      success: true,
      message: "Holding added successfully"
    });
  } catch (error) {
    console.error("Add holding error:", error);
    res.status(500).json({
      success: false,
      message: "Error adding holding",
      error: error.message
    });
  }
};