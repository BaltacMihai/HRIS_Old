const express = require("express");
const router = express.Router();
const departmentController = require("./../controllers").Depatment;

router.get("/stats", departmentController.getStats);
router.get("/:departmentId", departmentController.getName);
router.get("/stats/:departmentId", departmentController.getCurrentStats);
router.post("/create", departmentController.create);

module.exports = router;
