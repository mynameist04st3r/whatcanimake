/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('ingredient_dietary_restrictions', table => {
    table.increments('id');
    table.integer('ingredient_id');
    table.integer('dietary_restriction_id');
    table.foreign('ingredient_id').references(`ingredients.id`);
    table.foreign('dietary_restriction_id').references(`dietary_restrictions.id`);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('ingredient_dietary_restrictions', table => {
    table.dropForeign('ingredient_id')
    table.dropForeign('dietary_restriction_id')
  })
  .then(function() {
    return knex.schema.dropTableIfExists('ingredient_dietary_restrictions');
  });
};
