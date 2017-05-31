const createHash = require('sha.js');
const dbController = require('./dbController');
const Event = require('./Event');
const EventError = require('./EventError');
const StatusMessage = require('./StatusMessage');

let sha256 = createHash('sha256');

let _eventList = [];

let compareById = (event, id) => event.id === id;

let findAll = () => new Promise(resolve => {
  dbController.getAllEvents(result => resolve(result));
});

let findById = id => new Promise((resolve, reject) => {
  dbController.getEventById(id, result => resolve(result));
});

let findIndexById = id => {
  let index = _eventList.findIndex(event => compareById(event, id));
  if (index > -1) return index;
  else new EventError();
};

let add = event =>
  new Promise(resolve => {
    dbController.insertEventDocument(event, added => resolve(added));
});

let updateById = (id, update) =>
  new Promise(resolve => {
    dbController.findAndUpdate(id, update, result => resolve(result));
});

let deleteById = id =>
  new Promise(resolve => {
    dbController.deleteById(id, result => resolve(result));
});

let createEventHash = event => sha256.update(event, 'utf8').digest('hex');

let find = filter =>
  new Promise(resolve => {
    dbController.find(filter, result => resolve(result));
});

module.exports = { findAll, findById, add, updateById, deleteById, find/*, Event*/ };