const { default: mongoose } = require("mongoose");
const WorkoutModel = require("../Models/WorkoutSchema");

exports.CreateWorkout = async (req, res) => {
  try {
    const { title, reps, load } = req.body;

    console.log("bearTokenUser-", req.user._id);

    const data = {
      title: title,
      reps: reps,
      load: load,
      user_id: req.user._id,
    };

    const Createdata = await WorkoutModel.create(data);

    if (Createdata) {
      res.status(200).json({
        success: true,
        message: "data Insert Successfully",
        data: Createdata,
      });
    }
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e.message,
    });
  }
};

exports.ViewAllWorkout = async (req, res) => {
  console.log("rr", req.user._id);

  const Alldata = await WorkoutModel.find({ user_id: req.user._id });

  if (!Alldata) {
    return res.status(400).json({
      success: true,
      message: "No data Found",
      data: {},
    });
  }

  res.json({
    success: true,
    message: "All data retrive successfully",
    data: Alldata,
  });
};

exports.SingleViewWorkout = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "is object is wrong" });
    }

    const singledata = await WorkoutModel.findById(id);

    if (!singledata) {
      return res.status(400).json({
        success: false,
        message: "id is not found",
        data: {},
      });
    }

    res.json({
      success: true,
      message: "Single data retrive successfully",
      data: singledata,
    });
  } catch (e) {
    return res.status(400).json({
      success: false,
      message: e.message,
      data: {},
    });
  }
};

exports.UpdateViewWorkout = async (req, res) => {
  const { id, title, reps, load } = req.body;

  const singledata = await WorkoutModel.findById(id);

  if (!singledata) {
    return res.status(400).json({
      success: false,
      message: "id is not found",
      data: {},
    });
  }

  const updatedata = await WorkoutModel.findByIdAndUpdate(
    id,
    {
      title: title,
      reps: reps,
      load: load,
    },
    { new: true },
  );

  res.json({
    success: true,
    message: "data update successfully",
    data: updatedata,
  });
};

exports.DeleteViewWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "is object is wrong" });
  }

  const singledata = await WorkoutModel.findById(id);

  if (!singledata) {
    return res.status(400).json({
      success: false,
      message: "id is not found",
      data: {},
    });
  }

  const deletedata = await WorkoutModel.findByIdAndDelete(id);

  res.json({
    success: true,
    message: "data Delete successfully",
    data: deletedata,
  });
};

// ViewAllWorkout,SingleViewWorkout,UpdateViewWorkout,DeleteViewWorkout
