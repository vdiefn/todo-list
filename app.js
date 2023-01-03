const express = require('express')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const exphbs = require("express-handlebars")
const Todo = require('./models/todo')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')
require('./config/mongoose')

const app = express()

//若要上傳heroku port會由heroku決定
const PORT = process.env.PORT || 3000

app.use(methodOverride('_method'))

app.engine("hbs", exphbs({ defaultLayout: 'main', extname: ".hbs" }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))

app.use(routes)



app.listen(PORT, () => {
  console.log(`Express is running on http://localhost:${PORT}.`)
})