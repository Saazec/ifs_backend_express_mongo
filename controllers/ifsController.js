const mongoose = require('mongoose');
const Ifs = require('../models/ifs');

const connUri = process.env.MONGO_LOCAL_CONN_URL;

module.exports = {

    add: (req, res) => {
        // mongoose.connect(connUri, { useNewUrlParser: true }, err => {
        //     if (err) res.status(500).send(err);
        const { caseNumber, source, feedbackType, division, reportedDate, createdOn, engineScore, lastSaved } = req.body;
        const ifs = new Ifs({ caseNumber, source, feedbackType, division, reportedDate, createdOn, engineScore, lastSaved });
        ifs.save((err, ifs) => {
            if (err) res.status(500).send(err);
            res.status(201).send(ifs);
        })
        // })
    },

    getAll: (req, res) => {
        // mongoose.connect(connUri, { useNewUrlParser: true }, err => {
        //     if (err) res.status(500).send(err);
        Ifs.find({}, (err, ifs) => {
            if (err) res.status(500).send(err);
            res.status(200).send(ifs);
        })
        // })
    },

    update: (req, res) => {
        // mongoose.connect(connUri, { useNewUrlParser: true }, err => {
        //     if (err) res.status(500).send(err);
        Ifs.findOne({ 'caseNumber': req.body.caseNumber }, (err, ifs) => {
            if (err) res.status(404).send(err);
            if (ifs) {
                ifs.set(req.body);
                ifs.save(err => {
                    if (err) res.status(500).send(err);
                    res.status(200).send(ifs);
                })
            } else {
                const result = {};
                result.status = 500;
                result.error = `Could not find record matching to caseNumber.`;
                res.status(500).send(result);
            }
        })
        // })
    },

    remove: (req, res) => {
        // mongoose.connect(connUri, { useNewUrlParser: true }, err => {
        //     if (err) res.status(500).send(err);
        Ifs.findOne({ 'caseNumber': req.body.caseNumber }, (err, ifs) => {
            if (err) res.status(404).send(err);
            if (ifs) {
                ifs.remove(err => {
                    if (err) res.status(500).send(err);
                    res.status(200).send({});
                })
            } else {
                const result = {};
                res.status = 500;
                res.error = `Could not find record matching to caseNumber.`;
                res.status(500).send(result);
            }
        })
        // })
    }
}