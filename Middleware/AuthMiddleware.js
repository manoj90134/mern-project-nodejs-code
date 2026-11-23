const UserModal = require("../Models/UserModal");
const jwt = require("jsonwebtoken");

const AuthMiddleware = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (authorization) {
      const Token = authorization.split(" ")[1];

      const AuthToken = jwt.verify(Token, process.env.JWTSECREATE);

      // console.log(AuthToken);

      if (AuthToken) {
        // check user details
        const Userdetails = await UserModal.findById(AuthToken._id);

        if (Userdetails) {
          req.user = Userdetails;
          next();
        } else {
          throw Error("User Token Is Wrong");
        }
      }

      // console.log(AuthToken);
    } else {
      throw Error("Please provide bearer Token");
    }
  } catch (e) {
    return res.status(401).json({
      status: false,
      message: e.message,
    });
  }
};

module.exports = AuthMiddleware;
