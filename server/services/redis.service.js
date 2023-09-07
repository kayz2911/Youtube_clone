const redis = require("redis");

const config = {
  port: "6379",
  host: "127.0.0.1",
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
