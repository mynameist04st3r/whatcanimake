/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('ingredients').del()
  await knex('ingredients').insert([
    {id: 1, name: 'coconut flakes', description: 'unsweetened'},
    {id: 2, name: 'coconut oil', description: 'solid or melted'},
    {id: 3, name: 'coconut cream', description: ''},
    {id: 4, name: 'maple syrup', description: '100% pure'},
    {id: 5, name: 'chocolate chips', description: ''},
  ]);
};
