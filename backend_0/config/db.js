const mongoose = require("mongoose");

function connectDB() {
  mongoose
    .connect(process.env.MBI, {
      dbName: "HackathonWebsiteDB",
    })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));
}

module.exports = connectDB;
