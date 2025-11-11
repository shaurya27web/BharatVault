const mongoose = require("mongoose");
const OrdersSchema = require("../schemas/ordersSchema");

module.exports = mongoose.model("Order", OrdersSchema);
