const Controller = require("../controller/transactionsController");
const express = require("express");
const router = express.Router();

router.get("/:id", Controller.showAll)
router.post("/addCart/:idCustomer", Controller.addCart)
router.post("/payment/:id",Controller.payment)


module.exports = router;
