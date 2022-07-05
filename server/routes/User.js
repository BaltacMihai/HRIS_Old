const express = require("express");
const router = express.Router();
const userController = require("./../controllers").User;

router.get("/:userId", userController.findById);
router.put("/put", userController.put);
router.get("/login/:username/:password", userController.login);
router.get("/", userController.getAll);
router.get("/department/:departmentId", userController.getAllDepartment);
router.get("/report/:userId", userController.getStats);
router.get("/report/:userId/last", userController.getStatsLastMonth);
router.post("/create", userController.create);

module.exports = router;
