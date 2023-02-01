const Video = require("../models/Video.model");
const User = require("../models/User.model");
const Comment = require("../models/Comment.model");
const { errorResponse } = require("../configs/route.config");

async function addComment(req, res, next) {
  const newComment = new Comment({ ...req.body, userId: req.user.id, videoId: req.params.videoId });
  try {
    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (error) {
    next(error);
  }
}

async function deleteComment(req, res, next) {
  try {
    const comment = await Comment.findById(req.params.id);
    const video = await Video.findById(req.params.id);
    if(req.user.id === comment.userId || req.user.id === video.userId) {
        await Comment.deleteById(req.params.id);
        res.status(204).json("The comment has been deleted");
    } else {
        return res.status(403).send("You can delete only your comment");
    }
  } catch (error) {
    next(error);
  }
}

async function getAllComments(req, res, next) {
  try {
    const comments = await Comment.find({videoId: req.params.videoId}).sort({createdAt: -1});
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  addComment,
  deleteComment,
  getAllComments,
};
