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
// {
//     "departmentId": "1",
// "startingDate" : "03-03-2022",
// "endingDate": "03-03-2022",
// "userId": 1
// }

router.post("/post", eventAllocationController.post);

// {
//     "userId": "1",
// "eventId" : "5"

// }

module.exports = router;
