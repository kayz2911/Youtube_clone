const CronJob = require("node-cron");
const Video = require("../models/Video.model");
const { redisClient } = require("../services/redis.service");

const syncTotalViewVideo = () => {
  CronJob.schedule("*/10 * * * * *", async () => {
    try {
      const videoKeys = await redisClient.keys("video::*");
      if (videoKeys) {
        for (const key of videoKeys) {
          const videoId = key.split("::")[1];
          const views = await redisClient.get(key);

          if (views !== null) {
            await Video.updateOne({ _id: videoId }, { views: parseInt(views) });
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  });
};

module.exports = {
  syncTotalViewVideo,
};
