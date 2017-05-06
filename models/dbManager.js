// From https://raw.githubusercontent.com/am-MongoDB/MongoDB-Mongopop/master/javascripts/db.js

"use strict";

const MongoClient = require('mongodb').MongoClient;

function DB() {
  this.db = null;
}

DB.prototype.connect = uri => {
  let _this = this;
  return new Promise((resolve, reject) => {
		_this.db = null;
		if (_this.db) {
      resolve();
		} else {
			let __this = _this;
      MongoClient.connect(uri)
        .then(database => {
            __this.db = database;
            resolve();
        })
        .catch(error => {
          console.log('Error connecting: %s', error.message);
          reject(error.message);
        });
		}
	});
};

DB.prototype.close = () => {
  if (this.db) {
    this.db.close()
  		.then(() => {})
      .catch(error => console.log('Failed to close the database: %s', error.message));
	}
}

DB.prototype.countEvents = coll => {
  let _this = this;
	return new Promise((resolve, reject) => {
	  _this.db.collection(coll, (error, collection) => {
		  if (error) {
				console.log('Could not access collection: %s', error.message);
				reject(error.message);
			} else {
				collection.count()
					.then(count => resolve(count))
					.catch(err => {
						console.log('countEvents failed: %s', err.message);
						reject(err.message);
					});
				}
		});
	});
}

DB.prototype.getEvent = (coll, pattern) => {
	let _this = this;
	return new Promise((resolve, reject) => {
    _this.db.collection(coll, (error, collection) => {
			if (error) {
				console.log('Could not access collection: %s', error.message);
				reject(error.message);
			} else {
        collection.find(pattern)
          .toArray((error, eventArray) => {
              if (error) {
                console.log('Error reading from toArray: %s', error.message);
                reject(error.message);
              } else {
                resolve(eventArray);
              }
          });
			}
		});
	});
}

DB.prototype.insertEvent = (coll, newEvent) => {
  let _this = this;
	return new Promise((resolve, reject) => {
    _this.db.collection(coll, (error, collection) => {
      if (error) {
				console.log('Could not access collection: %s', error.message);
				reject(error.message);
			} else {
        collection.insertOne(newEvent)
				  .then(result => resolve(result.result.n))
          .catch(error => {
            console.log('Insert failed: %s', error.message);
            reject(error.message);
          });
			}
		});
	});
}

DB.prototype.updateEvent = (coll, pattern, update) => {
	let _this = this;
	return new Promise((resolve, reject) => {
		_this.db.collection(coll, (error, collection) => {
			if (error) {
				console.log('Could not access collection: %s', error.message);
				reject(error.message);
			} else {
				collection.updateOne(pattern, update)
					.then(result => resolve(result.result.nModified))
					.catch(error => {
						console.log('update failed: %s', error.message);
						reject(error.message);
				});
			}
		});
	});
}

DB.prototype.removeEvent = (coll, pattern, onlyOne) => {
	let _this = this;
	return new Promise((resolve, reject) => {
		_this.db.collection(coll, (error, collection) => {
			if (error) {
				console.log('Could not access collection: %s', error.message);
				reject(error.message);
			} else {
				collection.remove(pattern, onlyOne)
					.then(result => resolve(result.result.n))
					.catch(error => {
						console.log('remove failed: %s', error.message);
						reject(error.message);
					});
			}
		});
	});
}

DB.prototype.dropCollection = coll => {
	let _this = this;
	return new Promise((resolve, reject) => {
    _this.db.collection(coll, (error, collection) => {
			if (error) {
				console.log('Could not access collection: %s', error.message);
				reject(error.message);
			} else {
        collection.drop()
					.then(result => resolve(result))
					.catch(error => {
						console.log('drop failed: %s', error.message);
						reject(error.message);
					});
			}
		});
	});
}

module.exports = DB;