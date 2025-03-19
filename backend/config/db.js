const mongoose = require("mongoose");

function connectDB() {
  mongoose
    .connect(process.env.MBI, {
      dbName: "testDB",
    })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));
}

module.exports = connectDB;
