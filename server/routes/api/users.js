// @login & register
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../../model/User')
const gravatar = require('gravatar')
const jwt = require('jsonwebtoken')
const jwtKey = require('../../config/keys.js').secretOrKey

// $route   GET api/users/test
// @desc    返回请求的json数据
// @access  public
router.get('/test', (req, res) => {
  res.json({msg:'login works'})
})

// $route   POST api/users/register
// @desc    返回请求的json数据
// @access  public
router.post('/register', (req, res) => {
  //查询数据库中是否已有此邮箱
  User.findOne({email: req.body.email})
      .then(user => {
        if(user){
          return res.status(400).json({email: '邮箱已被注册'})
        }else {
          let avatar = gravatar.url(req.body.email, {s: '200', r: 'pg', d: 'mm'})

          const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            avatar
          })

          bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if(err) throw err

              newUser.password = hash
              newUser.save()
                      .then(user => res.json(user))
                      .catch(err => console.log(err))
            });
          });
        }
      })
      .catch( err => console.log(err))
})

// $route   POST api/users/login
// @desc    返回token
// @access  public
router.post('/login', (req, res) => {
  const email = req.body.email
  const password = req.body.password
  //查询数据
  User.findOne({email})
      .then(user => {
        if(!user) {
          return res.status(404).json({email: '用户不存在'})
        };

        // 密码匹配
        bcrypt.compare(password, user.password)
              .then(isMatch => {
                if(isMatch) {
                  const rule = {id: user.id, name: user.name}
                  jwt.sign(rule, jwtKey, {expiresIn: 3600}, (err, token) => {
                    if(err) throw err

                    res.json({
                      success: true,
                      token: 'kuma' + token
                    })
                  })
                }else {
                  return res.status(400).json({password: '密码错误'})
                }
              })
      })
})

module.exports = router