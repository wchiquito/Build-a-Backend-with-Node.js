const createHash = require('sha.js');
const dbController = require('./dbController');
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

let add = event => new Promise(resolve => { 
  let newEvent = new Event(event.title,
                            event.description,
                            event.date);
    dbController.insertEventDocument(newEvent, added => {
    resolve(new StatusMessage(200, 'Event Added!', added));
  });
});

let updateById = (id, update) =>
  new Promise((resolve, reject) => {
    dbController.findAndUpdate(id, update, result =>  resolve(new StatusMessage(200, 'Event updated!', result)));
});

let deleteById = id =>
  new Promise((resolve, reject) => {
    dbController.deleteById(id, result => resolve(new StatusMessage(200, 'Event deleted!')))
});

let createEventHash = event => sha256.update(event, 'utf8').digest('hex');

let Event = function(title, description, date) {
  this.title = title;
  this.description = description;
  this.date = date;
};

let EventError = function() {
  return {
    status: 404,
    message: "Event not found"
  }
};

let StatusMessage = function(...args) {
    this.status = args[0];
    this.message = args[1] || 'Operation finished';
    //this.length = _eventList.length;
    if (args[2]) this.event = args[2];
};

module.exports = { findAll, findById, add, updateById, deleteById, Event};