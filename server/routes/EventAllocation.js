const express = require("express");
const router = express.Router();
const eventAllocationController = require("./../controllers").EventAllocation;

//http://localhost:3031/api/events-allocation/1/2022-03-15/2022-03-18
router.get(
  "/:userId/:startingDate/:endingDate",
  eventAllocationController.findEventsByIntervalAndUser
);

module.exports = router;
