const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const mongoURL = 'mongodb://localhost:27017/events-inc';
const assert = require('assert');

let helloDatabase = function () {
  MongoClient.connect(mongoURL, function(err, db) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    db.close();
  });
};

let insertEventDocument = function(event, callback) {
  MongoClient.connect(mongoURL, function(err, db) {
    assert.equal(null, err);
    let collection = db.collection('events');
    collection.insertOne(event, function(err, result) {
      assert.equal(err, null);
      assert.equal(1, result.result.n);
      assert.equal(1, result.ops.length);
      callback(event);
    });
    db.close();
  });
};

let getAllEvents = function (callback) {
  MongoClient.connect(mongoURL, function(err, db) {
    assert.equal(null, err);
    let collection = db.collection('events');
    collection.find({}).toArray((err, docs) => callback(docs));
    db.close();
  });
};

let getEventById = (idEvent, callback)  => {
  MongoClient.connect(mongoURL, (err, db) => {
    assert.equal(null, err);
    let collection = db.collection('events');
    collection.findOne({ _id: new ObjectID(idEvent)})
      .then(event => callback(event))
      .catch(err => callback(err)
      .then(() => db.close()));
  });
};

let findAndUpdate = function (idEvent, update, callback) {
  MongoClient.connect(mongoURL, function (err,db) {
    assert.equal(null, err);
    let collection = db.collection('events');
    collection.updateOne({_id: new ObjectID(idEvent)},
      { $set: update }, (err, result) => {
          assert.equal(err, null);
          assert.equal(1, result.result.n);
          callback(update);
      });
  });
};

let dropCollection = () => {
  MongoClient.connect(mongoURL, (err, db) => {
    assert.equal(null, err);
    db.collection('events').drop();
  });
};

let deleteById = (id, callback) => {
  MongoClient.connect(mongoURL, (err, db) => {
    assert.equal(null, err);
    db.collection('events').remove({"_id": new ObjectID(id) }, (err, result)=> {
      assert.equal(null, err);
      assert.equal(1, result.result.n);
      callback(result);
      db.close();
    } )
  });
};

module.exports = {helloDatabase, insertEventDocument, getAllEvents, getEventById, findAndUpdate, dropCollection, deleteById};
