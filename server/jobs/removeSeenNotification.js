const CronJob = require("node-cron");
const Notification = require("../models/Notification.model");

const removeSeenNotifcation = () => {
  CronJob.schedule("0 0 * * *", async () => {
    try {
      await Notification.deleteMany({
        seen: true
      });
    } catch (error) {
      console.error("Error while removing seen notifications:", error);
    }
  });
};

module.exports = {
  removeSeenNotifcation,
};
