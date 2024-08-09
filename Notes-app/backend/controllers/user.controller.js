const User = require("../models/user.model");
const bcrypt = require("bcrypt");

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
};

exports.updateUserInfo = async (req, res) => {
  const { fullName, email, password } = req.body;
  const { user } = req.user;

  if (!(fullName || email || password)) {
    return res.status(400).json({ error: true, msg: "No changes provided" });
  }

  try {
    //check for existing email
    const isUser = await User.findOne({ email: email });

    if (isUser) {
      return res.status(400).json({ error: true, msg: "This email is taken." });
    }

    //find and update
    const onUser = await User.findById(user._id);

    if (!onUser) {
      return res.status(400).json({ error: true, msg: "User not found" });
    }

    const hashPwd = async (password) => {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      return hashedPassword;
    };

    if (fullName) onUser.fullName = fullName;
    if (email) onUser.email = email;
    if (password) onUser.password = await hashPwd(password);

    await onUser.save();

    return res
      .status(200)
      .json({ error: false, user: onUser, msg: "User info updated successfully" });
  } catch (err) {
    return res.status(500).json({ error: true, msg: err.message });
  }
};
