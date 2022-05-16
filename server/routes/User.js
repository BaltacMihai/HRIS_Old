const express = require("express");
const router = express.Router();
const userController = require("./../controllers").User;

router.get("/:userId", userController.findById);
router.put("/put", userController.put);
router.get("/login/:username/:password", userController.login);

module.exports = router;
