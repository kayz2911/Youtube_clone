const User = require("../../models/User.model");
const socketUtils = require("../../socketUtils");

const handleUploadVideo = async (socket) => {
  const { user } = socketUtils.getUser(socket.id);
  const userUploadVideo = await User.findById(user._id);
  if (userUploadVideo) {
    const userSubscribeChannel = socketUtils.onlineUsers.filter((onlineUser) =>
      userUploadVideo.subscribers.includes(onlineUser.user._id)
    );
    if (userSubscribeChannel.length !== 0) {
      socket
        .to(userSubscribeChannel.map((element) => element.socketId))
        .emit("getNotification", {
          userSendNotification: user,
          type: 0,
        });
    }
  }
};

module.exports = { handleUploadVideo };