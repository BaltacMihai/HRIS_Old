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
router.get("/:type", eventAllocationController.findAllBySpecificEvent);

router.post("/post-free-day", eventAllocationController.postFreeDay);

router.post("/post", eventAllocationController.post);

router.get("/get/:eventId", eventAllocationController.findEventsById);
router.post("/post-username", eventAllocationController.postByUsername);
router.delete("/delete/:eventId/:userId", eventAllocationController.delete);

module.exports = router;
