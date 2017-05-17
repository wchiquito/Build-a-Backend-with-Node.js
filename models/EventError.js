const Mongoose = require('mongoose');

const EventErrorSchema = Mongoose.Schema({
    status: {
        type: Number,
        default: 404,
        required: true
    },
    message: {
        type: String,
        default: "Event not found",
        required: true
    }
});

module.exports = Mongoose.model('EventError', EventErrorSchema);