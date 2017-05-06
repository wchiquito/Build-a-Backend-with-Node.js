"use strict";

const Event = require('../models/event');
const dbController = require('./dbController');

let StatusMessage = function(statusCode, message, count, event) {
  this.status = statusCode;
  this.message = message || 'Operation finished';
  this.length = count || 0;
  if (event) this.event = event;
};

let countEvents = () => new Promise((resolve, reject) => {
  dbController.countEvents(count => {
      if (count > 0) resolve(count)
      else reject(count)
  });
});

let findAll = () => new Promise((resolve, reject) => {
  dbController.getEvent({},
                        result => {
                          if (result) resolve(result)
                          else reject(new StatusMessage(404, 'Events not founds'));
                        });
});

let findById = id => new Promise((resolve, reject) => {
  dbController.getEvent({ _id: id },
                        result => {
                          if (result) resolve(result)
                          else reject(new StatusMessage(404, 'Event not found'));
                        });
});

let add = event => new Promise((resolve, reject) => {
  let newEvent = new Event(event.title,
                           event.description,
                           event.date);
  dbController.insertEvent(newEvent,
                           result => {
                             if (result === 1) {
                               dbController.countEvents(count => {
                                 resolve(new StatusMessage(200, 'Event added!', count, newEvent));
                               });
                             } else reject(new StatusMessage(503, 'Service Unavailable'));
                           });
});

let updateById = (id, update) => new Promise((resolve, reject) => {
  dbController.updateEvent({ _id: id },
                           update,
                           result => {
                             if (result > -1) {
                               dbController.countEvents(count => {
                                 resolve(new StatusMessage(200, 'Event updated!', count, update));
                               });
                             } else reject(new StatusMessage(500, results));
  });
});

let deleteById = id => new Promise((resolve, reject) => {
  dbController.removeEvent({ _id: id },
                            true,
                            result => {
                              if (result === 1) {
                                dbController.countEvents(count => {
                                  resolve(new StatusMessage(200, 'Event deleted!', count));
                                });
                              } else reject(new StatusMessage(404, 'Event not found'));
  });
});

let dropCollection = () => new Promise((resolve, reject) => {
  dbController.dropCollection(result => {
    if (result) resolve()
    else reject();
  });
});

module.exports = { findAll, findById, add, updateById, deleteById, dropCollection };