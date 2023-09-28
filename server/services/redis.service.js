const redis = require("redis");
const dotenv = require("dotenv");
dotenv.config();

const config = {
  url: process.env.REDIS_CONNECTION
};

const redisClient = redis.createClient(config);

const connect = async () => {
  try {
    await redisClient.connect();
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  connect,
  redisClient,
};
