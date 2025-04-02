/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('recipe_ingredients').del()
  await knex('recipe_ingredients').insert([
    {id: 1, recipe_id: 1, ingredient_id: 1, quantity: '2 1/2'},
  ]);
};
