const {
  ACCESS_TOKEN_EXPIRE_TIME,
  REFRESH_TOKEN_EXPIRE_TIME,
} = require("../configs/route.config");
const User = require("../models/User.model");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

function generateAccessToken(id) {
  const token = jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET_KEY, {
    expiresIn: ACCESS_TOKEN_EXPIRE_TIME,
  });
  return token;
}

function generateRefreshToken(id) {
  const token = jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET_KEY, {
    expiresIn: REFRESH_TOKEN_EXPIRE_TIME,
  });
  return token;
}

function verifyAccessToken(req, res, next) {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res.status(401).send({ error: "Unauthorized" });
  }
  try {
    req.user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
    next();
  } catch (error) {
    console.log(error);
    if (error instanceof jwt.JsonWebTokenError)
      return res.status(403).send({ error: "Invalid token" });
    return res.status(400).send({ error: "Invalid request" });
  }
}

async function verifyRefreshToken(req, res, next) {
  const token = req.cookies?.refresh_token;
  if (!token) {
    return res.status(401).send({ error: "Unauthorize" });
  }
  try {
    const payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET_KEY);
    const user = await User.findById(payload.id);
    if (user.refreshToken !== token)
      return res.status(403).send({ error: "Invalid token" });
    req.payload = payload;
    next();
  } catch (error) {
    console.log(error);
    if (error instanceof jwt.JsonWebTokenError)
      return res.status(403).send({ error: "Invalid token" });
    return res.status(400).send({ error: "Invalid request" });
  }
}

function authorizeUser(req, res, next) {
  if (req.params.id !== req.user.id) {
    return res.status(403).send({ error: "Permission denined" });
  }
  next();
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  authorizeUser,
  verifyRefreshToken,
};
