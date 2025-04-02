/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('recipe_ingredients', table => {
    table.increments('id');
    table.integer('recipe_id');
    table.integer('ingredient_id');
    table.foreign('recipe_id').references(`recipes.id`);
    table.foreign('ingredient_id').references(`ingredients.id`);
    table.string('quantity').notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('recipe_ingredients', table => {
    table.dropForeign('recipe_id')
    table.dropForeign('ingredient_id')
  })
  .then(function() {
    return knex.schema.dropTable('recipe_ingredients');
  });
};
