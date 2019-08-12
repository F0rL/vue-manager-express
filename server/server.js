const express = require('express')

const app = express()

app.get('/', (req, res) => {
  res.send('hello world')
})

let port = process.env.port || 8080

app.listen(port, ()=> {
  console.log(`Server is listening on port ${port}`)
})