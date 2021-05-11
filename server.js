const express = require('express')
const app = express()
const port = 3000
const StockXAPI = require('stockx-api');
const stockX = new StockXAPI();

const shoesArray = [{
  'name': 'Air Max 95 OG Neon (2020)',
  'releaseDate': '2020',
  'pid': 'CT1689-001',
  'image': 'https://images.stockx.com/images/Nike-Air-Max-95-OG-Neon-2020-Product.jpg?fit=fill&bg=FFFFFF&w=700&h=500&auto=format,compress&trim=color&q=90&dpr=2&updated_at=1609443450',
  'urlKey': 'air-max-95-og-neon-2020'
},
{
  'name': 'Air Max 98 Supreme Snakeskin',
  'releaseDate': '2016',
  'pid': '844694-100',
  'image': 'https://images.stockx.com/images/Nike-Air-Max-98-Supreme-Snakeskin-Product.jpg?fit=fill&bg=FFFFFF&w=700&h=500&auto=format,compress&trim=color&q=90&dpr=2&updated_at=1607672309',
  'urlKey': 'air-max-98-supreme-snakeskin'
},
{
  'name': 'Air Max 180 Comme des Garcons White',
  'releaseDate': '2018',
  'pid': 'AO4641-600',
  'image': 'https://images.stockx.com/Nike-Air-Max-180-Comme-des-Garcons-White-Product.jpg?fit=fill&bg=FFFFFF&w=700&h=500&auto=format,compress&trim=color&q=90&dpr=2&updated_at=1603481985',
  'urlKey': 'air-max-180-comme-des-garcons-white'
}
];

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

app.get('/shoe/:urlKey', async (req, res) => {
  // const shoe = shoesArray.find(shoe => shoe.urlKey == req.params.urlKey)
  let shoe = await stockX.searchProducts('air max 95', {
    limit: 1
  })
  .then(products => products)
  .catch(err => console.log(`Error searching: ${err.message}`));
  res.render('shoe', {shoe})
  console.log(shoe)
})



app.use( (req, res) => {
  res.status(404).send("Sorry, not found")
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
