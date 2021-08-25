const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const { CmdRunner } = require("./utilities");
const { POSTGRES_CONFIG } = require("./config");
const { Routes } = require("./routes");

const {
  CONFIG: { ENABLE_DB_MIGRATION, ENABLE_DB_SEED }
} = POSTGRES_CONFIG;

// Configuration
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));

Routes.forEach(route => app.use(route.path, route.router));

app.listen(port, async () => {
  await POSTGRES_CONFIG.connect();

  if (ENABLE_DB_MIGRATION) {
    await CmdRunner.runDBMigrations();
    console.log(`Migrations done`);
  }

  if (ENABLE_DB_SEED) {
    await CmdRunner.runDBSeeds();
    console.log(`Sedding done`);
  }

  console.log(`Server running on port ${port}`);
});
