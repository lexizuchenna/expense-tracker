const bcrypt = require("bcryptjs");

const User = require("../models/User");
const Token = require("../models/Token");
const Transaction = require("../models/Transaction");

const { checkEmail, sendMail } = require("../utils");

async function signupUser(req, res) {
  try {
    const { name, email, password } = req.body;

    if (Object.values(req.body).includes(""))
      return res.status(400).json({ status: 400, message: "Fill all fields" });

    const isEmailValid = checkEmail(email);

    if (!isEmailValid)
      return res.status(400).json({ status: 400, message: "Invalid email" });

    const isEmailUsed = await User.findOne({ email });

    if (isEmailUsed)
      return res
        .status(400)
        .json({ status: 400, message: "Email already used" });

    const salt = await bcrypt.genSalt();

    const hashedPwd = await bcrypt.hash(password, salt);

    const user = await User.create({ name, email, password: hashedPwd });

    const token = await Token.create({ user: user.id });

    await sendMail(
      "Trakrr",
      "Verify Trakrr",
      user.email,
      "",
      `Welcome to Trakrr, use the code ${token.token} to verify your account`
    );

    return res.status(201).json({
      status: 201,
      message: "Account created",
      user,
      token,
    });
  } catch (error) {
    console.log("signup", error);
    return res
      .status(500)
      .json({ status: 500, message: "Internal sever error" });
  }
}

async function verifyCode(req, res) {
  try {
    const { token, id, tokenId } = req.body;

    const data = await Token.findById(tokenId);

    if (!data)
      return res
        .status(200)
        .json({ status: 401, message: "Invalid token or expired token" });

    const current = new Date();

    if (current > Date.expiresAt) {
      await Token.findByIdAndDelete(data._id);
      return res
        .status(200)
        .json({ status: 401, message: "Invalid token or expired token" });
    }

    if (data.token !== token)
      return res
        .status(200)
        .json({ status: 401, message: "Invalid token or expired token" });

    await User.findByIdAndUpdate(id, { verified: true });
    await Token.findByIdAndDelete(tokenId);

    res.status(200).json({ status: 200, message: "User verified" });
  } catch (error) {
    console.error("verify-token: ", error);
    return res
      .status(500)
      .json({ message: "Internal server error", status: 500 });
  }
}

async function resendCode(req, res) {
  try {
    const { id, email } = req.body;

    await Token.findOneAndDelete({ user: id });

    const token = await Token.create({ user: id });

    await sendMail(
      "Trakrr",
      "Verify Trakrr",
      email,
      "",
      `Welcome to Trakrr, use the code ${token.token} to verify your account`
    );

    return res.status(201).json({
      message: "Code sent, check your mail",
      status: 201,
      data: { token },
    });
  } catch (error) {
    console.error("new-code", error);
    return res
      .status(500)
      .json({ message: "Internal server error", status: 500 });
  }
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!email)
      return res.status(200).json({ message: "User not found", status: 400 });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(200).json({ message: "Invalid password", status: 403 });

    if (!user.verified)
      return res
        .status(200)
        .json({ message: "Account not verified", status: 403 });

    return res
      .status(200)
      .json({ message: "Login success", user, status: 200 });
  } catch (error) {
    console.error("login-user: ", error);
    return res
      .status(500)
      .json({ message: "Internal server error", status: 500 });
  }
}

async function getCode(req, res) {
  try {
    const { email } = req.query;

    const user = await User.findOne({ email });

    const token = await Token.findOne({ user: user._id });

    return res.status(200).json({ message: "", user, token, status: 200 });
  } catch (error) {
    console.error("get-code: ", error);
    return res
      .status(500)
      .json({ message: "Internal server error", status: 500 });
  }
}

async function addTransaction(req, res) {
  try {
    if (Object.values(req.body).includes(""))
      return res.status(200).json({ message: "Fill all fields", status: 400 });

    const { id } = req.user;

    const transaction = await Transaction.create({
      ...req.body,
      user: id,
      createdAt: req.body.date,
    });

    return res
      .status(200)
      .json({ message: "Transaction added", transaction, status: 200 });
  } catch (error) {
    console.error("create-trx: ", error);
    return res
      .status(500)
      .json({ message: "Internal server error", status: 500 });
  }
}

async function updateTransaction(req, res) {
  try {
    if (Object.values(req.body).includes(""))
      return res.status(200).json({ message: "Fill all fields", status: 400 });

    const { id } = req.user;

    const transaction = await Transaction.findByIdAndUpdate(
      req.body.id,
      {
        ...req.body,
        createdAt: req.body.date,
      },
      { new: true }
    );

    return res
      .status(200)
      .json({ message: "Transaction updated", transaction, status: 200 });
  } catch (error) {
    console.error("create-trx: ", error);
    return res
      .status(500)
      .json({ message: "Internal server error", status: 500 });
  }
}

async function deleteTransaction(req, res) {
  try {
    const { trx_id } = req.query;

    console.log(trx_id);

    const transaction = await Transaction.findByIdAndDelete(trx_id);

    return res
      .status(200)
      .json({ message: "Transaction updated", transaction, status: 200 });
  } catch (error) {
    console.error("create-trx: ", error);
    return res
      .status(500)
      .json({ message: "Internal server error", status: 500 });
  }
}

async function getTransactions(req, res) {
  try {
    const { id } = req.user;

    const transactions = await Transaction.find({ user: id }).sort({
      createdAt: -1,
    });

    return res.status(200).json({ message: "", transactions, status: 200 });
  } catch (error) {
    console.error("get-transactinos: ", error);
    return res
      .status(500)
      .json({ message: "Internal server error", status: 500 });
  }
}

async function changePassword(req, res) {
  try {
    const { old_password, password, password2 } = req.body;

    const { id, password: pwd } = req.user;

    if (Object.values(req.body).includes(""))
      return res.status(200).json({ message: "Enter all fields", status: 403 });

    const isMatch = await bcrypt.compare(old_password, pwd);

    if (!isMatch)
      return res.status(200).json({ message: "Invalid password", status: 403 });

    if (password !== password2)
      return res
        .status(200)
        .json({ message: "Passwords do not match", status: 403 });

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.findByIdAndUpdate(id, { password: hashedPassword });

    return res.status(200).json({
      message: "Password changed",
      password: hashedPassword,
      status: 200,
    });
  } catch (error) {
    console.error("change-password: ", error);
    return res
      .status(500)
      .json({ message: "Internal server error", status: 500 });
  }
}

module.exports = {
  signupUser,
  verifyCode,
  resendCode,
  loginUser,
  getCode,
  addTransaction,
  updateTransaction,
  deleteTransaction,
  getTransactions,
  changePassword,
};
