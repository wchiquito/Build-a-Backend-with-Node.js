"use strict";

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const events = require('./routes/events');
const dbController = require('./models/dbController');



app.use(bodyParser.json({ type: 'application/json' }));

app.listen(3000, () => console.log('App listening on port 3000!'));

app.get('/', (req, res) => res.send('Build a Backend with Node.js and Express.js'));

app.route("/events")
  .get(events.findAll)
  .post(events.add);

app.route("/events/:id")
  .get(events.findById)
  .put(events.updateById)
  .delete(events.deleteById);

dbController.helloDatabase();


module.exports = app;
