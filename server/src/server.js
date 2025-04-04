const express = require('express');
const app = express();
const port = 8000;
const knex = require('knex')(require('../knexfile.js')['development']);
const cors = require('cors');
const { hash, compare } = require('@uswriting/bcrypt');

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
    if (!password || !username) {
      return res.status(400).json({success: false, message: 'Username and password are required'});
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
    const ingredients = await knex('ingredients').orderBy('name');
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

// app.get('/recipes', (req, res) => {
//   knex('recipes').select('*').then(recipes => {
//     res.json(recipes)
//   })
// })

// app.get('/recipes/:id', (req, res) => {
//   console.log(req.params)
//   let id = req.params.id
//   knex('recipes')
//   .select('*')
//   .where('id', '=', id)
//   .then(recipes => {
//     res.json(recipes)
//   })
// })

// app.post('/recipe/:new', (req, res) => {
//   let newRecipe = req.params.new
//   knex('recipes')
//   .insert({
//     id: 3,
//     name: 'mutton',
//     description: 'some disk',
//     instructions: newRecipe
//   })
//   .catch(error => {
//     console.log(error)
//   })
//   res.send('recipe added')
// })

// app.post('/recipe', (req, res) => {
//   let food = req.body
//   knex('recipes')
//   .insert({
//     id: food.id,
//     name: food.name,
//     description: food.description,
//     instructions: food.instructions
//   })
//   .catch(error => {
//     console.log(error)
//   })
//   res.send('recipe added')
// })