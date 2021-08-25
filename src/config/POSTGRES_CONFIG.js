const knex = require("knex");
const dotenv = require("dotenv");

// Configuration
dotenv.config();

const {
  DATABASE_URL,
  DATABASE_CLIENT,
  ENABLE_DB_MIGRATION,
  ENABLE_DB_SEED
} = process.env;

const REQUIRED_CONFIG = [
  "DATABASE_URL",
  "DATABASE_CLIENT",
  "ENABLE_DB_MIGRATION",
  "ENABLE_DB_SEED"
];

// eslint-disable-next-line consistent-return
REQUIRED_CONFIG.forEach(key => {
  if (!process.env[key]) {
    console.error("[Error] Postgres Config Missing:", key);
    return process.exit(1);
  }
});

let knexClient = null;

async function getDBClient() {
  return knexClient;
}

async function connect() {
  knexClient = await knex({
    connection: DATABASE_URL,
    client: DATABASE_CLIENT,
    pool: {
      max: 10,
      min: 2
    },
    debug: process.env.APP_ENVIROMENT === "dev"
  });
  console.log("DB connected successfully");
}

async function destroy() {
  knexClient.destroy();
}

const CONFIG = {
  DATABASE_URL,
  DATABASE_CLIENT,
  ENABLE_DB_MIGRATION: ENABLE_DB_MIGRATION === "true",
  ENABLE_DB_SEED: ENABLE_DB_SEED === "true"
};

const POSTGRES_CONFIG = {
  CONFIG,
  connect,
  getDBClient,
  destroy
};

module.exports = {
  POSTGRES_CONFIG
};
