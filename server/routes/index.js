const express = require("express");
const router = express.Router();

// we get our routers

const departmentRouter = require("./Department");
const eventRouter = require("./Event");
const EventAllocationRouter = require("./EventAllocation");
const projectRouter = require("./Project");
const projectAllocationRouter = require("./ProjectAllocation");
const userRouter = require("./User");

router.use("/departments", departmentRouter);
router.use("/events", eventRouter);
router.use("/events-allocation", EventAllocationRouter);
router.use("/projects", projectRouter);
router.use("/project-allocation", projectAllocationRouter);
router.use("/users", userRouter);

module.exports = router;
