const Mongoose = require('mongoose');
const StatusMessageSchema = Mongoose.Schema({
    status: {
        type: Number,
        default: 404,
        required: true
    },
    message: {
        type: String,
        default: "Operation finished",
        required: true
    }
});

module.exports = Mongoose.model('StatusMessage', StatusMessageSchema);