const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')


router.get('/login', (req, res) => {
  res.render('login')
})

//修改並設定登入路由，驗證登入狀態
router.post('/login', passport.authenticate('local', {
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

//新增登出路由
router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/users/login')
})

module.exports = router
