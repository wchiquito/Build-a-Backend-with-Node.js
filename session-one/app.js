var express = require('express')
var app = express()

app.get('/', function (req, res) {
  res.send('Hello World from get!')
})

app.post('/', function (req, res) {
  res.send('Hello World form post!')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})