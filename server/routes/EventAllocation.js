const express = require("express");
const router = express.Router();
const eventAllocationController = require("./../controllers").EventAllocation;

router.get(
  "/:userId/:startingDate/:endingDate",
  eventAllocationController.findEventsByIntervalAndUser
);

module.exports = router;
