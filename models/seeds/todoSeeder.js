// const mongoose = require('mongoose')
const Todo = require('../todo') // 載入 todo model
//一定要加上這行才可以
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = require('../../config/mongoose')

// db.on('error', () => {
//   console.log('mongodb error!')
// })
db.once('open', () => {
  // console.log('mongodb connected!')
  for (let i = 0; i < 10; i++) {
    Todo.create({ name: `name-${i}` })
  }
  console.log('done')
})