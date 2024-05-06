const router = require("express").Router();

const {
  signupUser,
  verifyCode,
  resendCode,
  loginUser,
  getCode,
  addTransaction,
  getTransactions,
} = require("../controllers/api");

const { protectUser } = require("../middleware");

router.post("/signup", signupUser);
router.post("/verify-token", verifyCode);
router.post("/resend-code", resendCode);
router.post("/login", loginUser);
router.get("/get-code", getCode);
router.route("/transaction").post(protectUser, addTransaction);
router.get("/transactions", protectUser, getTransactions);

module.exports = router;
