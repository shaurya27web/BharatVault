const express = require("express");
const router = express.Router();
const ordersController = require("../controllers/ordersController");

// Routes
router.get("/", ordersController.getAllOrders);
router.post("/", ordersController.placeOrder);
router.delete("/:id", ordersController.cancelOrder);

module.exports = router;
