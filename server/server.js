const port = 8000;
const express = require('express');
const app = express();
const knex = require('knex')(require('./knexfile.js')['development']);

app.use('/images', express.static(path.join(__dirname, 'images')));

app.get('/', (req, res) => {
  res.send('Server operational.');
})
app.get('/whatcanimake', (req, res) => {
  knex('whatcanimake').select('*').then(DATABASE_HEADER => {
    let VARIABLE = DATABASE_HEADER.map(DATABASE_NAME => DATABASE_NAME.DATABASE_HEADER)
    res.json(VARIABLE);
  })
});
app.listen(port, () => {
  console.log('Server running at http://localhost: ' + port);
});
