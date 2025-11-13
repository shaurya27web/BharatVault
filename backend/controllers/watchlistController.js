const Watchlist = require("../models/WatchlistModel");

// Get user watchlist - MATCHES dashboard API call
exports.getUserWatchlist = async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Sample data - replace with actual database call
    const watchlist = [
      {
        _id: '1',
        symbol: 'RELIANCE',
        name: 'Reliance Industries', 
        price: 2580,
        change: 38.5,
        changePercent: 1.51
      },
      {
        _id: '2',
        symbol: 'TCS',
        name: 'Tata Consultancy',
        price: 3350, 
        change: 26.8,
        changePercent: 0.81
      },
      {
        _id: '3',
        symbol: 'INFY',
        name: 'Infosys',
        price: 1620,
        change: 33.2, 
        changePercent: 2.09
      },
      {
        _id: '4',
        symbol: 'HDFCBANK',
        name: 'HDFC Bank',
        price: 1520,
        change: -4.5,
        changePercent: -0.30
      },
      {
        _id: '5',
        symbol: 'BAJFINANCE', 
        name: 'Bajaj Finance',
        price: 6450,
        change: 76.5,
        changePercent: 1.20
      }
    ];

    res.status(200).json({
      success: true,
      watchlist
    });
  } catch (error) {
    console.error("Get watchlist error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching watchlist",
      error: error.message
    });
  }
};

// Add to watchlist
exports.addToWatchlist = async (req, res) => {
  try {
    const { userId, stockId } = req.body;
    
    res.status(201).json({
      success: true,
      message: "Added to watchlist successfully"
    });
  } catch (error) {
    console.error("Add to watchlist error:", error);
    res.status(500).json({
      success: false,
      message: "Error adding to watchlist",
      error: error.message
    });
  }
};

// Remove from watchlist
exports.removeFromWatchlist = async (req, res) => {
  try {
    const { userId, stockId } = req.body;
    
    res.status(200).json({
      success: true,
      message: "Removed from watchlist successfully"
    });
  } catch (error) {
    console.error("Remove from watchlist error:", error);
    res.status(500).json({
      success: false,
      message: "Error removing from watchlist",
      error: error.message
    });
  }
};