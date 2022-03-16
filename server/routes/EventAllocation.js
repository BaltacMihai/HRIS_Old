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

module.exports = router;
