const bcrypt = require("bcryptjs");
const User = require("../models/User.model");
const {
  errorResponse,
  REFRESH_TOKEN_EXPIRE_TIME,
} = require("../configs/route.config");
const authorizerService = require("../services/authorizer.service");

const tokenCookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "None",
  maxAge: REFRESH_TOKEN_EXPIRE_TIME * 1000, // in ms
};

const USERNAME_REGEX = /^[a-zA-Z0-9]{4,14}$/;
const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const PASSWORD_REGEX = /^[^\s]{6,}$/;

async function validateRegisterInput(req, res, next) {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).send(errorResponse.MISSING_USER_REGISTER_FIELDS);

  if (!USERNAME_REGEX.test(name))
    return res.status(400).send(errorResponse.INVALID_USERNAME);

  if (!EMAIL_REGEX.test(email))
    return res.status(400).send(errorResponse.INVALID_EMAIL);

  if (!PASSWORD_REGEX.test(password))
    return res.status(400).send(errorResponse.INVALID_PASSWORD);

  next();
}

async function registerUser(req, res, next) {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hashPassword });

    await newUser.save();
    res.status(201).send("User has been created");
  } catch (err) {
    next(err);
  }
}

async function authenticateUser(req, res, next) {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).send(errorResponse.MISSING_USER_LOGIN_FIELDS);

  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(401).send(errorResponse.WRONG_EMAIL_PASSWORD);
  }

  const isCorrectPassword = bcrypt.compareSync(password, user.password);
  if (!isCorrectPassword) {
    return res.status(401).send(errorResponse.WRONG_EMAIL_PASSWORD);
  }

  req.user = user;
  next();
}

async function handleLoginUser(req, res, next) {
  try {
    const user = req.user;
    const accessToken = authorizerService.generateAccessToken(user._id);

    const refreshToken = authorizerService.generateRefreshToken(user._id);

    const updatedUser = await User.findByIdAndUpdate(user._id, {
      refreshToken,
    });
    const { refreshToken: token, ...response } = updatedUser.toObject();

    response.accessToken = accessToken;
    res.cookie("refresh_token", refreshToken, tokenCookieOptions);
    return res.status(200).send(response);
  } catch (error) {
    next(error);
  }
}

async function handleRefreshToken(req, res) {
  const { id } = req.payload; // from verifyRefreshToken() middleware
  const accessToken = authorizerService.generateAccessToken(id);
  return res.status(200).send({ accessToken });
}

async function handleLogout(req, res, next) {
  try {
    await User.findByIdAndUpdate(req.payload.id, { refreshToken: "" });
    res.clearCookie("refresh_token", tokenCookieOptions);
    return res.status(200).send({ message: "User has been logged out" });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  validateRegisterInput,
  registerUser,
  authenticateUser,
  handleLoginUser,
  handleRefreshToken,
  handleLogout,
};
