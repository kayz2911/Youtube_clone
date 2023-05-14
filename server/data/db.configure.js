const dotenv = require("dotenv");
dotenv.config();

const BASE_URL = process.env.BASE_URL;
const BASE_VIDEO_URL = process.env.BASE_VIDEO_URL;
const API_KEY = process.env.API_KEY;

module.exports = {
  BASE_URL,
  BASE_VIDEO_URL,
  API_KEY,
};
