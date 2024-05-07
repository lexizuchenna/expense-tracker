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
  changePassword,
} = require("../controllers/api");

const { protectUser } = require("../middleware");

router.get("/get-code", getCode);
router.get("/transactions", protectUser, getTransactions);

router.post("/signup", signupUser);
router.post("/verify-token", verifyCode);
router.post("/resend-code", resendCode);
router.post("/login", loginUser);

router.post("/password", protectUser, changePassword);
router
  .route("/transaction")
  .post(protectUser, addTransaction)
  .patch(protectUser, updateTransaction)
  .delete(protectUser, deleteTransaction);

module.exports = router;
