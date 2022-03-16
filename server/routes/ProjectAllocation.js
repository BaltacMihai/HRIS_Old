const express = require("express");
const router = express.Router();
const projectAllocationController =
  require("./../controllers").ProjectAllocation;

//http://localhost:3031/api/project-allocation/user/1
router.get("/user/:userId", projectAllocationController.findUsersProjects);

module.exports = router;
