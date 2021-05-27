const { query } = require('express');
const express = require('express')
const app = express();
const dotenv = require('dotenv').config();
const { MongoClient } = require('mongodb')
const { ObjectId} = require("mongodb")
const port = process.env.PORT || 3000
const currentUserId = '60af89be7bbfbe2338c2f805'
const allModels = ['Air Max 1', 'Air Max 90', 'Air Max 95', 'Air Max 96', 'Air Max 97', 'Air Max 98', 'Air Max 270', 'Air Max 720', 'Air Max Plus', 'Air VaporMax'];
let yourModels = [];
let myDislikes = [];


let db = null;
async function connectDB() {
  const uri = process.env.DB_URI;
  // Waar staat dit voor?
  const options = { useUnifiedTopology: true };
  const client = new MongoClient(uri,options);
  await client.connect();
  db = await client.db(process.env.DB_NAME);
}
connectDB()
.then(() => {
  console.log('Mongo verbinding is er');
})
.catch ( error => {
  console.log(error);
});


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

// Dit werkt nog niet -> geef undefined, maar bij like pusht die hem wel naar de array?
app.get('/mylikes', async (req, res) => {
  const query = {}
  let myLikes = await db.collection('users').find(query).toArray();
  console.log(myLikes)
  res.render('mylikes', {myLikes})
})

app.post('/contact', (req, res) => {
  res.send('gelukt')
})

app.post('/yourmodels', (req, res) => {
  yourModels = req.body.chosenModels
  res.render('model', {allModels})
})

app.get('/explore', async (req, res) => {
  const query = {}
  const shoe = await db.collection('shoes').find(query).toArray();
  let upperCard = shoe.find(upperCard => upperCard)
  res.render('shoe', {shoe, upperCard})
})

app.post('/explore', async (req, res) => {
  const query = {}
  const shoe = await db.collection('shoes').find(query).toArray();
  let upperCard = shoe.find(upperCard => upperCard)
  let myLikes = await db.collection('likes').find(query).toArray();
  const queryId = {_id: ObjectId(currentUserId)};
  const options = { returnNewDocument: true };
  

  if (req.body.like) {
    const update = {
      "$push": {
        "likes": req.body.pid
      }
    };
    
    const newShoe = await db.collection('users').findOneAndUpdate(queryId, update, options);
    shoe.shift()
  } else {
    const update = {
      "$push": {
        "dislikes": req.body.pid
      }
    };
    const newShoe = await db.collection('users').findOneAndUpdate(queryId, update, options);
    shoe.shift()
  }

  res.render('shoe', {shoe, upperCard})
})

app.use( (req, res) => {
  res.render('404')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
