const express = require('express')
const app = express()
const port = 3000

//Waarom moet deze als eerst?
app.use(express.static('static'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

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
