const User = require('../models/user')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const bcrypt = require('bcryptjs')

//module.exports並初始化套件
module.exports = app => {
  //初始化passport模組
  app.use(passport.initialize())
  app.use(passport.session())
  //設定本地登入策略，密碼比對
  passport.use(new LocalStrategy({usernameField: 'email'}, (email, password, done) => {
    User.findOne({ email })
      .then( user => {
        if (!user) {
          return done (null, false, { message: "The email is not registered!" })
        }
        //密碼比對: bcrypt.compare
        return bcrypt.compare(password, user.password).then(isMatch => {
          if(!isMatch) {
            return done(null, false, { message: "Email of password is incorrect." })
          }
          return done (null, user)
        })
      })
      .catch(err => done(err, false))
  }))
  //設定使用facebook登入
  passport.use(new FacebookStrategy ({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK,
    profileFields: ['email', 'displayName']
  }, (accessToken, refreshToken, profile, done) => {
    console.log(profile)
    const { name, email } = profile._json
    User.findOne({ email })
      .then(user => {
        if(user) return done(null, user)
        const randomPassword = Math.random().toString(36).slice(-8)
        return bcrypt
          .genSalt(10)
          .then(salt => bcrypt.hash(randomPassword, salt))
          .then(hash => User.create({
            name,
            email,
            password: hash
          }))
          .then(user => done(null, user))
          .catch(err => done( err, false))
      })
  }))

  //設定序列化和反序列化
  passport.serializeUser((user, done) => {
    done (null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id)
    .lean()
    .then(user => done(null, user))
    .catch(err => done(err, null))
  })
}