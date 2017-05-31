const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const assert = require('assert');
const Event = require('./Event');
const mongoose = require('mongoose');

//let helloDatabase = () => mongoose.connect(mongoURL, () => console.log("Connected successfully to server through mongoose"));

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

let dropCollection = () => {
  Event.collection.drop();
};

let deleteById = (idEvent, callback) => {
  let query = Event.remove({ _id: idEvent })
    .then(event => callback(event))
    .catch(err => callback(err));
};

module.exports = { /*helloDatabase, */insertEventDocument, getAllEvents, getEventById, findAndUpdate, dropCollection, deleteById };
