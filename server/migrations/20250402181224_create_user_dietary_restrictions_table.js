/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('user_dietary_restrictions', table => {
    table.increments('id');
    table.integer('user_id').references(`users.id`);
    table.integer('dietary_restriction_id').references(`dietary_restrictions.id`);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('user_dietary_restrictions', table => {
    table.dropForeign('user_id')
    table.dropForeign('dietary_restriction_id')
  })
  .then(function() {
    return knex.schema.dropTable('user_dietary_restrictions');
  });
};
