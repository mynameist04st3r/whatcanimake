/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('user_selected_ingredients', table => {
    table.increments('id');
    table.integer('user_id').references(`users.id`);
    table.integer('ingredient_id').references(`ingredients.id`);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('user_selected_ingredients', table => {
    table.dropForeign('user_id')
    table.dropForeign('ingredient_id')
  })
  .then(function() {
    return knex.schema.dropTableIfExists('user_selected_ingredients');
  });
};
