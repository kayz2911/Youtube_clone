const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/user.route");
const videoRoutes = require("./routes/video.route");
const commentRoutes = require("./routes/comment.route");
const authRoutes = require("./routes/auth.route");
const errorHandler = require("./middlewares/errorHandler");
const { loadModel } = require("./services/classifyToxicComments.service");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

const modelVerifyToxicComment = async () => {
  try {
    const model = await loadModel();
    app.locals.toxicityModel = model;
  } catch (err) {
    console.error('Error loading model:', err);
  }
};

modelVerifyToxicComment();

app.use(
  cors({
    origin: process.env.CLIENT_DOMAIN,
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
  res.send("Youtube clone api");
});

module.exports = app;
