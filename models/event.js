"use strict";

const createHash = require('sha.js');
const sha256 = createHash('sha256');

let createEventHash = event => sha256.update(event, 'utf8').digest('hex');

let Event = function(title, description, date) {
  this.id = createEventHash(this);
  this.title = title;
  this.description = description;
  this.date = date;
};

module.exports = Event;