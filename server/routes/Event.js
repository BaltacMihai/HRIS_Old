const express = require("express");
const router = express.Router();
const eventController = require("./../controllers").Event;

router.post("/post", eventController.postEvent);
router.get("/:type/:eventId", eventController.getEvent);
// {
//     "name": "Event",
// "projectId" : "1",
// "description": "CEVA",
// "departmentId": "1",
// "startingDate": "03-03-2022",
// "endingDate": "03-03-2022",
// "type": "MEETING"
// }
module.exports = router;
