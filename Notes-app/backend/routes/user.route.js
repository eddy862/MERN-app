const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middlewares/authToken");
const { getUserInfo } = require("../controllers/user.controller");

router.use(authenticateToken);

router.get("/", getUserInfo);

module.exports = router;
