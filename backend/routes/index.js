const express = require("express");
const router = express.Router();
const { CronJob } = require("cron");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/schedule", function (req, res, next) {
  const { transactionId, duration } = req.body;
  var runCount = 0;

  const job = new CronJob(`*/${duration} * * * * *`, () => {
    if (runCount === 2) job.stop();

    console.log(
      `${
        runCount + 1
      }. Running API for transaction ID: ${transactionId} every ${duration} seconds`
    );

    runCount++;
  });

  job.start();

  res.status(200).json({
    message: `Monitoring scheduled for transaction ID: ${transactionId}`,
  });
});

module.exports = router;
