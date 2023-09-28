const amqplib = require("amqplib");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const nameQueue = "send_email";

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  auth: {
    type: "OAuth2",
    user: process.env.MAIL_USERNAME,
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
  },
});

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
          const emailData = JSON.parse(content.toString());

          const options = {
            from: process.env.FROM_EMAIL,
            ...emailData,
          };

          // Send email
          await transporter.sendMail(options);
        } catch (error) {
          console.error("Error sending email:", error);
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

async function sendMail(data) {
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

module.exports = sendMail;
