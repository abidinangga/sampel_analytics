const express = require("express");
const router = express.Router();
const accounts = require("./accounts");
const customers = require("./customers");
const transactions = require("./transactions")

router.use("/accounts", accounts);
router.use("/transactions",transactions)
router.use("/customers", customers);

module.exports = router;
