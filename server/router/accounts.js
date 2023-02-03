const Controller = require("../controller/accountsController");
const express = require("express");
const router = express.Router();

router.get("/", Controller.showAll);
router.get("/:id", Controller.accountById);


module.exports = router;
