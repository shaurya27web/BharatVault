require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

// ✅ import routes
const holdingsRoutes = require("./routes/holdingsRoutes");
const ordersRoutes = require("./routes/ordersRoutes");
const positionsRoutes = require("./routes/positionsRoutes");
const userRoutes = require("./routes/userRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const lendingRoutes = require("./routes/lendingRoutes");
const vaultRoutes = require("./routes/vaultRoutes");
const watchlistRoutes = require("./routes/watchlistRoutes"); // Add this

const app = express();

// ✅ middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ route prefixes
app.use("/holdings", holdingsRoutes);
app.use("/orders", ordersRoutes);
app.use("/positions", positionsRoutes);
app.use("/user", userRoutes);
app.use("/transactions", transactionRoutes);
app.use("/lending", lendingRoutes);
app.use("/vault", vaultRoutes);
app.use("/watchlist", watchlistRoutes); // Add this

// ✅ connect to MongoDB
const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

mongoose.connect(uri)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ DB connection error:", err));

// ✅ start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});