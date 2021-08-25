const express = require("express");

const ErrorPage = express.Router();

ErrorPage.all("*", (req, res) => {
  res.status(404).send("PAGE NOT FOUND");
});

module.exports = {
  ErrorPage
};
