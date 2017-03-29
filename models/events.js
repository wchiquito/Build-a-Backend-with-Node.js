let createHash = require('sha.js');
let sha256 = createHash('sha256');

let _eventList = [];

let compareById = (event, id) => event.id === id;

let findAll = () => new Promise(resolve => resolve(_eventList));

let findById = id => new Promise((resolve, reject) => {
  let event = _eventList.find(event => compareById(event, id));
  if (event) resolve(event);
  else reject(new EventError());
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
  _eventList.push(newEvent);
  resolve(new StatusMessage(200, 'Event added!', newEvent));
  });

let updateById = (id, update) =>
  new Promise((resolve, reject) => {
    let index = findIndexById(id);
    if (index > -1) {
      _eventList.splice(index, 1, update);
      resolve(new StatusMessage(200, 'Event updated!', update));
    }
    else reject(new EventError());
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
  this.id = createEventHash(this);
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

add(new Event(
  "Concierto Metallica",
  "Evento Musical de calidad",
  "2017-04-09"));
add(new Event(
  "Concierto Red Hot Chilli Peppers",
  "Evento Musical de calidad maxima",
  "2017-04-10"));
add(new Event(
  "Concierto Maroon 5",
  "Evento Musical para ligar",
  "2017-04-11"));
add(new Event(
  "Concierto Rolling Stones",
  "Evento Musical de leyenda",
  "2017-04-12"));
add(new Event(
  "Concierto Mago de Oz",
  "Evento Musical de ponerse en pie y alzar el puño",
  "2017-04-13"));

module.exports = { findAll, findById, add, updateById, deleteById };