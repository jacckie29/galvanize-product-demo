require("dotenv").config();

module.exports = {
  client: process.env.DATABASE_CLIENT,
  connection: process.env.DATABASE_URL,
  debug: false
};
