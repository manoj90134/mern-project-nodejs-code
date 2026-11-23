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
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Workout", WorkoutModel);
