/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('recipe_ingredients').del()
  await knex('recipe_ingredients').insert([
    {id: 1, recipe_id: 1, ingredient_id: 1, quantity: '2 1/2', unit_id: 1},
    {id: 2, recipe_id: 1, ingredient_id: 2, quantity: '2', unit_id: 3},
    {id: 3, recipe_id: 1, ingredient_id: 3, quantity: '1/4 C + 2 Tbsp', unit_id: 10},
    {id: 4, recipe_id: 1, ingredient_id: 4, quantity: '3', unit_id: 3},
    {id: 5, recipe_id: 1, ingredient_id: 5, quantity: '1/2', unit_id: 1},
  ]);
};
