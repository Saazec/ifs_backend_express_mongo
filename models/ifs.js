const mongoose = require('mongoose');

const { Schema } = mongoose;

const ifsSchema = new Schema({
    caseNumber: {
        type: 'String',
        required: true,
        trim: true,
        unique: true
    },
    source: {
        type: 'String',
        required: true,
        trim: true
    },
    feedbackType: {
        type: 'String',
        required: true,
        trim: true
    },
    division: {
        type: 'String',
        required: true,
        trim: true
    },
    reportedDate: {
        type: 'String',
        required: true,
        trim: true
    },
    createdOn: {
        type: 'String',
        required: true,
        trim: true
    },
    engineScore: {
        type: 'String',
        required: true,
        trim: true,
        default: 'POS'
    },
    lastSaved: {
        type: 'String',
        required: true,
        trim: true,
        default: 'Jhon Whik'
    }
});

module.exports = mongoose.model('Ifs', ifsSchema);