const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema(
  {
    userRequestId: {
      type: String,
      require: true,
    },
    userRecipientId: {
      type: String,
      require: true,
    },
    seen: {
      type: Boolean,
      default: false,
    },
    typeNoti: {
      type: Number, //0: upload video , 1: subscribe
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", NotificationSchema);
