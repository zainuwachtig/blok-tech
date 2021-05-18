const express = require('express')
const app = express()
const port = 3000
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

app.post('/yourmodels', (req, res) => {
  yourModels = req.body.chosenModels
  res.render('model', {allModels})
  console.log(yourModels)
})

// urlKey koppelen aan product nog fixen.
app.get('/shoe', async (req, res) => {
  try {
    let duplicateArray = await stockX.searchProducts(yourModels, {
      limit: 10
    }) 
 
    function filterDuplicates(shoeArray, id) {
      return [...new Map(shoeArray.map(shoe => [shoe[id], shoe])).values()]
     }
      
     const shoe = filterDuplicates(duplicateArray, 'uuid')
     console.log(shoe)

    res.render('shoe', {shoe})
    // res.send(uniqueShoes)
  } catch (error) {
      // console.log(`Error searching: ${err.message}`);
  }
  
})

app.post('/shoe', (req, res) => {
// De pid en img van het object moet ik hebben -> alles is gedeclareerd in app.get('/shoe')
  // console.log(uniqueShoes)
  // myLikes.push(likeButton)
  // console.log(myLikes)
})


app.use( (req, res) => {
  res.status(404).send("Sorry, not found")
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
