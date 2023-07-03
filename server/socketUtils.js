let socketUtils = {
  onlineUsers: [],

  addUser(user, socketId) {
    !this.onlineUsers.some((onlineUser) => onlineUser.user.email === user.email) &&
      this.onlineUsers.push({ user, socketId });
  },

  removeUser(socketId) {
    this.onlineUsers = this.onlineUsers.filter(
      (onlineUser) => onlineUser.socketId !== socketId
    );
  },

  getUser(socketId) {
    return this.onlineUsers.find(
      (onlineUser) => onlineUser.socketId === socketId
    );
  },
};

module.exports = socketUtils;
