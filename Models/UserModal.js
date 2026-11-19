const mongoose = require("mongoose");

const bcrypt = require("bcrypt");

const validator = require("validator");

const schema = mongoose.Schema;

const UserModal = new schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// user signup function

UserModal.statics.Signup = async function (email, password) {
  if (!email && !password) {
    throw Error("All Field is required");
  }

  const checkEmail = await this.findOne({ email: email });

  if (checkEmail) {
    throw Error("Email is Already exists");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email is Not valid");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not Strong");
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const user = this.create({ email, password: hashPassword });

  return user;
};

// user login Function

UserModal.statics.logincheck = async function (email, password) {
  if (!email && !password) {
    throw Error("All Field is required");
  }

  const checkEmail = await this.findOne({ email: email });

  if (!checkEmail) {
    throw Error("Email is Not Valid");
  }

  const checkpassword = await bcrypt.compare(password, checkEmail.password);

  if (!checkpassword) {
    throw Error("Password is incorrect");
  }

  return checkEmail;
};

module.exports = mongoose.model("user", UserModal);
