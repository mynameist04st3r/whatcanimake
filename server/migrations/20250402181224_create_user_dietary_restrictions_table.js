/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('user_dietary_restrictions', table => {
    table.increments('id');
    table.integer('users_id');
    table.integer('dietary_restrictions_id');
    table.foreign('users_id').references(`users.id`);
    table.foreign('dietary_restrictions_id').references(`dietary_restrictions.id`);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('user_dietary_restrictions', table => {
    table.dropForeign('users_id')
    table.dropForeign('dietary_restrictions_id')
  })
  .then(function() {
    return knex.schema.dropTable('user_dietary_restrictions');
  });
};
