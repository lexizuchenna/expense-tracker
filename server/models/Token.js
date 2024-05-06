const mongoose = require("mongoose");

const TokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    default: () => (Math.floor(Math.random() * 900000) + 100000).toString(),
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: () => Date.now(),
  },
  expiresAt: {
    type: Date,
    required: true,
    default: () => Date.now() + 600000,
  },
});

const Token = mongoose.model("Token", TokenSchema);

module.exports = Token;
