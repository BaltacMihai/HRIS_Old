const express = require("express");
const router = express.Router();
const projectAllocationController =
  require("./../controllers").ProjectAllocation;

router.get("/user/:userId", projectAllocationController.findUsersProjects);

module.exports = router;
