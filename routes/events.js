"use strict";

const eventManager = require('../models/eventManager');

let findAll = (req, res) =>
  eventManager.findAll()
    .then(events => res.send(events));

let findById = (req, res) =>
  eventManager.findById(req.params._id)
    .then(event => res.send(event))
    .catch(error => res.status(404).send(error));

let add = (req, res) =>
  eventManager.add(req.body)
    .then(statusMessage => res.send(statusMessage));

let updateById = (req, res) =>
  eventManager.updateById(req.params._id, req.body)
    .then(statusMessage => res.send(statusMessage))
    .catch(error => res.status(404).send(error));

let deleteById = (req, res) =>
  eventManager.deleteById(req.params._id)
    .then(statusMessage => res.send(statusMessage))
    .catch(error => res.status(404).send(error));

module.exports = { findAll, findById, add, updateById, deleteById };