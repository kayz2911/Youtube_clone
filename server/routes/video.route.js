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

//Add view
router.get(
  "/view/:id",
  routeValidator.validateIDParam,
  videoController.addView
);

//search video
router.get(
  "/search",
  routeValidator.validateSearchParams,
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
  authorizerService.verifyAccessToken,
  videoController.deleteVideo
);

//Get a Video
router.get("/:id", routeValidator.validateIDParam, videoController.getVideo);

module.exports = router;
