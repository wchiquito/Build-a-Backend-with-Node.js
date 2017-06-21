const Mongoose = require('mongoose');

const EventSchema = Mongoose.Schema({
  title: {
    type: String,
    required: true,
    index: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now(),
    required: true
  }
});

module.exports = Mongoose.model('Event', EventSchema);