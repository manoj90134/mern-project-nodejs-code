const mongoose = require("mongoose");

const DBconnect = async (req, res) => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    if (conn) {
      console.log(`DB Connected ${conn.connection.host}`);
    }
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = DBconnect;
