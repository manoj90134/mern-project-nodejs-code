const mongoose = require("mongoose");

let cachedConnection = null;

const DBconnect = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (cachedConnection) {
    return cachedConnection;
  }

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI environment variable is not set");
  }

  try {
    cachedConnection = mongoose.connect(process.env.MONGO_URI).then((conn) => {
      console.log(`DB Connected ${conn.connection.host}`);
      return conn;
    });

    return await cachedConnection;
  } catch (e) {
    cachedConnection = null;
    console.log(e.message);
    throw e;
  }
};

module.exports = DBconnect;
