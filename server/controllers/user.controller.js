const bcrypt = require("bcryptjs");
const User = require("../models/User.model");
const Video = require("../models/Video.model");
const createNotification = require("../services/rabbitmq/notification.service");

async function updateUser(req, res, next) {
  if (req.params.id === req.user.id) {
    const salt = bcrypt.genSaltSync(10);
    const dataUserUpdate = req.body;
    
    if (req.body.password) {
      const hashPassword = bcrypt.hashSync(req.body.password, salt);
      dataUserUpdate = { ...req.body, password: hashPassword };
    }

    try {
      const updateUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: dataUserUpdate,
        },
        { new: true }
      );
      return res.status(200).json(updateUser);
    } catch (error) {
      next(error);
    }
  } else {
    return res.status(403).send({ error: "You can update only your account" });
  }
}

async function deleteUser(req, res, next) {
  if (req.params.id === req.user.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      return res.status(200).json("User has been deleted");
    } catch (error) {
      next(error);
    }
  } else {
    return res.status(403).send({ error: "You can delete only your account" });
  }
}

async function findUser(req, res, next) {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

async function getUser(req, res, next) {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

async function subscribeUser(req, res, next) {
  try {
    const updateCurrentUser = User.findByIdAndUpdate(req.user.id, {
      $push: { subscribedUsers: req.params.id },
    });

    const updateTargetUser = User.findByIdAndUpdate(req.params.id, {
      $push: { subscribers: req.user.id },
    });

    const notificationContent = {
      userRequestId: req.user.id,
      userRecipientId: [req.params.id],
      typeNoti: 1,
    };

    createNotification(notificationContent);

    await Promise.all([
      updateCurrentUser,
      updateTargetUser,
    ]);

    res.status(200).json("subscribe successful");
  } catch (error) {
    next(error);
  }
}

async function unsubscribeUser(req, res, next) {
  try {
    const updateCurrentUser = User.findByIdAndUpdate(req.user.id, {
      $pull: { subscribedUsers: req.params.id },
    });

    const updateTargetUser = User.findByIdAndUpdate(req.params.id, {
      $pull: { subscribers: req.user.id },
    });

    await Promise.all([updateCurrentUser, updateTargetUser]);

    res.status(200).json("Unsubscribe successful");
  } catch (error) {
    next(error);
  }
}

async function likeVideo(req, res, next) {
  const userId = req.user.id;
  const videoId = req.params.videoId;
  try {
    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).send("Video not found");
    }

    if (video.likes.includes(userId)) {
      await Video.findByIdAndUpdate(videoId, {
        $pull: { likes: userId },
      });
    } else {
      await Video.findByIdAndUpdate(videoId, {
        $addToSet: { likes: userId },
        $pull: { dislikes: userId },
      });
    }

    res.status(200).send("The video has been liked");
  } catch (error) {
    next(error);
  }
}

async function dislikeVideo(req, res, next) {
  const userId = req.user.id;
  const videoId = req.params.videoId;
  try {
    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).send("Video not found");
    }

    if (video.dislikes.includes(userId)) {
      await Video.findByIdAndUpdate(videoId, {
        $pull: { dislikes: userId },
      });
    } else {
      await Video.findByIdAndUpdate(videoId, {
        $addToSet: { dislikes: userId },
        $pull: { likes: userId },
      });
    }

    res.status(200).send("The video has been disliked");
  } catch (error) {
    next(error);
  }
}

module.exports = {
  updateUser,
  deleteUser,
  findUser,
  getUser,
  subscribeUser,
  unsubscribeUser,
  likeVideo,
  dislikeVideo,
};
