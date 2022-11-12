const express = require('express')
const mongoose = require('mongoose') // 載入 mongoose
const exphbs = require("express-handlebars")
const Todo = require('./models/todo')
const bodyParser = require('body-parser')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const app = express()

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }) // 設定連線到 mongoDB

const port = 3000

// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine("hbs", exphbs({ defaultLayout: 'main', extname: ".hbs" }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extend: true }))

app.get('/', (req, res) => {
  Todo.find()
  .lean()
  .then(todos => res.render('index', { todos }))
  .catch(error => console.error(error))
})

app.get('/todos/new', (req, res) => {
  return res.render('new')
})

app.post('/todos', (req, res) => {
  const name = req.body.name
  return Todo.create({name})
    .then( () => res.redirect('/'))
    .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}.`)
})