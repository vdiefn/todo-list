const bcrypt = require('bcryptjs')
//一定要加上這行才可以
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Todo = require('../todo') // 載入 todo model
const User = require('../user')
const db = require('../../config/mongoose')
const SEED_USER = {
  name: 'root',
  email: 'root@example.com',
  password: '12345678'
}

db.once('open', () => {
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER.password, salt))
    .then(hash => User.create({
      name: SEED_USER.name,
      email: SEED_USER.email,
      password: hash
    }))
    .then(user => {
      const userId = user.id
      return Promise.all(Array.from(
        { length: 10 },
        ((_, i) => Todo.create({ name: `name-${i}`, userId }))
      ))
    })
    .then(() => {
      console.log('done')
      process.exit()
    })
})