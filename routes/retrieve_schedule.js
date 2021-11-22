const express = require('express');
const router = express.Router();
const scheduleModel = require("../models/schedule");
const path = require("path");

//Specific schedule route
router.post('/specific', async (req, res) => {
    scheduleModel.find({user_id: req.body.user_id}, (err, data) => {
        if (err) {
            res.status(500).json({
              message: err.message,
            });
            return;
        }
        res.status(200).json({
            message: "Retrieved specific schedule",
            data
        });
    })
});

module.exports = router;