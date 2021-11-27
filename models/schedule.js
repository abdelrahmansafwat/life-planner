require("dotenv").config();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.connect(process.env.MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true });

let scheduleSchema = new Schema({
    schedule: { type: [Object], required: true },
    user_id: { type: String, required: true },
});

let scheduleModel = mongoose.model("scheduleModel", scheduleSchema);

module.exports = scheduleModel;