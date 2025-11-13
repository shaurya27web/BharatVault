const User = require("../models/UserModel");

// Sync Clerk user with MongoDB
exports.syncUser = async (req, res) => {
  try {
    console.log("🔍 User sync request received, body:", req.body);
    
    // Check if body exists
    if (!req.body) {
      return res.status(400).json({ 
        success: false,
        message: "Request body is missing" 
      });
    }

    const { clerkId, email, firstName, lastName, phone } = req.body;

    if (!clerkId || !email) {
      return res.status(400).json({ 
        success: false,
        message: "Missing required fields: clerkId and email",
        received: req.body 
      });
    }

    console.log("🔄 Syncing user:", { clerkId, email, firstName, lastName });

    // Check if user already exists
    let user = await User.findOne({ 
      $or: [{ clerkId }, { email }] 
    });

    if (!user) {
      // Create new user
      user = new User({
        clerkId,
        email,
        firstName: firstName || "",
        lastName: lastName || "",
        phone: phone || "",
        balance: 1000
      });
      
      await user.save();
      console.log("✅ New user created:", user.email);
    } else {
      // Update existing user if needed
      user.firstName = firstName || user.firstName;
      user.lastName = lastName || user.lastName;
      user.phone = phone || user.phone;
      user.updatedAt = new Date();
      await user.save();
      console.log("✅ Existing user updated:", user.email);
    }

    res.status(200).json({
      success: true,
      message: "User synced successfully",
      user: {
        _id: user._id,
        clerkId: user.clerkId,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        balance: user.balance,
        phone: user.phone
      }
    });
  } catch (error) {
    console.error("❌ User sync error:", error);
    res.status(500).json({ 
      success: false,
      message: "Failed to sync user", 
      error: error.message 
    });
  }
};

// Get user by Clerk ID
exports.getUserByClerkId = async (req, res) => {
  try {
    const user = await User.findOne({ clerkId: req.params.clerkId });
    
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: "User not found" 
      });
    }

    res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        clerkId: user.clerkId,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        balance: user.balance,
        phone: user.phone
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: "Error fetching user", 
      error: error.message 
    });
  }
};

// Get user by MongoDB ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: "User not found" 
      });
    }

    res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        clerkId: user.clerkId,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        balance: user.balance,
        phone: user.phone
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: "Error fetching user", 
      error: error.message 
    });
  }
};