const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

async function sendEmail(recepient, text) {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL,
      to: [recepient],
      subject: "Monitor Alert for Arbitrum Txn",
      text: text,
    });

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.log("Error sending email: ", error.message);
  }
}

module.exports = { sendEmail };
