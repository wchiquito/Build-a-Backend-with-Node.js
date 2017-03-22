let eventManager = require('../models/events');

function findAll(req, res) {
  eventManager.findAll()
    .then(events => res.send(events));
}

function findById(req, res) {
  eventManager.findById(req.params.id)
    .then(event => res.send(event))
    .catch(err => res.status(404).send(err));
}

function add(req, res) {
  eventManager.add(req.body)
    .then(statusMessage => res.send(statusMessage));
}

function updateById(req, res) {
  eventManager.updateById(req.params.id, req.body)
    .then(() => res.end())
    .catch(err => res.status(404).send(err));
}

function deleteById(req, res) {
  eventManager.deleteById(req.params.id)
    .then(statusMessage => res.send(statusMessage))
    .catch(err => res.status(404).send(err));
}

module.exports = { findAll, findById, add, updateById, deleteById };