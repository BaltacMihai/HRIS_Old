const express = require("express");
const router = express.Router();
const projectController = require("./../controllers").Project;

router.get(
  "/not-user/:id",
  projectController.findProjectsWhereUserIsntEnrolled
);
router.get("/user/:id", projectController.findProjectsWhereUserIsEnrolled);

router.get("/:projectId", projectController.findProjects);
router.get(
  "/:projectId/departments",
  projectController.findProjectsDepartments
);

module.exports = router;
