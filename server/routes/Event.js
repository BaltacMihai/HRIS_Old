const express = require("express");
const router = express.Router();
const eventController = require("./../controllers").Event;

router.post("/post", eventController.postEvent);
router.get("/:type/:eventId", eventController.getEvent);
router.put("/put/label", eventController.putEventLabel);
router.post("/post-and-allocate", eventController.postEventAndAllocateOnIt);
router.delete("/delete/:eventId", eventController.deleteEvent);
router.put("/put", eventController.putEvent);

module.exports = router;
