exports.seed = knex => {
  // Deletes ALL existing entries
  return knex.raw("TRUNCATE TABLE product RESTART IDENTITY CASCADE");
};
