const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ["credit", "shopping", "subscription", "food", "miscellaneous"],
  },
  desc: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
});

const Transaction = mongoose.model("Transaction", TransactionSchema);

module.exports = Transaction;
