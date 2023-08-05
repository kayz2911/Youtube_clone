const Notification = require("../models/Notification.model");
const User = require("../models/User.model");
const { errorResponse } = require("../configs/route.config");

async function markNotificationsAsSeen(notificationIds) {
  try {
    await Notification.updateMany(
      { _id: { $in: notificationIds } },
      { $set: { seen: true } }
    );
  } catch (error) {
    console.error("Error:", error);
  }
}

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

    const notificationIdsToUpdate = notifications.map(
      (notification) => notification._id
    );

    // Call the update function without awaiting
    markNotificationsAsSeen(notificationIdsToUpdate);

    res.status(200).json(notifications);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllNotifications,
};
