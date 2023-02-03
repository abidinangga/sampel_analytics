const Controller = require("../controller/customersController");
const express = require("express");
const router = express.Router();

router.get("/", Controller.showAll);


module.exports = router;
