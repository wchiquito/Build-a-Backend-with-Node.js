const Event = require('./Event');
const User = require('./User');
const mongoose = require('mongoose');

// Event management related functions
let insertEventDocument = function(event, callback) {
  let newEvent = new Event(event);
  newEvent.save()
    .then(newEvent => callback(newEvent))
    .catch(err => callback(err));
};

let getAllEvents = function (callback) {
  let query = Event.find()
    .then(events => callback(events))
    .catch(err => callback(err));
};

let getEventById = (idEvent, callback)  => {
  let query = Event.find({ _id: idEvent })
    .then(event => callback(event))
    .catch(err => callback(err)); 
};

let findAndUpdate = function (idEvent, update, callback) {
  let query = Event.update({ _id: idEvent }, update)
    .then(event => callback(event))
    .catch(err => callback(err));
};

let deleteById = (idEvent, callback) => {
  let query = Event.remove({ _id: idEvent })
    .then(event => callback(event))
    .catch(err => callback(err));
};

let find = (filter, callback)  => {
  let query = Event.find(filter)
    .then(event => callback(event))
    .catch(err => callback(err)); 
};

// User management related functions
let insertUserDocument = function(user, callback) {
  let newUser = new User(user);
  newUser.save()
    .then(newUser => callback(newUser))
    .catch(err => callback(err));
};

// General management related functions
let dropCollection = (collection) => {
  mongoose.connection.collections[collection].drop()
    .catch(err => console.log(`Error: %s`, err));
};

module.exports = { insertEventDocument, getAllEvents, getEventById, findAndUpdate, deleteById, find, insertUserDocument, dropCollection };