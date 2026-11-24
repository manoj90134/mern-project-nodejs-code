const express = require("express");
const cors = require("cors");
require("dotenv").config();

const appRoute = require("./routes/index");

const app = express();

app.use(cors());
app.use(express.json());

// Support both direct routes and /api-prefixed routes for Vercel deployments.
app.use("/api", appRoute);
app.use("/", appRoute);

app.get("/", (req, res) => {
  res.send(`Home Page Api called ${process.env.PORT || ""}`.trim());
});

module.exports = app;
