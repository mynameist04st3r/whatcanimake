/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('ingredient_dietary_restrictions', table => {
    table.increments('id');
    table.integer('ingredients_id');
    table.integer('dietary_restrictions_id');
    table.foreign('ingredients_id').references(`ingredients.id`);
    table.foreign('dietary_restrictions_id').references(`dietary_restrictions.id`);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('ingredient_dietary_restrictions', table => {
    table.dropForeign('ingredients_id')
    table.dropForeign('dietary_restrictions_id')
  })
  .then(function() {
    return knex.schema.dropTableIfExists('ingredient_dietary_restrictions');
  });
};
