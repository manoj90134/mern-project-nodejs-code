const UserModal = require("../Models/UserModal");

const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWTSECREATE, { expiresIn: "3d" });
};

exports.Logincode = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      throw Error("All Field is required");
    }

    const userdetails = await UserModal.logincheck(email, password);

    const Token = createToken(userdetails._id);

    const response = {
      ...userdetails.toObject(),
      token: Token,
    };

    res.status(200).json({
      success: true,
      message: "user login Successfully",
      data: response,
      token: Token,
    });
  } catch (e) {
    res.status(400).send({
      success: false,
      message: e.message,
    });
  }
};

exports.SignupCode = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      throw Error("All Field is required");
    }

    const user = await UserModal.Signup(email, password);

    const token = createToken(user._id);

    const response = {
      ...user.toObject(),
      token: token,
    };

    res.send({
      success: true,
      message: "user create Successfully",
      data: response,
      token: token,
    });
  } catch (e) {
    res.status(400).send({
      success: false,
      message: e.message,
    });
  }
};
