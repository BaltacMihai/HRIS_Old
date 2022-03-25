const express = require("express");
const router = express.Router();
const eventAllocationController = require("./../controllers").EventAllocation;

router.get(
  "/:userId/:startingDate/:endingDate",
  eventAllocationController.findEventsByIntervalAndUser
);

router.get(
  "/:userId/:startingDate/:endingDate/:type",
  eventAllocationController.findSpecificEventsByIntervalAndUser
);

router.post("/post-free-day", eventAllocationController.postFreeDay);
module.exports = router;
