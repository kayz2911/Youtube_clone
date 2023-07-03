const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    idFromYTB: {
      type: String,
    },
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    img: {
      type: String,
    },
    subscribers: {
      type: [String],
    },
    subscribedUsers: {
      type: [String],
    },
    refreshToken: { type: String },
    resetPasswordToken: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
