// backend/utils/upiSimulator.js
exports.processUpiPayment = async (upiId, amount) => {
  console.log(`Processing UPI Payment: ${upiId}, ₹${amount}`);
  
  // simulate delay + success/failure
  const success = Math.random() > 0.1; // 90% success rate
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    status: success ? "success" : "failed",
    transactionId: `TXN${Date.now()}`,
  };
};
