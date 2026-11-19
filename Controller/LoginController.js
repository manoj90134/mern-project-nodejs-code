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

    res.status(200).json({
      success: true,
      message: "user login Successfully",
      data: userdetails,
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

    res.send({
      success: true,
      message: "user create Successfully",
      date: user,
      token: token,
    });
  } catch (e) {
    res.status(400).send({
      success: false,
      message: e.message,
    });
  }
};
