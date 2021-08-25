const dotenv = require("dotenv");

// Configuration
dotenv.config();

const {
  CURRENCY_CONVERTOR_KEY,
  CURRENCY_CONVERTOR_URL,
  DEFAULT_LIMIT
} = process.env;

const REQUIRED_CONFIG = [
  "CURRENCY_CONVERTOR_KEY",
  "CURRENCY_CONVERTOR_URL",
  "DEFAULT_LIMIT"
];

// eslint-disable-next-line consistent-return
REQUIRED_CONFIG.forEach(key => {
  if (!process.env[key]) {
    console.error("[Error] API Config Missing:", key);
    return process.exit(1);
  }
});

const API_CONFIG = {
  CURRENCY_CONVERTOR_KEY,
  CURRENCY_CONVERTOR_URL,
  DEFAULT_LIMIT
};

module.exports = {
  API_CONFIG
};
