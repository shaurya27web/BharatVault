const VaultModel = require("../models/VaultModel");
const TransactionModel = require("../models/TransactionModel");
const LendingModel = require("../models/LendingModel");

// 1️⃣ Get vault info
exports.getVaultByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    let vault = await VaultModel.findOne({ userId });

    if (!vault) {
      // create vault if doesn't exist
      vault = new VaultModel({ userId });
      await vault.save();
    }

    res.status(200).json(vault);
  } catch (err) {
    res.status(500).json({ message: "Error fetching vault", error: err });
  }
};

// 2️⃣ Manual update (optional)
exports.updateVaultManually = async (req, res) => {
  try {
    const { userId, balance, totalDeposits, totalWithdrawals, totalLent, totalBorrowed } = req.body;
    let vault = await VaultModel.findOneAndUpdate(
      { userId },
      { balance, totalDeposits, totalWithdrawals, totalLent, totalBorrowed, updatedAt: Date.now() },
      { new: true, upsert: true }
    );

    res.status(200).json({ message: "Vault updated manually", vault });
  } catch (err) {
    res.status(500).json({ message: "Error updating vault", error: err });
  }
};

// 3️⃣ Sync vault automatically
exports.syncVault = async (req, res) => {
  try {
    const { userId } = req.params;

    // get all completed transactions
    const transactions = await TransactionModel.find({ userId, status: "completed" });
    const lendings = await LendingModel.find({ userId, status: "active" });

    // compute totals
    let totalDeposits = 0, totalWithdrawals = 0, totalLent = 0, totalBorrowed = 0;

    transactions.forEach(tx => {
      if (tx.type === "deposit") totalDeposits += tx.amount;
      if (tx.type === "withdrawal") totalWithdrawals += tx.amount;
    });

    lendings.forEach(ld => {
      if (ld.type === "lend") totalLent += ld.amount;
      if (ld.type === "borrow") totalBorrowed += ld.amount;
    });

    const balance = totalDeposits - totalWithdrawals - totalLent + totalBorrowed;

    // update vault
    const vault = await VaultModel.findOneAndUpdate(
      { userId },
      { balance, totalDeposits, totalWithdrawals, totalLent, totalBorrowed, updatedAt: Date.now() },
      { new: true, upsert: true }
    );

    res.status(200).json({ message: "Vault synced", vault });
  } catch (err) {
    res.status(500).json({ message: "Error syncing vault", error: err });
  }
};
