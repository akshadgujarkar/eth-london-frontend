const express = require("express");
const router = express.Router();
const { CronJob } = require("cron");
const { sendEmail } = require("../helpers/mail");
const axios = require("axios");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/schedule", function (req, res, next) {
  const { transactionId, duration } = req.body;
  var runCount = 0;

  const job = new CronJob(`*/${duration} * * * * *`, () => {
    // Stop the job after running once
    if (runCount === 0) job.stop();

    console.log(
      `${
        runCount + 1
      }. Running API for transaction ID: ${transactionId} every ${duration} seconds`
    );

    getTxnStatus({
      hash: transactionId,
      duration: duration,
      runCount: runCount,
    });

    // sendEmail(
    //   process.env.EMAIL,
    //   `${
    //     runCount + 1
    //   }. Running API for transaction ID: ${transactionId} every ${duration} seconds`
    // );

    runCount++;
  });

  job.start();

  res.status(200).json({
    message: `Monitoring scheduled for transaction ID: ${transactionId}`,
  });
});

async function getTxnStatus({ hash, duration, runCount }) {
  const etherscanUrl = `https://api-sepolia.etherscan.io/api?`;
  const url = `${etherscanUrl}module=transaction&action=gettxreceiptstatus&txhash=${hash}&apikey=${process.env.ETHERSCAN_API_KEY}`;

  const res = await axios.get(url);
  const data = await res.data;

  const isSuccess = data.result.status === "1";

  sendEmail(
    process.env.EMAIL,
    `${
      runCount + 1
    }. Running API for transaction ID: ${hash} every ${duration} seconds
    
    Transaction status - ${isSuccess ? "Success" : "Failed"}
    `
  );

  // {
  //   status: string;
  //   message: string;
  //   result: { status: "0" | "1" };
  // };
}

module.exports = router;
