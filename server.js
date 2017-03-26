"use strict";

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const events = require('./routes/events');
const appPORT = process.env.PORT || 3000;
const appNODE_ENV = process.env.NODE_ENV || 'dev';

app.use(bodyParser.json({ type: 'application/json' }));

app.listen(appPORT, () => console.log('App listening on port %d on %s!', appPORT, appNODE_ENV));

app.get('/', (req, res) => res.send('Build a Backend with Node.js and Express.js'));

app.route("/events")
  .get(events.findAll)
  .post(events.add);

app.route("/events/:id")
  .get(events.findById)
  .put(events.updateById)
  .delete(events.deleteById);

module.exports = app;
