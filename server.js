const express = require('express')
const app = express()
const port = 3000
const StockXAPI = require('stockx-api');
const stockX = new StockXAPI();
// Deze aanvullen met zoveel mogelijk modellen
const allModels = ['Air Max 1', 'Air Max 90', 'Air Max 95', 'Air Max 96', 'Air Max 97', 'Air Max 98', 'Air Max 270', 'Air Max 720', 'Air Max Plus', 'Air VaporMax'];
let yourModels = [];

app.set('view engine', 'pug')

app.use(express.json())
app.use(express.urlencoded());
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

app.get('/yourmodels', (req, res) => {
  res.render('model', {allModels})
})

app.post('/yourmodels', (req, res) => {
  yourModels = req.body.chosenModels
  res.render('model', {allModels})
  console.log(yourModels)
})

// Als er geen limit opstaat, is de laadtijd dan nog dragelijk?
// .searchProducts(yourmodels) werkt nog niet
// math.random nog fixen zodat je een gevarieerd aanbod krijgt over verschillende jaren.
// urlKey koppelen aan product nog fixen.
// urlKey mag niet meer dan 1 keer voorkomen, anders krijg je twee keer dezelfde producten.
app.get('/shoe/:urlKey', async (req, res) => {
  let shoe = await stockX.searchProducts('air yeezy 1 tan', {
    limit: 3
  })
  .then(products => products)
  .catch(err => console.log(`Error searching: ${err.message}`));
  res.render('shoe', {shoe})
  // shoe pakt die wel, maar urlKey is undefined?
  console.log(shoe)
})


app.use( (req, res) => {
  res.status(404).send("Sorry, not found")
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
