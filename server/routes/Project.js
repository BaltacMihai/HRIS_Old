const express = require("express");
const router = express.Router();
const projectController = require("./../controllers").Project;

router.get(
  "/not-user/:id",
  projectController.findProjectsWhereUserIsntEnrolled
);

module.exports = router;
