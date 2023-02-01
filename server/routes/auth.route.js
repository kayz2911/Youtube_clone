const express = require("express");
const cookieParser = require("cookie-parser");
const authorizerService = require("../services/authorizer.service");
const authController = require("../controllers/auth.controller");

const router = express.Router();

router.use(cookieParser());

//CREATE A USER
router.post(
  "/register",
  authController.validateRegisterInput,
  authController.registerUser
);

//SIGN IN
router.post(
  "/login",
  authController.authenticateUser,
  authController.handleLoginUser
);

router.get(
  "/refresh_token",
  authorizerService.verifyRefreshToken,
  authController.handleRefreshToken
);

//Logout
router.post(
  "/logout",
  authorizerService.verifyRefreshToken,
  authController.handleLogout
);

//GOOGLE AUTH
router.post("/google");

router.get("/authorize", authorizerService.verifyAccessToken, (req, res) => {
  res.send("Authorize success");
});

module.exports = router;
