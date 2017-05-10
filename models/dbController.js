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
console.log('Executing insertEventDocument');

  MongoClient.connect(mongoURL, function(err, db) {
        assert.equal(null, err);
        console.log('Trying to connect to collection events');

        let collection = db.collection('events');
        console.log('Conected to collection events')
        // Insert some documents
        collection.insertOne(event, function(err, result) {
            assert.equal(err, null);
            assert.equal(1, result.result.n);
            assert.equal(1, result.ops.length);
            console.log("Inserted 1 Event into the collection");
            callback(result);
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

let findAndUpdate = function (title, update, callback) {
    MongoClient.connect(mongoURL, function (err,db) {
        assert.equal(null, err);
        let collection = db.collection('events');
        eventMatched = collection.findOne({title: title})
        collection.updateOne({title: title},
            {$set: update}, (err, result) => {
                assert.equal(err, null);
                assert.equal(1, result.result.n);
                callback(result);
            }
         );
    });
};

let dropCollection = () => {
  MongoClient.connect(mongoURL, (err, db) => {
    assert.equal(null, err);
    db.collection('events').drop();
  });
};

module.exports = {helloDatabase, insertEventDocument, getAllEvents, getEventById, findAndUpdate, dropCollection};
