const express = require("express");

const app = express();

const dotenv = require("dotenv").config();

// RouteIndex called here

const appRoute = require("./routes/index");

const cors = require("cors"); // allow cors
// Enable CORS
app.use(cors());

app.use(express.json());

app.use("/", appRoute);

// Connect database Mongodb
const DBconnect = require("./database/DBConnect");
DBconnect();

app.get("/", (req, res) => {
  res.send(`Hoem Page Api called ${process.env.PORT}`);
});

const PORT = process.env.PORT || 6000;

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
