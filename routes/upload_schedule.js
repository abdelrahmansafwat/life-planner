const express = require("express");
const router = express.Router();
const scheduleModel = require("../models/schedule");

//New schedule route
router.post("/new", async (req, res) => {
  let schedule = req.body.schedule;

  let newSchedule = new scheduleModel({
    schedule: req.body.schedule,
    user_id: req.body.user_id
  });

  newSchedule.save((err, data) => {
    if (err) {
      res.status(500).json({
        message: err.message,
      });
    } else {
      res.status(200).json({
        message: "Schedule saved",
      });
    }
  });
});

//Update schedule route
router.post("/update", async (req, res) => {
  let schedule = req.body.schedule;

  let newSchedule = await scheduleModel.findOneAndUpdate(
    { _id: req.body._id },
    {
      schedule: req.body.schedule,
      user_id: req.body.user_id
    },
    { new: true }
  );

  newSchedule.save((err, data) => {
    if (err) {
      res.status(500).json({
        message: err.message,
      });
    }
    res.status(200).json({
      message: "Schedule saved",
    });
  });
});

//Delete schedule route
router.post("/delete", async (req, res) => {
  scheduleModel.deleteOne({ _id: req.body._id }, function (err) {
    if (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  });
});

module.exports = router;
