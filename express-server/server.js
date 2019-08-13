const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')

const app = express()

//users.js
const users = require('./routes/api/users')
//profile.js
const profiles = require('./routes/api/profiles')

//DB config
const dbURI = require('./config/keys').mongoURI

//使用body-parser中间件
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//Connect to mongodb
mongoose.connect(dbURI, {useNewUrlParser: true})
        .then(() => console.log('MongoDB Connected'))
        .catch(error => console.log(error))

// passport 初始化
app.use(passport.initialize());

require('./config/passport')(passport)

// app.get('/', (req, res) => {
//   res.send('hello world')
// })

app.use('/api/users', users)
app.use('/api/profiles', profiles)


let port = process.env.port || 8080

app.listen(port, ()=> {
  console.log(`Server is listening on port ${port}`)
})