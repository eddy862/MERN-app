const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middlewares/authToken");
const { getUserInfo, updateUserInfo } = require("../controllers/user.controller");

router.use(authenticateToken);

router.get("/", getUserInfo);
router.patch("/", updateUserInfo)

module.exports = router;
