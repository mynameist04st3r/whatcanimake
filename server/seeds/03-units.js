/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('units').del()
  await knex('units').insert([
    {id: 1, name: 'cups', abbreviation: 'C'},
    {id: 2, name: 'teaspoons', abbreviation: 'tsp'},
    {id: 3, name: 'tablespoons', abbreviation: 'Tbsp'},
    {id: 4, name: 'ounces', abbreviation: 'oz'},
    {id: 5, name: 'pounds', abbreviation: 'lb'},
    {id: 6, name: 'gallons', abbreviation: 'gal'},
    {id: 7, name: 'grams', abbreviation: 'g'},
    {id: 8, name: 'milliliters', abbreviation: 'ml'},
    {id: 9, name: 'liters', abbreviation: 'L'},
    {id: 10, name: '<', abbreviation: '<'},
  ]);
};
