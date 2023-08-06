const Notification = require("../models/Notification.model");
const User = require("../models/User.model");
const { errorResponse } = require("../configs/route.config");

async function getAllNotifications(req, res, next) {
  try {
    const notifications = await Notification.aggregate([
      {
        $match: {
          userRecipientId: req.user.id,
        },
      },
      {
        $addFields: {
          userId: { $toObjectId: "$userRequestId" }, // Convert userRequestId to ObjectId
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userRequest",
        },
      },
      {
        $unwind: "$userRequest",
      },
      { $sort: { createdAt: -1 } },
    ]);

    res.status(200).json(notifications);
  } catch (error) {
    next(error);
  }
}

async function markSeenAllNotifications(req, res, next) {
  try {
    await Notification.updateMany(
      { userRecipientId: req.user.id },
      { $set: { seen: true } }
    );
    res.status(200).send("Seen all notification");
  } catch (error) {
    console.error("Error:", error);
  }
}

module.exports = {
  getAllNotifications,
  markSeenAllNotifications,
};
