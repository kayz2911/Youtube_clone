const CronJob = require("node-cron");
const Notification = require("../models/Notification.model");

const removeSeenNotifcation = () => {
  CronJob.schedule("0 0 * * *", async () => {
    try {
      const oneDayAgo = new Date();
      oneDayAgo.setDate(oneDayAgo.getDate() - 1);

      await Notification.deleteMany({
        seen: true,
        updatedAt: { $lte: oneDayAgo },
      });
    } catch (error) {
      console.error("Error while removing seen notifications:", error);
    }
  });
};

module.exports = {
  removeSeenNotifcation,
};
