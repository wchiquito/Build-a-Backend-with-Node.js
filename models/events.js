let _eventList = [];

let compareById = (event, id) => event.id === parseInt(id, 10);

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

let add = event => new Promise(resolve => resolve(_eventList.push(event)));

let updateById = (id, update) =>
  new Promise((resolve, reject) => {
    let index = findIndexById(id);
    if (index > -1) resolve(_eventList.splice(index, 1, update));
    else reject(new EventError());
});

let deleteById = id =>
  new Promise((resolve, reject) => {
    let index = findIndexById(id);
    if (index > -1) resolve(_eventList.splice(index, 1));
    else reject(new EventError());
});

let Event = function(id, title, description, date) {
  this.id = id;
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

add(new Event(1,
  "Concierto Metallica",
  "Evento Musical de calidad",
  "2017-04-09"));
add(new Event(2,
  "Concierto Red Hot Chilli Peppers",
  "Evento Musical de calidad maxima",
  "2017-04-10"));
add(new Event(3,
  "Concierto Maroon 5",
  "Evento Musical para ligar",
  "2017-04-11"));
add(new Event(4,
  "Concierto Rolling Stones",
  "Evento Musical de leyenda",
  "2017-04-12"));
add(new Event(5,
  "Concierto Mago de Oz",
  "Evento Musical de ponerse en pie y alzar el puño",
  "2017-04-13"));

module.exports = { findAll, findById, add, updateById, deleteById };