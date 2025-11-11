const mongoose = require("mongoose");
const PositionsSchema = require("../schemas/positionsSchema");

module.exports = mongoose.model("Position", PositionsSchema);
