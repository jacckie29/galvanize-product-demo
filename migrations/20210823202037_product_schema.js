exports.up = knex => {
  return knex.schema.createTable("product", table => {
    table
      .increments("product_id")
      .unsigned()
      .primary();
    table.decimal("price", 16, 2).notNullable();
    table.string("name", 100).notNullable();
    table.text("description").nullable();
    table.integer("views").defaultTo(0);
    table.enu("status", ["active", "inactive"]).defaultTo("active");
    table.timestamps(true, true);
  });
};

exports.down = knex => {
  return knex.schema.dropTableIfExists("product");
};
