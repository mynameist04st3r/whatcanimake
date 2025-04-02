/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('shopping_list', table => {
    table.increments('id');
    table.integer('user_id').references(`users.id`);
    table.integer('ingredient_id').references(`ingredients.id`);
    table.string('quantity');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('shopping_list', table => {
    table.dropForeign('user_id')
    table.dropForeign('ingredient_id')
  })
  .then(function() {
    return knex.schema.dropTable('shopping_list');
  });
};
