const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  //ensure the whole authorization value and the second part of the value is not undefined
  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return res.status(401).send({ error: true, msg: "Token not found" });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err)
      return res.status(401).send({ error: true, msg: "Unauthorized user" });

    req.user = user;
    next();
  });
};

module.exports = { authenticateToken };
