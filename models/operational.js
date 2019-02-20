const mongoose = require('mongoose');
const { Schema } = mongoose;

const operationalSchema = new Schema({
    serial: {
        unique: true,
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: String,
        required: true,
        trim: true
    },
    time: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    message: {
        type: String,
        required: true,
        trim: true
    },
    impact: {
        type: String,
        required: true,
        trim: true
    }
});

module.exports = mongoose.model('Operational', operationalSchema);