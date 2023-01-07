module.exports = {
  authenticator: (req, res, next) => {
    if(req.isAuthenticated()) {
      return next()
    }
    //新增警告訊息
    req.flash('warning_msg','請先登入才能使用')
    res.redirect('/users/login')
  }
}