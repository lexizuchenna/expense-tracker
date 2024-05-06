const router = require("express").Router();

const {
  signupUser,
  verifyCode,
  resendCode,
  loginUser,
  getCode,
  getTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction,
} = require("../controllers/api");

const { protectUser } = require("../middleware");

router.post("/signup", signupUser);
router.post("/verify-token", verifyCode);
router.post("/resend-code", resendCode);
router.post("/login", loginUser);
router.get("/get-code", getCode);
router.get("/transactions", protectUser, getTransactions);
router
  .route("/transaction")
  .post(protectUser, addTransaction)
  .patch(protectUser, updateTransaction)
  .delete(protectUser, deleteTransaction);

module.exports = router;
