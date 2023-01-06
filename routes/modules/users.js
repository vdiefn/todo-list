const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')

//修改並設定登入路由，驗證登入狀態
router.get('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

//註冊
router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  User.findOne({ email })
  .then( user => {
    if (user) {
      console.log('User already exit.')
      res.render('register', { name, email, password, confirmPassword})
    } else {
     return  User.create({ name, email, password}) 
      .then( () => {
        res.redirect('/')
      })
      .catch( error => {
        console.log(error)
      })
    }
  })
})

router.get('/register', (req, res) => {
  res.render('register')
})

module.exports = router
