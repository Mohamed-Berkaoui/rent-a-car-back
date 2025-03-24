require("dotenv").config();
const express = require("express");
const connectToDb = require("./lib/connectToDb");
const AppError = require("./lib/AppError");
const AppFail = require("./lib/AppFail");
const userRouter = require("./routes/user");
const server = express();
const cookieparser=require('cookie-parser');
const carRouter = require("./routes/car");


server.use(express.json())
server.use(cookieparser())
server.use(express.static(__dirname + "/public"));

server.use("/api/user", userRouter); 
server.use("/api/car", carRouter); 


server.all("*", (req, res, next) => {
  res.json(new AppFail("404 not found"));
});

server.use((err, req, res, next) => {
  console.log("first");
  res.json(new AppError(err.message));
});

server.listen(5000, function () {
  console.log("server running on http://localhost:5000");
  connectToDb();
});
