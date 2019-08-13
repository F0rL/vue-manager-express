// @login & register
const express = require('express')
const router = express.Router()
const Profile = require('../../model/Profile')
const password = require('passport')

// $route   GET api/profiles/test
// @desc    返回请求的json数据
// @access  public
router.get('/test', (req, res) => {
  res.json({msg:'profile works'})
})

// $route   POST api/profiles/add
// @desc    新增信息
// @access  private
router.post('/add', password.authenticate('jwt', {session: false}), (req, res) => {
  const profileFields = {}
  if(req.body.type) profileFields.type = req.body.type
  if(req.body.describe) profileFields.describe = req.body.describe
  if(req.body.income) profileFields.income = req.body.income
  if(req.body.expend) profileFields.expend = req.body.expend
  if(req.body.cash) profileFields.cash = req.body.cash
  if(req.body.remark) profileFields.remark = req.body.remark

  new Profile(profileFields).save().then( profile => {
    res.json(profileFields)
  }).catch(err => res.json(err))
})

// $route   POST api/profiles/edit/:id
// @desc    编辑信息
// @access  private
router.post('/edit/:id', password.authenticate('jwt', {session: false}), (req, res) => {
  const profileFields = {}
  if(req.body.type) profileFields.type = req.body.type
  if(req.body.describe) profileFields.describe = req.body.describe
  if(req.body.income) profileFields.income = req.body.income
  if(req.body.expend) profileFields.expend = req.body.expend
  if(req.body.cash) profileFields.cash = req.body.cash
  if(req.body.remark) profileFields.remark = req.body.remark

  Profile.findOneAndUpdate(
      {_id: req.params.id},
      {$set: profileFields},
      {new: true}
    ).then(profile => res.json(profile))
     .catch(err => res.json(err))
})

// $route   delete api/profiles/delete/:id
// @desc    删除信息
// @access  private
router.delete('/delete/:id', password.authenticate('jwt', {session: false}), (req, res) => {
  Profile.findOneAndRemove({_id: req.params.id})
    .then(profile => {
      profile.save().then(profile => res.json(profile))
    })
    .catch(error => res.status(404).json(`删除失败，原因：${error.message}`))
})

// $route  GET api/profiles
// @desc    获取所有信息
// @access  private
router.get('/', password.authenticate('jwt', {session: false}), (req, res) => {
  Profile.find()
  .then(profile => {
    if(!profile) {
      return res.status(404).json('没有任何内容')
    }
    res.json(profile)
  })
  .catch(error => res.status(404).json(error))
})

// $route  GET api/profiles/:id
// @desc    获取单个信息
// @access  private
router.get('/:id', password.authenticate('jwt', {session: false}), (req, res) => {
  Profile.findOne({_id: req.params.id})
  .then(profile => {
    if(!profile) {
      return res.status(404).json('没有任何内容')
    }
    res.json(profile)
  })
  .catch(err => res.status(404).json(err))
})



module.exports = router