const express = require('express');
const app = express();
const port = 8000;
const knex = require('knex')(require('../knexfile.js')['development']);
const cors = require('cors');
const { hash, compare } = require('@uswriting/bcrypt');
const uuid = require('uuid');
const session = require('express-session');
const secretKey = uuid.v4();
app.use(session({
  secret: secretKey,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 6000
  }
}));

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

app.listen( port, () => {
  console.log(`Server running on port ${port}`);
});

app.get('/favicon.ico', (req, res) => {
  res.status(204).end();
})

app.get('/', (req, res) => {
  res.send('Server operational')
})

app.post('/signup', async (req, res) => {
  try {
    const {username, password, confirmPassword} = req.body;
    if (!username || !password || !username) {
      return res.status(400).json({success: false, message: 'Please fill out all fields'});
    }
    if (password !== confirmPassword) {
      return res.status(400).json({success: false, message: 'Passwords do not match'});
    }
    const existingUser = await knex('users').where('username', username).first();
    if (existingUser) {
      return res.status(400).json({success: false, message: 'Username already exists'});
    }
    const hashedPassword = await hash(password, 10);
    const newUser = await knex('users').insert({username, password: hashedPassword});
    return res.json({success: true, message: 'User created successfully'});
  } catch (err) {
    console.error(err);
    return res.status(500).json({success: false, message: 'Internal server error'});
  }
})

app.post('/login', async (req, res) => {
  try {
    const {username, password} = req.body;
    if (!username || !password) {
      return res. status(400).json({success: false, message: 'Please fill out all fields'})
    }
    const user = await knex('users').where('username', username).first();
    if (!user) {
      return res.status(400).json({success: false, message: 'Invalid username or password'});
    }
    const isValidPassword = await compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({success: false, message: 'Invalid username or password'});
    }
    return res.json({success: true, message: 'Logged in successfully'});
  } catch (err) {
    console.error(err);
    return res.status(500).json({success: false, message: 'Internal server error'});
  }
})

app.post('/ingredients', async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) {
      return res.status(400).json({success: false, message: 'Name is required'});
    }
    const newIngredient = await knex('ingredients').insert({ name, description });
    return res.json({success: true, message: 'Ingredient created successfully'});
  } catch (err) {
    console.error(err);
    return res.status(500).json({success: false, message: 'Internal server error'});
  }
})

app.get('/ingredients', async (req, res) => {
  try {
    const ingredients = await knex('ingredients').select().orderBy('name');
    // const results = await ingredients;
    return res.json(ingredients);
  } catch (err) {
    console.error(err);
    return res.status(500).json({success: false, message: 'Internal server error'});
  }
})

app.patch('/ingredients/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { name, description } = req.body;
    const ingredient = await knex('ingredients').where('id', id).first();
    if (!ingredient) {
      return res.status(404).json({ success: false, message: 'Ingredient not found' });
    }
    if (name) {
      ingredient.name = name;
    }
    if (description) {
      ingredient.description = description;
    }
    await knex('ingredients').where('id', id).update(ingredient);
    const updatedIngredient = await knex('ingredients').where('id', id).first();
    return res.json(updatedIngredient);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
})

app.delete('/ingredients/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const ingredient = await knex('ingredients').where('id', id).first();
    if (!ingredient) {
      return res.status(404).json({ success: false, message: 'Ingredient not found' });
    }
    await knex('ingredients').where('id', id).del();
    return res.json({ success: true, message: 'Ingredient deleted' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
})

app.get('/recipes', (req, res) => {
  knex('recipes')
  .select('*')
  .then(recipe => {
    res.json(recipe);
  })
})

// app.get('/recipes', async (req, res) => {
//   try {
//     // You should retrieve the user's ID from the session or another source
//     // For now, let's assume it's stored in the session
//     const userId = req.session.userId;
//     if (!userId) {
//       return res.status(401).json({ success: false, message: 'Unauthorized' });
//     }
//     const userIngredients = await knex('user_selected_ingredients')
//       .where('user_id', userId)
//       .join('ingredients', 'user_selected_ingredients.ingredient_id', '=', 'ingredients.id')
//       .select('ingredients.id');
//     const recipes = await knex('recipes')
//       .select('recipes.id', 'recipes.name', 'recipes.description', 'recipes.instructions')
//       .join('recipe_ingredients', 'recipes.id', '=', 'recipe_ingredients.recipe_id')
//       .join('ingredients', 'recipe_ingredients.ingredient_id', '=', 'ingredients.id')
//       .whereIn('ingredients.id', userIngredients.map((ingredient) => ingredient.id))
//       .where('recipe_ingredients.is_available', true)
//       .groupBy('recipes.id', 'recipes.name', 'recipes.description', 'recipes.instructions')
//       .select(
//         knex.raw('COUNT(DISTINCT recipe_ingredients.id) as matchingIngredients'),
//         knex.raw('recipes.id'),
//         knex.raw('recipes.name'),
//         knex.raw('recipes.description'),
//         knex.raw('recipes.instructions')
//       )
//       .unionAll([
//         knex('recipes')
//           .select('id', 'name', 'description', 'instructions', knex.raw('0 as matchingIngredients'))
//           .whereNotIn('id', knex('recipe_ingredients')
//             .join('ingredients', 'recipe_ingredients.ingredient_id', '=', 'ingredients.id')
//             .whereIn('ingredients.id', userIngredients.map((ingredient) => ingredient.id))
//             .where('recipe_ingredients.is_available', true)
//             .groupBy('recipe_ingredients.recipe_id')
//             .select('recipe_ingredients.recipe_id')),
//       ])
//       .orderBy('matchingIngredients', 'desc')
//       .limit(10);
//     res.json(recipes);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// });