const express = require("express");
const router = express.Router();
const projectAllocationController =
  require("./../controllers").ProjectAllocation;

router.get("/user/:userId", projectAllocationController.findUsersProjects);
router.get(
  "/:projectId/department/:departmentId",
  projectAllocationController.findDepartmentProject
);

module.exports = router;
