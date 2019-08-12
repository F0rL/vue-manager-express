const express = require('express')

const app = express()

app.get('/', (req, res) => {
  res.send('hello kuma')
})

const port = process.env.port || 8080

app.listen(port, () => {
  console.log(`server listening on port ${port}!`)
})