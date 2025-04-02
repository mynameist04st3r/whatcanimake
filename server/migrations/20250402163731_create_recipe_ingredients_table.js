/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('recipe_ingredients', table => {
    table.increments('id');
    table.integer('recipes_id');
    table.integer('ingredients_id');
    table.foreign('recipes_id').references(`recipes.id`);
    table.foreign('ingredients_id').references(`ingredients.id`);
    table.string('quantity').notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('recipe_ingredients', table => {
    table.dropForeign('recipes_id')
    table.dropForeign('ingredients_id')
  })
  .then(function() {
    return knex.schema.dropTable('recipe_ingredients');
  });
};
