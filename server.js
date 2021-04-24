const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'pug')

// Als ik deze doe dan werkt het vanaf line 10 meer
//app.use(express.static('static'))

app.get('/static', (req, res) => {
  res.render('index', { title: 'Hey', message: 'Hello there!' })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


