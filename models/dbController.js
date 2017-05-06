"use strict";

const config = require('../config/default');
const dbManager = require('./dbManager');

let countEvents = callback => {
  let database = new dbManager;
  database.connect(config.MONGODB.defaultUri)
    .then(() => {
        database.countEvents(config.MONGODB.defaultCollection)
          .then(count => {
            database.close();
            callback(count);
          })
          .catch(error => {
            database.close();
            callback(error);
          });
    })
    .catch(error => callback(error));
};

/*let getAllEvents = callback => {
  let database = new dbManager;
  database.connect(config.MONGODB.defaultUri)
    .then(() => {
        database.getAllEvents(config.MONGODB.defaultCollection)
          .then(events => {
            database.close();
            callback(events);
          })
          .catch(error => {
            database.close();
            callback(error);
          });
    })
    .catch(error => callback(error));
};*/

let getEvent = (pattern, callback) => {
  let database = new dbManager;
  database.connect(config.MONGODB.defaultUri)
    .then(() => {
        database.getEvent(config.MONGODB.defaultCollection, pattern)
          .then(event => {
            database.close();
            callback(event);
          })
          .catch(error => {
            database.close();
            callback(error);
          });
    })
    .catch(error => callback(error));
};

let insertEvent = (newEvent, callback) => {
  let database = new dbManager;
  database.connect(config.MONGODB.defaultUri)
    .then(() => {
        database.insertEvent(config.MONGODB.defaultCollection, newEvent)
          .then(insertedEvent => {
            database.close();
            callback(insertedEvent);
          })
          .catch(error => {
            database.close();
            callback(error);
          });
    })
    .catch(error => callback(error));
};

let updateEvent = (pattern, update, callback) => {
  let database = new dbManager;
  database.connect(config.MONGODB.defaultUri)
    .then(() => {
        database.updateEvent(config.MONGODB.defaultCollection, pattern, update)
          .then(updatedEvent => {
            database.close();
            callback(updatedEvent);
          })
          .catch(error => {
            database.close();
            callback(error);
          });
    })
    .catch(error => callback(error));
};

let removeEvent = (pattern, onlyOne, callback) => {
  let database = new dbManager;
  database.connect(config.MONGODB.defaultUri)
    .then(() => {
        database.removeEvent(config.MONGODB.defaultCollection, pattern, onlyOne)
          .then(removedEvent => {
            database.close();
            callback(removedEvent);
          })
          .catch(error => {
            database.close();
            callback(error);
          });
    })
    .catch(error => callback(error));
};

module.exports = { countEvents/*, getAllEvents*/, getEvent, insertEvent, updateEvent, removeEvent };