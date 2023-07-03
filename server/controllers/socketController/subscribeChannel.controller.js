const User = require("../../models/User.model");
const socketUtils = require("../../socketUtils");

const handleSubscribeChannel = async (socket, data) => {
  const { user } = socketUtils.getUser(socket.id);
  const userSubscribeChannel = await User.findById(user._id);
  if (userSubscribeChannel) {
    const channelSubscribe = socketUtils.onlineUsers.find(
      (onlineUser) => onlineUser.user._id === data.channel._id
    );
    if (channelSubscribe) {
      socket.to(channelSubscribe.socketId).emit("getNotification", {
        userSendNotification: user,
        type: 1,
      });
    }
  }
};

module.exports = { handleSubscribeChannel };