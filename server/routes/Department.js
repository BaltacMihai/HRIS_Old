const express = require("express");
const router = express.Router();
const departmentController = require("./../controllers").Depatment;

router.get("/stats", departmentController.getStats);
router.get("/:departmentId", departmentController.getName);
router.get("/stats/:departmentId", departmentController.getCurrentStats);
router.post("/create", departmentController.create);
router.put("/put", departmentController.put);
router.delete("/delete/:departmentId", departmentController.delete);

module.exports = router;
