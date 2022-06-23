const express = require("express");
const router = express.Router();
const departmentController = require("./../controllers").Depatment;

router.get("/stats", departmentController.getStats);

module.exports = router;
