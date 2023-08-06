const express = require("express");
const authorizerService = require("../services/authorizer.service");
const notificationController = require("../controllers/notification.controller");

const router = express.Router();

//Get all notifications
router.get("/", 
  authorizerService.verifyAccessToken,
  notificationController.getAllNotifications,
);

//Get all notifications
router.put("/seenAllNotifications", 
  authorizerService.verifyAccessToken,
  notificationController.markSeenAllNotifications,
);

module.exports = router;
