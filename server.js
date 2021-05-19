const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const StockXAPI = require('stockx-api');
const stockX = new StockXAPI();
// Deze aanvullen met zoveel mogelijk modellen
const allModels = ['Air Max 1', 'Air Max 90', 'Air Max 95', 'Air Max 96', 'Air Max 97', 'Air Max 98', 'Air Max 270', 'Air Max 720', 'Air Max Plus', 'Air VaporMax'];
let yourModels = [];
let myLikes = []

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
  console.log(yourModels)
})

app.get('/shoe', async (req, res) => {
  try {
    let duplicateArray = await stockX.searchProducts('Air Max') 
    //  Gevonden op Stack Overflow
    function filterDuplicates(shoeArray, id) {
      return [...new Map(shoeArray.map(shoe => [shoe[id], shoe])).values()]
     }
      
    const shoe = filterDuplicates(duplicateArray, 'uuid')
    console.log(shoe)

    res.render('shoe', {shoe})
  } catch (error) {
      console.log(`Error searching: ${err.message}`);
  }
})

app.post('/shoe', (req, res) => {
  // const urlKeyShoe = shoe.find(shoe => shoe.urlKey == req.params.urlKey)
  myLikes.push({
    name: req.body.name,
    image: req.body.image
  })
  console.log(myLikes);
})

app.use( (req, res) => {
  res.status(404).send("Sorry, not found")
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
