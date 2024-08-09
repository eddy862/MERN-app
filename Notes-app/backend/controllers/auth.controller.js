const User = require("../models/user.model")
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  //check required fields are provided
  if (!fullName) {
    return res
      .status(400)
      .json({ error: true, msg: "Fullname should be provided." });
  }

  if (!email) {
    return res
      .status(400)
      .json({ error: true, msg: "Email should be provided." });
  }

  if (!password) {
    return res
      .status(400)
      .json({ error: true, msg: "Password should be provided." });
  }

  //check for existing email
  const isUser = await User.findOne({ email: email });

  if (isUser) {
    return res.status(400).json({ error: true, msg: "This email is taken." });
  }

  //create new user & send back jwt
  try {
    //hash the password
    const hashPwd = async (password) => {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      return hashedPassword;
    }

    const user = new User({
      fullName,
      email,
      password: await hashPwd(password),
    });

    await user.save();

    const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "36000m",
    });

    return res.status(201).json({
      error: false,
      user,
      accessToken,
      msg: "User registration successful",
    });
  } catch (err) {
    return res.status(500).json({ error: true, msg: err.message });
  }
}

exports.login = async (req, res) => {
  const { email, password } = req.body;

  //check for empty field
  if (!email) {
    return res
      .status(400)
      .json({ error: true, msg: "Email should be provided." });
  }

  if (!password) {
    return res
      .status(400)
      .json({ error: true, msg: "Password should be provided." });
  }

  //query db and return
  try {
    const userInfo = await User.findOne({ email: email });

    if (!userInfo) {
      return res.status(400).json({ error: true, msg: "Unregistered user" });
    }

    //if email exists then check if password correct
    if (await bcrypt.compare(password, userInfo.password)) {
      const user = { user: userInfo };
      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "36000m",
      });

      return res
        .status(200)
        .json({ error: false, email, accessToken, msg: "Login Successful" });
    } else {
      return res.status(400).json({ error: true, msg: "Incorrect password" });
    }
  } catch (err) {
    return res.status(500).json({ error: true, msg: err.message });
  }
}