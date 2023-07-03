let onlineUsers = [];

const addUser = (user, socketId) => {
  !onlineUsers.some((onlineUser) => onlineUser.socketId === socketId) &&
    onlineUsers.push({ user, socketId });
};

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter(
    (onlineUser) => onlineUser.socketId !== socketId
  );
};

const getUser = (socketId) => {
  return onlineUsers.find((onlineUser) => onlineUser.socketId === socketId);
};

module.exports = { onlineUsers, addUser, removeUser, getUser };