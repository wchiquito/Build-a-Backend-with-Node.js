"use strict";

const express = require('express');
const app = express();
const config = require('./config/default');
const bodyParser = require('body-parser');
const events = require('./routes/events');

app.use(bodyParser.json({ type: 'application/json' }));

app.listen(config.PORT, () => console.log('App listening on port %d on %s!', config.PORT, config.NODE_ENV));

app.get('/', (req, res) => res.send('Build a Backend with Node.js and Express.js'));

app.route("/events")
  .get(events.findAll)
  .post(events.add);

app.route("/events/:id")
  .get(events.findById)
  .put(events.updateById)
  .delete(events.deleteById);

module.exports = app;
