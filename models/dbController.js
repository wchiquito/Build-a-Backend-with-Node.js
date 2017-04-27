const MongoClient = require('mongodb').MongoClient;
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


module.exports = {helloDatabase, insertEventDocument, getAllEvents, findAndUpdate};
