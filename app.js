const express = require('express')

// const mongoose = require('mongoose') // 載入 mongoose
//一定要這行↓
// require('dotenv').config({ path: '.env' })
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
// mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }) // 設定連線到 mongoDB


const exphbs = require("express-handlebars")
const Todo = require('./models/todo')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')
require('./config/mongoose')

const app = express()

//若要上傳heroku port會由heroku決定
// const port = 3000
const PORT = process.env.PORT || 3000

// 取得資料庫連線狀態
// const db = mongoose.connection
// 連線異常
// db.on('error', () => {
//   console.log('mongodb error!')
// })
// 連線成功
// db.once('open', () => {
//   console.log('mongodb connected.')
// })

app.use(methodOverride('_method'))

app.engine("hbs", exphbs({ defaultLayout: 'main', extname: ".hbs" }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))

app.use(routes)


//app.get('/', (req, res) => {
  //Todo.find()
  //.lean()
  //.sort({_id: 'asc'})
  //.then(todos => res.render('index', { todos }))
  //.catch(error => console.error(error))
//})


// post('/todos', (req, res) => {
//   const name = req.body.name
//   return Todo.create({ name })
//     .then(() => res.redirect('/'))
//     .catch(error => console.log(error))
// })

// app.post('/todos', (req, res) => {
//   const name = req.body.name
//   return Todo.create({name})
//     .then( () => res.redirect('/'))
//     .catch(error => console.log(error))
// })

// app.get('/todos/:id', (req, res) => {
//   const id = req.params.id
//   return Todo.findById(id)
//     .lean()
//     .then((todo) => res.render('detail', {todo}))
//     .catch (error => console.log(error))
// })

// app.get('/todos/:id/edit', (req, res) => {
//   const id = req.params.id
//   return Todo.findById(id)
//     .lean()
//     .then((todo) => res.render('edit', { todo }))
//     .catch(error => console.log(error))
// })

// app.put('/todos/:id', (req, res) => {
//   const id = req.params.id
//   const {name, isDone} = req.body
//   return Todo.findById(id)
//     .then (todo => {
//       todo.name = name
//       todo.isDone = isDone ==="on"
//       return todo.save()
//     })
//     .then (() => res.redirect(`/todos/${id}`))
//     .catch(error => console.log(error))
// })

// app.delete('/todos/:id', (req, res) =>{
//   const id = req.params.id
//   return Todo.findById(id)
//     .then (todo => todo.remove())
//     .then (() => res.redirect('/'))
//     .catch(error => console.log(error))
// })



app.listen(PORT, () => {
  console.log(`Express is running on http://localhost:${PORT}.`)
})