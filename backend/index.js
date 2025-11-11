require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

// import routes
const holdingsRoutes = require("./routes/holdingsRoutes");
const ordersRoutes = require("./routes/ordersRoutes");
const positionsRoutes = require("./routes/positionsRoutes");
const userRoutes = require("./routes/userRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
// const upiRoutes = require("./routes/upiRoutes");
const lendingRoutes = require("./routes/lendingRoutes");
const vaultRoutes = require("./routes/vaultRoutes");

const PORT = process.env.port || 3002;
const uri = process.env.MONGO_URL;

const app = express();

app.use(cors());
app.use(bodyParser.json());

// connect routes
app.use("/holdings", holdingsRoutes);
app.use("/orders", ordersRoutes);
app.use("/positions", positionsRoutes);
app.use("/user", userRoutes);
 app.use("/transaction", transactionRoutes);
// app.use("/upi", upiRoutes);
app.use("/lending", lendingRoutes);
app.use("/vault", vaultRoutes);

mongoose.connect(uri)
  .then(() => console.log("DB connected"))
  .catch(err => console.log("DB connection error:", err));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
