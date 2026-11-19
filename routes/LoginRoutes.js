const express = require("express");

const LoginRouter = express.Router();

const { Logincode, SignupCode } = require("../Controller/LoginController");

LoginRouter.post("/login", Logincode);

LoginRouter.post("/signup", SignupCode);

module.exports = LoginRouter;
