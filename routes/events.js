"use strict";

const eventManager = require('../models/eventManager');

let findAll = (req, res) =>
  eventManager.findAll()
    .then(events => res.send(events));

let findById = (req, res) =>
  eventManager.findById(req.params.id)
    .then(event => res.send(event))
    .catch(err => res.status(404).send(err));

let add = (req, res) =>
  eventManager.add(req.body)
    .then(statusMessage => res.send(statusMessage));

let updateById = (req, res) =>
  eventManager.updateById(req.params.id, req.body)
    .then(statusMessage => res.send(statusMessage))
    .catch(err => res.status(404).send(err));

let deleteById = (req, res) =>
  eventManager.deleteById(req.params.id)
    .then(statusMessage => res.send(statusMessage))
    .catch(err => res.status(404).send(err));

module.exports = { findAll, findById, add, updateById, deleteById };