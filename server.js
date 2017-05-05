"use strict";

const express = require('express');
const server = express();
const config = require('./config/default');
const bodyParser = require('body-parser');
const events = require('./routes/events');

server.use(bodyParser.json({ type: 'application/json' }));

server.listen(config.PORT, () => console.log('App listening on port %d on %s!', config.PORT, config.NODE_ENV));

server.get('/', (req, res) => res.send('Build a Backend with Node.js and Express.js'));

server.route("/events")
  .get(events.findAll)
  .post(events.add);

server.route("/events/:id")
  .get(events.findById)
  .put(events.updateById)
  .delete(events.deleteById);

module.exports = server;
