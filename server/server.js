const express = require('express')
const mongoose = require('mongoose')

const app = express()

//DB config
const dbURI = require('./config/keys').mongoURI


mongoose.connect(dbURI, {useNewUrlParser: true})
        .then(() => console.log('MongoDB Connected'))
        .catch(error => console.log(error))

app.get('/', (req, res) => {
  res.send('hello world')
})

let port = process.env.port || 8080

app.listen(port, ()=> {
  console.log(`Server is listening on port ${port}`)
})