let eventManager = require('../models/eventHandler');

function findAll(req, res) {
  eventManager.findAll()
    .then(events => res.send(events));
}

function findById(req, res) {
  eventManager.findById(req.params.id)
    .then(event => res.send(event))
    .catch(err => res.status(404).send(err));
}

function add(req, res, next) {
  eventManager.add(Object.assign({ "organizer": req.user._id }, req.body))
    .then(statusMessage => {
      res.locals.event = statusMessage;
      //res.send(statusMessage);
      next()
    });
}

function updateById(req, res) {
  eventManager.updateById(req.params.id, req.body)
    .then(statusMessage => res.send(statusMessage))
    .catch(err => res.status(404).send(err));
}

function deleteById(req, res) {
  eventManager.deleteById(req.params.id)
    .then(statusMessage => res.send(statusMessage))
    .catch(err => res.status(404).send(err));
}

function find(req, res) {
  eventManager.find(req.body)
    .then(statusMessage => res.send(statusMessage))
    .catch(err => res.status(404).send(err));
}

function findByOrganizer(req, res) {
  eventManager.find({"organizer": req.params.id})
    .then(result => res.send(result))
    .catch(err => res.status(404).send(err));
}

function subscribeUser(req, res) {
  eventManager.findById(req.params.eventId)
    .then(result => {
      let event = result[0]
      event.subscribers.push(req.params.userId)
      eventManager.updateById(req.params.eventId, event)
        .then(statusMessage => res.send(statusMessage))
        .catch(err => res.status(404).send(err));
    })
    .catch(err => res.status(404).send(err));
}

module.exports = { findAll, findById, add, updateById, deleteById, find, findByOrganizer, subscribeUser };