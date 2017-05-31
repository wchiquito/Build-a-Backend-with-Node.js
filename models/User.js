const Mongoose = require('mongoose');
const bcrypt   = require('bcrypt-nodejs');

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
        default: Date.now()
    }
});

UserSchema.methods.verifyPassword = function(password) {
    //return bcrypt.compareSync(password, this.password);
    return password === this.password;
};



module.exports = Mongoose.model('User', UserSchema);