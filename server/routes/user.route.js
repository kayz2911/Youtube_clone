const express = require("express");
const authorizerService = require("../services/authorizer.service");
const routeValidator = require("../validators/route.validator");
const userController = require("../controllers/user.controller");

const router = express.Router();

//Update user
router.put(
  "/:id",
  authorizerService.verifyAccessToken,
  userController.updateUser
);

//Delete user
router.delete(
  "/:id",
  authorizerService.verifyAccessToken,
  userController.deleteUser
);

//get a user
router.get(
  "/find/:id",
  routeValidator.validateIDParam,
  userController.findUser
);

router.get(
  "/:id",
  authorizerService.verifyAccessToken,
  routeValidator.validateIDParam,
  userController.getUser
);

//subscribe a user
router.put(
  "/subscribe/:id",
  authorizerService.verifyAccessToken,
  userController.subscribeUser
);

//unsubscribe a user
router.put(
  "/unsubscribe/:id",
  authorizerService.verifyAccessToken,
  userController.unsubscribeUser
);

//like a video
router.put(
  "/like/:videoId",
  authorizerService.verifyAccessToken,
  userController.likeVideo
);

//dislike a video
router.put(
  "/dislike/:videoId",
  authorizerService.verifyAccessToken,
  userController.dislikeVideo
);

module.exports = router;
