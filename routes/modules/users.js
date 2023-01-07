const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')
const bcrypt = require('bcryptjs')


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
  const errors =[]
  if(!name || !email || !password || !confirmPassword) {
    errors.push({message: '所有欄位都是必填的！'})
  }
  if(password !== confirmPassword){
    errors.push({message: '密碼與確認密碼不相符。'})
  }
  if(errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  }
  User.findOne({ email })
  .then( user => {
    if (user) {
      errors.push({message: '該Email已經註冊過了。'})
      return res.render('register', {
        errors, 
        name, 
        email, 
        password, 
        confirmPassword
      })
    } 
     return  bcrypt
      .genSalt(10)
      .then (salt => bcrypt.hash(password, salt))
      .then (hash => User.create({
        name,
        email,
        password:hash
      })) 
      .then( () => {
        res.redirect('/')
      })
      .catch( error => {
        console.log(error)
      })
  })
})

router.get('/register', (req, res) => {
  res.render('register')
})

//新增登出路由
router.get('/logout', (req, res) => {
  req.logout()
  //新增成功訊息
  req.flash('success_msg', '你已經成功登出。')
  res.redirect('/users/login')
})

module.exports = router
