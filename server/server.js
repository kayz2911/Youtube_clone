const http = require("http");
const app = require("./app");
const mongoService = require("./services/mongo.service");
const { Server } = require("socket.io");
const socketUtils = require("./socketUtils");
const uploadVideoController = require("./controllers/socketController/uploadVideo.controller");
const subscribeChannelController = require("./controllers/socketController/subscribeChannel.controller");
const dotenv = require("dotenv");
dotenv.config();

const server = http.createServer(app);

const allowedOrigins = [
  process.env.CLIENT_DOMAIN
];

//Create socket io server
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
  },
});

io.on("connection", (socket) => {
  const { currentUser } = socket.handshake.query;
  const user = JSON.parse(currentUser);
  socketUtils.addUser(user, socket.id);

  socket.on("uploadVideo", async () => {
    uploadVideoController.handleUploadVideo(socket);
  });
  
  socket.on("subscribeChannel", async (data) => {
    subscribeChannelController.handleSubscribeChannel(socket, data);
  });

  socket.on("disconnect", () => {
    socketUtils.removeUser(socket.id);
  });
});

const PORT = 8800;

mongoService.connect("youtube_clone");

server.listen(process.env.PORT || PORT, () => {
  console.log(`Server is running at http://localhost:${process.env.PORT}`);
});
