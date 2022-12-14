const express = require('express')
const session = require('express-session')
//載入passport設定檔，寫在express-session之後
const usePassport = require('./config/passport')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const exphbs = require("express-handlebars")
const Todo = require('./models/todo')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')
require('./config/mongoose')
const flash = require('connect-flash')


const app = express()

//若要上傳heroku port會由heroku決定
const PORT = process.env.PORT

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

app.use(methodOverride('_method'))

app.engine("hbs", exphbs({ defaultLayout: 'main', extname: ".hbs" }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))

//呼叫passport並傳入app，要寫在路由之前
usePassport(app)
//掛載套件
app.use(flash())
//設定本地變數res.locals
app.use((req, res, next) => {
  console.log(req.user)
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

app.use(routes)



app.listen(PORT, () => {
  console.log(`Express is running on http://localhost:${PORT}.`)
})