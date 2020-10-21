const express = require("express");
const router = express.Router();
const { addUser, signUser } = require("../controllers/User");

router.route("/signup").post(addUser);
router.route("/signin").post(signUser);


module.exports = router; 