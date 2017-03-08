const express = require('express')
const app = express()

app.get('/', (req, res) => res.send('Hello World from get with ES6!'));

app.post('/', (req, res) => res.send('Hello World form post with ES6!'));

app.listen(3000, () =>  console.log('Example app listening on port 3000!'));