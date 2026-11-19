const express = require("express");

const app = express();

const dotenv = require("dotenv").config();
const workoutRoute = require("./routes/workoutRoute"); // routes

const cors = require("cors"); // allow cors
// Enable CORS
app.use(cors());

app.use(express.json());
// Connect database Mongodb
const DBconnect = require("./database/DBConnect");
DBconnect();

app.use("/workout", workoutRoute); // menu routes called

app.get("/", (req, res) => {
  res.send("Hoem Page Api called");
});

const PORT = process.env.PORT || 6000;

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
