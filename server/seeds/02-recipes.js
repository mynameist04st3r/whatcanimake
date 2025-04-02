/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('recipes').del()
  await knex('recipes').insert([
    {id: 1, name: '5 Ingredient Vegan Coconut Chocolate Bars', description: 'This 5 ingredient coconut bars recipe yields thick, indulgent coconut bars enrobed in a velvety layer of rich chocolate. Healthy, Paleo, No Bake, Gluten Free.', instructions: 'Coconut Bars\n 2 ½ cups unsweetened coconut flakes or shreds\n 2 tablespoons coconut oil, solid or melted\n ¼ cup + 2 tablespoons coconut cream*\n 3 tablespoons pure maple syrup\nChocolate Layer\n ½ cup vegan chocolate chips\n ¼ cup coconut cream\n\n\n1. Line an 8-inch square baking pan with wax paper or parchment paper. Set aside for later.\n2. Make the Coconut Bars: Add coconut flakes, coconut oil, coconut cream, and maple syrup to a food processor. Blend until you get a wet and sticky mixture, with smaller, just slightly noticeable coconut pieces. Note: the bigger the pieces, the crumblier the bars will be.\n3. Pour coconut mixture into the prepared pan. Press down and smooth until you get a tightly-packed layer. Set aside while preparing the chocolate layer.\n4. Make the Chocolate Layer: Use the double boiler method, or the following. In a medium, microwave-safe bowl, add Chocolate Layer ingredients: chocolate chips and coconut cream. Heat in 15-second increments until just slightly softened and melted, being careful not to burn. Stir thoroughly in between heating increments, until smooth.\n5. Pour melted chocolate over coconut bars. Using a clean rubber spatula, smooth into an even layer. Freeze for 40-70 minutes. The longer the bars chill, the cleaner and less crumbly the slices (a little crumble is normal). Slice into 16 bars. Enjoy!'},
  ]);
};
