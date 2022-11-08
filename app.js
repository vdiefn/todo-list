const express = require('express')
const mongoose = require('mongoose')
const app = express()
const db = mongoose.connection

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}


mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
app.get('/', (req, res) => {
  res.send('Express is operated')
})

db.on('error', () => {
  console.log('mongodb error!')

  db.once('open', ()=> {
    console.log('mongodb connected!')
  })
})

app.listen( 3000, () => {
  console.log('Server is running on port 3000.')
})