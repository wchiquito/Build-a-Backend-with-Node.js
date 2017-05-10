const createHash = require('sha.js');
const dbController = require('./dbController');
let sha256 = createHash('sha256');

let _eventList = [];

let compareById = (event, id) => event.id === id;

let findAll = () => new Promise(resolve => {
  dbController.getAllEvents(result => resolve(result));
});

let findById = id => new Promise((resolve, reject) => {
  /*let event = _eventList.find(event => compareById(event, id));
  if (event) resolve(event);
  else reject(new EventError());*/
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
  console.log('Created new event', newEvent);
  //_eventList.push(newEvent);
  dbController.insertEventDocument(newEvent, added => {
    console.log("fin");
    resolve(new StatusMessage(200, 'Event Added!', added));
  });
});

let updateById = (id, update) =>
  new Promise((resolve, reject) => {
    //let index = findIndexById(id);
    //if (index > -1) {
      //_eventList.splice(index, 1, update);
      
   // }
    //else reject(new EventError());
    dbController.findAndUpdate(id,update, result =>  resolve(new StatusMessage(200, 'Event updated!', result)));
});

let deleteById = id =>
  new Promise((resolve, reject) => {
    let index = findIndexById(id);
    if (index > -1) {
      let event = _eventList.splice(index, 1);
      resolve(new StatusMessage(200, 'Event deleted!', event[0]));
    } else reject(new EventError());
});

let createEventHash = event => sha256.update(event, 'utf8').digest('hex');

let Event = function(title, description, date) {
  //this.id = createEventHash(this);
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

let StatusMessage = function(statusCode, message, event) {
    this.status = statusCode;
    this.message = message || 'Operation finished';
    this.length = _eventList.length;
    this.event = event;
};

module.exports = { findAll, findById, add, updateById, deleteById, Event};