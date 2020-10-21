const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/checkauth");
const {getTransactions,addTransactions,deleteTransactions} = require("../controllers/Transactions");


router.route("/").get(checkAuth, getTransactions).post(addTransactions);
router.route("/:id").delete(deleteTransactions);

module.exports = router ; 