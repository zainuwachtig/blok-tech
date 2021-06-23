const { query } = require('express');
const express = require('express')
const app = express();
const dotenv = require('dotenv').config();
const { MongoClient, ObjectId } = require('mongodb');
const port = process.env.PORT || 3000
const currentUserId = '60af89be7bbfbe2338c2f805';

let db
async function connectDB() {
  const uri = process.env.DB_URI;
  const options = { useUnifiedTopology: true };
  const client = new MongoClient(uri,options);
  await client.connect();
  db = await client.db(process.env.DB_NAME);
}
connectDB()
.then(() => {
  console.log('🥭 Mango verbinding is er');
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
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

app.get('/mylikes', async (req, res) => {
  const queryId = {_id: ObjectId(currentUserId)};
  let currentUser = await db.collection('users').findOne(queryId);
  const queryShoe = {pid: {$in:currentUser.likes}}
  let myLikes = await db.collection('shoes').find(queryShoe).toArray();

  res.render('mylikes', {myLikes})
})

app.post('/contact', (req, res) => {
  res.send('gelukt')
})

app.post('/yourmodels', (req, res) => {
  yourModels = req.body.chosenModels
  res.render('model', {allModels})
})

// Loop schrijven voor API
app.get('/explore', async (req, res) => {
  try {
  const queryId = {_id: ObjectId(currentUserId)};
  let currentUser = await db.collection('users').findOne(queryId);
  const query = {$and: [{pid: {$nin:currentUser.likes}}, {pid: {$nin:currentUser.dislikes}}]}
  const shoe = await db.collection('shoes').find(query).toArray();
  let upperCard = shoe.find(upperCard => upperCard)
  res.render('shoe', {shoe, upperCard})
} catch(error) {
  console.log(error)
}
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
    const shoe = await db.collection('shoes').find(query).toArray();
    console.log(shoe)

    let upperCard = shoe.find(upperCard => upperCard)
    console.log(upperCard)
  } else {
    const update = {
      "$push": {
        "dislikes": req.body.pid
      }
    };
    const newShoe = await db.collection('users').findOneAndUpdate(queryId, update, options);
    const update2 = {
      "$pop": {
        "dislikes": req.body.pid
      }
    };
    let upperCard = shoe.find(upperCard => upperCard)
    shoe.shift()
  }

  res.render('shoe', {shoe, upperCard})
})

app.use( (req, res) => {
  res.render('404')
})


