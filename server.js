"use strict";

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const events = require('./routes/events');
const users = require('./routes/users');
const User = require('./models/User');
const mongoose = require('mongoose');
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;

///Database configuration
//const dbController = require('./models/dbController');
const mongoURL = 'mongodb://localhost:27017/events-inc';

mongoose.connect(mongoURL);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

//Authenticate configuration
passport.use(new BasicStrategy(
  function(userid, password, done) {
    User.findOne({ username: userid }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.verifyPassword(password)) { return done(null, false); }
      return done(null, user);
    });
  }
));

//Server Configuration

app.use(bodyParser.json({ type: 'application/json' }));
//app.use(isAuthenticate);

app.listen(3000, () => console.log('App listening on port 3000!'));

//Routes

app.get('/', (req, res) => res.send('Build a Backend with Node.js and Express.js'));

app.route("/events")
  .get(passport.authenticate('basic', { session: false }), events.findAll)
  .post(passport.authenticate('basic', { session: false }), events.add);

app.route("/events/:id")
  .get(passport.authenticate('basic', { session: false }), events.findById)
  .put(passport.authenticate('basic', { session: false }), events.updateById)
  .delete(passport.authenticate('basic', { session: false }), events.deleteById);

app.route("/event/find")
  .post(passport.authenticate('basic', { session: false }), events.find);

app.route("/logintest")
  .get(users.test);

//dbController.helloDatabase();

app.get('/test',
  passport.authenticate('basic', { session: false }),
  function(req, res) {
    res.json({ username: req.user.username, email: req.user.email });
});

module.exports = app;
