const port = 8000;
const express = require('express');
const app = express();
const knex = require('knex')(require('./knexfile.js')['development']);
app.get('/', (req, res) => {
  res.send('Here it is.');
})
app.get('/DATABASE_NAME', (req, res) => {
  knex('DATABASE_NAME').select('*').then(DATABASE_HEADER => {
    let VARIABLE = DATABASE_HEADER.map(DATABASE_NAME => DATABASE_NAME.DATABASE_HEADER)
    res.json(VARIABLE);
  })
});
app.listen(port, () => {
  console.log('Server running at http://localhost: ' + port);
});
