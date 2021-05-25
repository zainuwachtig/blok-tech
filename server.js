const express = require('express')
const app = express()
const port = process.env.PORT || 3000
// const StockXAPI = require('stockx-api');
// const stockX = new StockXAPI();
// Deze aanvullen met zoveel mogelijk modellen
const allModels = ['Air Max 1', 'Air Max 90', 'Air Max 95', 'Air Max 96', 'Air Max 97', 'Air Max 98', 'Air Max 270', 'Air Max 720', 'Air Max Plus', 'Air VaporMax'];
let yourModels = [];
let myLikes = [];
let myDislikes = [];
const shoe = [{
  'name': 'Air Max 95 OG Neon (2020)',
  'releaseDate': '2020-12-17',
  'pid': 'CT1689-001',
  'image': 'https://images.stockx.com/images/Nike-Air-Max-95-OG-Neon-2020-Product.jpg?fit=fill&bg=FFFFFF&w=700&h=500&auto=format,compress&trim=color&q=90&dpr=2&updated_at=1609443450',
  'urlKey': 'air-max-95-og-neon-2020'
},
{
  'name': 'Air Max 98 Supreme Snakeskin',
  'releaseDate': '2016-04-28',
  'pid': '844694-100',
  'image': 'https://images.stockx.com/images/Nike-Air-Max-98-Supreme-Snakeskin-Product.jpg?fit=fill&bg=FFFFFF&w=700&h=500&auto=format,compress&trim=color&q=90&dpr=2&updated_at=1607672309',
  'urlKey': 'air-max-98-supreme-snakeskin'
},
{
  'name': 'Air Max 180 Comme des Garcons White',
  'releaseDate': '2018-02-01',
  'pid': 'AO4641-600',
  'image': 'https://images.stockx.com/Nike-Air-Max-180-Comme-des-Garcons-White-Product.jpg?fit=fill&bg=FFFFFF&w=700&h=500&auto=format,compress&trim=color&q=90&dpr=2&updated_at=1603481985',
  'urlKey': 'air-max-180-comme-des-garcons-white'
}
];

let upperCard = shoe.find(upperCard => upperCard)
console.log(upperCard)

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

app.get('/contact', (req, res) => {
  res.render('contact')
})

app.post('/contact', (req, res) => {
  res.send('gelukt')
})

app.post('/yourmodels', (req, res) => {
  yourModels = req.body.chosenModels
  res.render('model', {allModels})
})

app.get('/shoe', (req, res) => {
  res.render('shoe', {shoe, upperCard})
})

app.post('/shoe', (req, res) => {
  if (req.body.like) {
    myLikes.push(upperCard)
    shoe.shift()
  } else {
    myDislikes.push(upperCard)
    shoe.shift()
  }
  upperCard = shoe.find(upperCard => upperCard)

  res.render('shoe', {shoe, upperCard})
})

app.use( (req, res) => {
  res.status(404).send("Sorry, not found")
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
