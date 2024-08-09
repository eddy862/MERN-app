const User = require("../models/user.model");

exports.getUserInfo = async (req, res) => {
  const { user } = req.user;

  try {
    const isUser = await User.findById(user._id, {
      fullName: true,
      email: true,
      createdAt: true,
    });

    if (!isUser) {
      return res.status(400).json({ error: true, msg: "Unregistered user" });
    }

    return res.status(200).json({ error: false, user: isUser });
  } catch (err) {
    return res.status(500).json({ error: true, msg: err.message });
  }
}