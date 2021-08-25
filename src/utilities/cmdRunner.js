const { exec } = require("child_process");
const { promisify } = require("util");

const execPromise = promisify(exec);

function runDBMigrations() {
  return execPromise(`npx knex migrate:latest`);
}

function runDBSeeds() {
  return execPromise(`npx knex seed:run`);
}

module.exports = {
  runDBMigrations,
  runDBSeeds
};
