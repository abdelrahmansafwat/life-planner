const CronJob = require("cron").CronJob;
const scheduleModel = require("./models/schedule");
const dayjs = require("dayjs");
const nodemailer = require("nodemailer");
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Europe/London");

module.exports = async () => {
  let testAccount = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  let dailyReminder = new CronJob({
    cronTime: "00 00 09 * * *",
    onTick: function () {
      console.log("Hello");
      scheduleModel.find({}, (err, data) => {
        if (err) {
          res.status(500).json({
            message: err.message,
          });
          return;
        }
        data.forEach((value, index) => {
          //console.log(value);
          value.schedule.forEach(async (value, index) => {
            let schedule = [];
            if (dayjs(value.start).day() === dayjs().day()) {
              schedule.push(
                value.title +
                  " at " +
                  ("0" + dayjs(value.start).hour()).slice(-2) +
                  ":" +
                  ("0" + dayjs(value.start).minute()).slice(-2)
              );
            }

            if (schedule.length > 0) {
              let message =
                "<p>Hello!</p><p>Just wanted to remind you about today's schedule.</p>";

              schedule.forEach((value, index) => {
                message = message + "<p>" + value + "</p>";
              });

              let dailyEmail = await transporter.sendMail({
                from: '"Life Planner Bot" <bot@life-planner.com>',
                to: value.user_id,
                subject: "Daily Reminder",
                text: "Here's today's schedule",
                html: message,
              });
            }
          });
        });
      });
    },
    start: true,
    runOnInit: false,
    timeZone: "Europe/London",
  });

  let eventReminder = new CronJob({
    cronTime: "0 */30 * * * *",
    onTick: function () {
      let currentTime = dayjs();

      console.log("Hello");
      scheduleModel.find({}, (err, data) => {
        if (err) {
          res.status(500).json({
            message: err.message,
          });
          return;
        }
        data.forEach((value, index) => {
          //console.log(value);
          value.schedule.forEach(async (value, index) => {
            let schedule = [];
            if (
              dayjs(value.start).hour() === currentTime.hour() &&
              dayjs(value.start).minute() === currentTime.minute()
            ) {
              console.log("Send email to user");
              let event =
                value.title +
                " at " +
                ("0" + dayjs(value.start).hour()).slice(-2) +
                ":" +
                ("0" + dayjs(value.start).minute()).slice(-2);
              let message =
                "<p>Hello!</p><p>Just wanted to remind you about an event.</p>";
              message = message + "<p>" + event + "</p>";

              let eventEmail = await transporter.sendMail({
                from: '"Life Planner Bot" <bot@life-planner.com>',
                to: value.user_id,
                subject: "Event Reminder",
                text: "There's an event scheduled for now",
                html: message,
              });
            }
          });
        });
      });
    },
    start: true,
    runOnInit: false,
  });
};
