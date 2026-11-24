const app = require("./app");
const DBconnect = require("./database/DBConnect");

const PORT = process.env.PORT || 6000;

if (require.main === module) {
  DBconnect()
    .catch((error) => {
      console.log(error.message);
    })
    .finally(() => {
      app.listen(PORT, () => {
        console.log(`Server is running on port http://localhost:${PORT}`);
      });
    });
}

module.exports = app;
