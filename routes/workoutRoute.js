const express = require("express");

const Route = express.Router();

// import controller

const {
  CreateWorkout,
  ViewAllWorkout,
  SingleViewWorkout,
  UpdateViewWorkout,
  DeleteViewWorkout,
} = require("../Controller/WorkoutController");

Route.get("/", (req, res) => {
  res.send("<h1> This is Workout APi </h1>");
});

Route.get("/all-view", ViewAllWorkout); // view All

Route.post("/create", CreateWorkout);

Route.get("/single-view/:id", SingleViewWorkout); // single All

Route.post("/update-view", UpdateViewWorkout); // Update View

Route.delete("/delete-view/:id", DeleteViewWorkout); // Delete View

module.exports = Route;
