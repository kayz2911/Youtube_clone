const express = require("express");
const authorizerService = require("../services/authorizer.service");
const routeValidator = require("../validators/route.validator");
const videoController = require("../controllers/video.controller");

const router = express.Router();

//Trending Video
router.get(
  "/trending",
  routeValidator.validatePageParam,
  videoController.trendingVideo
);

//Get random Video
router.get(
  "/random",
  routeValidator.validatePageParam,
  videoController.randomVideo
);

//get video by tag
router.get(
  "/tags",
  routeValidator.validatePageParam,
  videoController.getVideoByTag
);

//Get all subscribe Video
router.get(
  "/subscribeVideo",
  authorizerService.verifyAccessToken,
  videoController.subscribeVideo
);

//Get my video
router.get(
  "/myVideo",
  authorizerService.verifyAccessToken,
  videoController.myVideo
);

//Get liked video
router.get(
  "/likedVideo",
  authorizerService.verifyAccessToken,
  videoController.likedVideo
);

//Add view
router.get(
  "/view/:id",
  routeValidator.validateIDParam,
  authorizerService.verifyAccessToken,
  videoController.addView
);

//search video
router.get(
  "/search",
  routeValidator.validateSearchParams,
  routeValidator.validatePageParam,
  videoController.searchVideo
);

//Create Video
router.post(
  "/createVideo",
  authorizerService.verifyAccessToken,
  videoController.addVideo
);

//Update Video
router.put(
  "/:id",
  authorizerService.verifyAccessToken,
  videoController.updateVideo
);

//Delete Video
router.delete(
  "/:id",
  videoController.deleteVideo
);

//Get a Video
router.get("/:id", routeValidator.validateIDParam, videoController.getVideo);

module.exports = router;
