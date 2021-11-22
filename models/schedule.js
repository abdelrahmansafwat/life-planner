require("dotenv").config();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.connect(process.env.MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true });

let scheduleSchema = new Schema({
    monday: { type: [Object], required: true },
    tuesday: { type: [Object], required: true },
    wednesday: { type: [Object], required: true },
    thursday: { type: [Object], required: true },
    friday: { type: [Object], required: true },
    saturday: { type: [Object], required: true },
    sunday: { type: [Object], required: true },
});

let scheduleModel = mongoose.model("scheduleModel", scheduleSchema);

module.exports = scheduleModel;