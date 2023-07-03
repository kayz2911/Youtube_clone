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
      { $limit: 5 },
    ]);
    res.status(200).json(notifications);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllNotifications,
};
