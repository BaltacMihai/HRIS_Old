const express = require("express");
const router = express.Router();
const userController = require("./../controllers").User;

router.get("/:userId", userController.findById);

module.exports = router;
