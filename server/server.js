const http = require("http");
const app = require("./app");
const mongoService = require("./services/mongo.service");

const server = http.createServer(app);
const PORT = 8800;

mongoService.connect("youtube_clone");

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
