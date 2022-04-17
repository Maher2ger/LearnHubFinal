const mongoose = require('mongoose');
//const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true

    },
    password: {
        type: String,
        required: true
    },
    student_number: {
        type: String,
        required: false
    },
    role: {
        type: String,
        required: true
    }
});

//userSchema.plugin(uniqueValidator);

const user = mongoose.model('User', userSchema);

module.exports = user;
