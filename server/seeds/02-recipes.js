/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const { faker } = require('@faker-js/faker')

function createRecipe(count) {
  let recipes = [];
  for (let i = 1; i <= count; i++) {
    recipes.push({
      id: i,
      name: faker.food.dish(),
      description: faker.food.description(),
      instructions: faker.food.ingredient()
    })
  }
  return recipes
}

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('recipes').del()
  await knex('recipes').insert(createRecipe(20));
};
