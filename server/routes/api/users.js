// @login & register
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../../model/User')
const gravatar = require('gravatar')

// $route   GET api/users/test
// @desc    返回请求的json数据
// @access  public
router.get('/test', (req, res) => {
  res.json({msg:'login works'})
})

// $route   GET api/users/register
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

module.exports = router