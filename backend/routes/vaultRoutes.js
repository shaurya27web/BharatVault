const express = require("express");
const router = express.Router();
const vaultController = require("../controllers/vaultController");

// get vault info
router.get("/get/:userId", vaultController.getVaultByUser);

// manual update (optional)
router.put("/update", vaultController.updateVaultManually);

// sync vault automatically
router.put("/sync/:userId", vaultController.syncVault);

module.exports = router;
