const User = require("./models/User");

async function protectUser(req, res, next) {
  try {
    const id = req?.headers?.authorization;

    if (!id)
      return res.status(401).json({ status: 401, message: "Unauthorized" });

    const user = await User.findById(id);

    if (!user)
      return res.status(404).json({ status: 404, message: "User not found" });

    req.user = user;
    next();
  } catch (error) {
    console.log("protect-user", error);
  }
}

module.exports = { protectUser };
