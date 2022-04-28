const mongoose = require('mongoose');
//const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const recordingSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    comments: {
        type: String,
        required: false
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    sensors: {
        type: [String],
        required: true
    }
});


const recording = mongoose.model('Recording', recordingSchema);

module.exports = recording;
