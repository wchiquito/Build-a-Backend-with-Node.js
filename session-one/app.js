"use strict";

const express = require('express')
const app = express()
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.listen(3000, () => console.log('App listening on port 3000!'));

let Event = function(id, title, description, date) {
  this.id = id;
  this.title = title;
  this.description = description;
  this.date = date;
};

let EventManager = function() {
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

  let EventError = function() {
    return {
      status: 404,
      message: "Event not found"
    }
  };

  return {
    findAll: findAll,
    findById: findById,
    add: add,
    updateById: updateById,
    deleteById: deleteById
  }
}

let eventManager = new EventManager();

eventManager.add(new Event(1,
                      "Concierto Metallica",
                      "Evento Musical de calidad",
                      "2017-04-09"));
eventManager.add(new Event(2,
                      "Concierto Red Hot Chilli Peppers",
                      "Evento Musical de calidad maxima",
                      "2017-04-10"));
eventManager.add(new Event(3,
                      "Concierto Maroon 5",
                      "Evento Musical para ligar",
                      "2017-04-11"));
eventManager.add(new Event(4,
                      "Concierto Rolling Stones",
                      "Evento Musical de leyenda",
                      "2017-04-12"));
eventManager.add(new Event(5,
                      "Concierto Mago de Oz",
                      "Evento Musical de ponerse en pie y alzar el puño",
                      "2017-04-13"));

app.get('/', (req, res) => res.send('Hello World from get with ES6!'));

app.get('/events', (req, res) => 
  eventManager.findAll()
    .then(events => res.send(events)));

app.get('/events/:id', (req, res) =>
  eventManager.findById(req.params.id)
    .then(event => res.send(event))
    .catch(err => res.status(404).send(err)));

app.post('/events', (req, res) =>
  eventManager.add(req.body)
    .then(() => res.end()));

app.put('/events/:id', (req, res) =>
  eventManager.updateById(req.params.id, req.body)
    .then(() => res.end())
    .catch(err => res.status(404).send(err)));

app.delete('/events/:id', (req, res) =>
  eventManager.deleteById(req.params.id)
    .then(() => res.end())
    .catch(err => res.status(404).send(err)));