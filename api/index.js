const app = require("../app");
const DBconnect = require("../database/DBConnect");

module.exports = async (req, res) => {
  await DBconnect();
  return app(req, res);
};
