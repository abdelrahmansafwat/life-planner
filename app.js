require("dotenv").config();
const express = require("express");
const cors = require('cors');
const app = express();
const user = require("./routes/user")
const retrieve_schedule = require("./routes/retrieve_schedule")
const upload_schedule = require("./routes/upload_schedule")
const path = require("path");
require('./email-cron')();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "client", "build")));
app.use(express.static("public"));

//Initializing routes
app.use('/api/user', user);     //Route for all user related functions (Login, register, etc.)
app.use('/api/retrieve_schedule', retrieve_schedule);  //Route for all schedule retrieval related functions (Fetching, searching, etc.)
app.use('/api/upload_schedule', upload_schedule);  //Route for all schedule uploading related functions (Uploading, updating, etc.)

//For testing the root when deployed to cloud
app.get('*', async (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

//Uncomment the line below this if testing on local machine
app.listen(process.env.PORT || 3000, () => console.log("Listening on: " + (process.env.PORT || 3000)));

//Uncomment the line below and comment the line above if deploying to cloud
//module.exports = app;