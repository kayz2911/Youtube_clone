const express = require("express");
const authorizerService = require("../services/authorizer.service");
const commentController = require("../controllers/comment.controller");

const router = express.Router();

//Add comment
router.post(
  "/addComment/:videoId",
  authorizerService.verifyAccessToken,
  commentController.addComment
);

//Delete comment
router.delete(
  "/:id",
  authorizerService.verifyAccessToken,
  commentController.deleteComment
);

//Get all comments
router.get("/:videoId", commentController.getAllComments);

module.exports = router;
