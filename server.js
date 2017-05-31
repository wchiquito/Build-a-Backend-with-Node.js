"use strict";

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const events = require('./routes/events');
const users = require('./routes/users');
const mongoose = require('mongoose');
//const dbController = require('./models/dbController');
const mongoURL = 'mongodb://localhost:27017/events-inc';

mongoose.connect(mongoURL);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

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

app.route("/event/find")
  .post(events.find);

app.route("/logintest")
  .get(users.test);

//dbController.helloDatabase();

module.exports = app;
