const express = require("express");
const appRoute = express();

const workoutRoute = require("../routes/workoutRoute");
const LoginRouter = require("./LoginRoutes");

appRoute.use("/workout", workoutRoute); // menu routes called

appRoute.use("/", LoginRouter);

module.exports = appRoute;
