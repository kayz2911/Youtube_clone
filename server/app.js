const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/user.route");
const videoRoutes = require("./routes/video.route");
const commentRoutes = require("./routes/comment.route");
const authRoutes = require("./routes/auth.route");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes);

app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Movie streaming api");
});

module.exports = app;
