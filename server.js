const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'pug')

// Ik snap niet waarom deze bovenaan moet, is het omdat die boven line 23 moet zijn met de 404?
app.get('/', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!' })
})

app.use(express.static('static'))

app.get('/about', function (req, res) {
  res.send('About this application')
})

app.get('/login', function (req, res) {
  res.send('Login page')
})

app.use(function (req, res) {
  res.status(404).send("Sorry, not found")
})





app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
