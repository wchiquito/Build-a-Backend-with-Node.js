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
const nodeACL = require('acl');

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

//acl configuration
const acl = new nodeACL(new nodeACL.mongodbBackend(db.db, 'acl_', true));
acl.middleware = (req, res, next) => {
  let user_ID = req.user._id.toString(),
      event_ID = req.params.id;
  acl.isAllowed(user_ID, event_ID, req.method, (err, allowed) => { 
    if (err) console.log(err);
    console.log(`allowed ${allowed} - user_ID ${user_ID} - event_ID ${event_ID}`);
    if (allowed) next();
  });
}

//Server Configuration

app.use(bodyParser.json({ type: 'application/json' }));
//app.use(isAuthenticate);

app.use((req, res, next) => {
  passport.authenticate('basic', { session: false })(req, res, next);
});

app.listen(3000, () => console.log('App listening on port 3000!'));

//Routes

app.get('/', (req, res) => res.send('Build a Backend with Node.js and Express.js'));

app.route("/events")
  .get(events.findAll)
  .post(events.add, (req, res, next) => {
    acl.allow(req.event._id.toString(), `/events/${req.event._id.toString()}`, ['PUT', 'DELETE']);
    acl.addUserRoles(req.user._id.toString(), req.user._id.toString(), (err) => {
      if (err) console.log(`Role ${req.user._id.toString()} exists`);
      res.status(201).json(req.event);
    });
    acl.allowedPermissions(req.user._id.toString(), req.event._id.toString(), (err, permissions) => console.log('***********', permissions));
  });

app.route("/events/:id")
  .get(events.findById)
  .put(acl.middleware, events.updateById)
  .delete(acl.middleware, events.deleteById);

app.route("/event/find")
  .post(events.find);

app.route("/logintest")
  .get(users.test);

//dbController.helloDatabase();

app.get('/test',
  passport.authenticate('basic', { session: false }),
  function(req, res) {
    res.json({ username: req.user.username, email: req.user.email });
});

module.exports = app;
