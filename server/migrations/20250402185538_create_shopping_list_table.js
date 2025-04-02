/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('shopping_list', table => {
    table.increments('id');
    table.integer('users_id');
    table.integer('ingredients_id');
    table.foreign('users_id').references(`users.id`);
    table.foreign('ingredients_id').references(`ingredients.id`);
    table.string('quantity');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('shopping_list', table => {
    table.dropForeign('users_id')
    table.dropForeign('ingredients_id')
  })
  .then(function() {
    return knex.schema.dropTable('shopping_list');
  });
};
