const port = 8000;
const express = require('express');
const app = express();
const auth = require('./auth');
const session = require('express-session');
const knex = require('knex')(require('./knexfile.js')['development']);

app.use(
  session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false,
  })
)

app.use(express.json());
app.post('/register', (req, res) => {
  const {username, password, confirmPassword} = req.body;
  if (password !== confirmPassword) {
    return res.json({success: false, message: 'Passwords do not match'});
  }
  auth.registerUser(username, password)
    .then((result) => res.json(result))
    .catch((error) => res.json({success: false, message: error.message}));
});

app.post('/login', (req, res) => {
  const {username, password} = req.body;
  auth.loginUser(username, password)
    .then((result) => res.json(result))
    .catch((error) => res.json({success: false, message: error.message}));
});

app.post('/users/:userId/selected-ingredients', (req, res) => {
  const {userId} = req.params;
  const {ingredientID} = req.body;
  try {
    const result = await knex('user_selected_ingredients').insert({
      user_id: userID,
      ingretient_id: ingredientId,
    });
    res.json({success: true, message: 'Ingredient added successfully'});
  } catch (error) {
    console.error(error);
    res.json({success: false, message: 'Error adding ingredient'});
  }
});

app.get('/users/:userId/selected-ingredients', (req, res) => {
  const {userId} = req.params;
  try {
    const result = await knex('user_selected_ingredients')
      .where({user_id: userId})
      .join('ingredients', 'user_selected_ingredients.ingredient_id', '=', 'ingredients.id')
      .select('ingredients.*');
    res.json(result);
  } catch (error) {
    console.error(error);
    res.json({success: false, message: 'Error getting selected ingredients'});
  }
});

// app.use('./images', express.static(path.join(__dirname, 'images')));

app.get('/', (req, res) => {
  res.send('Server operational.');
});

// app.get('/whatcanimake', (req, res) => {
//   knex('whatcanimake').select('*').then(DATABASE_HEADER => {
//     let VARIABLE = DATABASE_HEADER.map(DATABASE_NAME => DATABASE_NAME.DATABASE_HEADER)
//     res.json(VARIABLE);
//   })
// });

app.listen(port, () => {
  console.log('Server running at http://localhost: ' + port);
});
