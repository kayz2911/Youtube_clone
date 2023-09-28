const amqplib = require("amqplib");
const Notification = require("../../models/Notification.model");
const dotenv = require("dotenv");
dotenv.config();

const nameQueue = "create_notifications";

const execute = async () => {
  try {
    const conn = await amqplib.connect(process.env.RABBIT_MQ_CONNECTION);
    const channel = await conn.createChannel();

    await channel.assertQueue(nameQueue, {
      durable: false,
    });

    await channel.consume(
      nameQueue,
      async (msg) => {
        try {
          const content = msg?.content || "";
          const data = JSON.parse(content.toString());

          // Create an array of promises for creating notifications
          const notificationPromises = data.userRecipientId.map((subscriber) =>
            Notification.create({
              userRequestId: data.userRequestId,
              userRecipientId: subscriber,
              typeNoti: data.typeNoti,
            })
          );

          // Wait for all notification promises to resolve
          await Promise.all(notificationPromises);
        } catch (error) {
          console.error("Error create notification queue:", error);
        }
      },
      {
        noAck: true,
      }
    );
  } catch (error) {
    console.log(error);
  }
};

async function createNotification(data) {
  try {
    const conn = await amqplib.connect(process.env.RABBIT_MQ_CONNECTION);
    const channel = await conn.createChannel();

    await channel.assertQueue(nameQueue, {
      durable: false,
    });

    // Send data to the queue
    const queued = channel.sendToQueue(
      nameQueue,
      Buffer.from(JSON.stringify(data))
    );

    return queued;
  } catch (error) {
    console.error("Error sending data to queue:", error);
    return false;
  }
}

execute();

module.exports = createNotification;
