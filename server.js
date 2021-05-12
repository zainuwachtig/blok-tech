const express = require('express')
const app = express()
const port = 3000
const StockXAPI = require('stockx-api');
const stockX = new StockXAPI();
// Deze aanvullen met zoveel mogelijk modellen
const allModels = ['Air Max 1', 'Air Max 90', 'Air Max 95', 'Air Max 96', 'Air Max 97', 'Air Max 98', 'Air Max 270', 'Air Max 720', 'Air Max Plus', 'Air VaporMax'];
let yourModels = [];

app.set('view engine', 'pug')

app.use(express.static('static'))

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/about', (req, res) => {
  res.send('About this application')
})

app.get('/login', (req, res) => {
  res.render('login')
})

app.get('/model', (req, res) => {
  res.render('model', {allModels})
})

// Kan er geen limit op te zetten ivm laden?
// math.random nog fixen zodat die niet de hele tijd de eerste uit de array pakt.
app.get('/shoe/:urlKey', async (req, res) => {
  let shoe = await stockX.searchProducts('air max 95 dusty purple', {
    limit: 1
  })
  .then(products => products)
  .catch(err => console.log(`Error searching: ${err.message}`));
  res.render('shoe', {shoe})
  // Hij herkent shoe wel maar niet de urlKey?
  console.log(shoe)
})


app.use( (req, res) => {
  res.status(404).send("Sorry, not found")
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
