/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const { faker } = require('@faker-js/faker')

function addIngredients(count) {
  let ingredients = [];
  for (let i = 1; i <= count; i++) {
    ingredients.push({
      id: i,
      name: faker.food.ingredient(),
      description: faker.food.ethnicCategory(),
    })
  }
  return ingredients
}


exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('ingredients').del()
  await knex('ingredients').insert(addIngredients(40));
};
