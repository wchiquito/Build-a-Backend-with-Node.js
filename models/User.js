const Mongoose = require('mongoose');

const UserSchema = Mongoose.Schema({
    username: {
        type: String,
        required: true,
        index: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
        required: true
    },
    dateCreated:{
        type: Date,
        default: Date.now(),
        required: true
    }
});

module.exports = Mongoose.model('User', UserSchema);