const mongoose = require("mongoose");

const schema = mongoose.Schema;

const WorkoutModel = new schema(
  {
    title: {
      type: String,
      required: true,
    },
    reps: {
      type: String,
      required: true,
    },
    load: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Workout", WorkoutModel);
