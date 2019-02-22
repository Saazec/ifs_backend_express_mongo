const mongoose = require('mongoose');
const Operational = require('../models/operational');

const connUri = process.env.MONGO_LOCAL_CONN_URL;

module.exports = {

    add: (req, res) => {
        // mongoose.connect(connUri, { useNewUrlParser: true }, err => {
        //     if (err) res.status(500).send(err);
        const { serial, date, time, category, message, impact } = req.body;
        const operational = new Operational({ serial, date, time, category, message, impact });
        operational.save((err, operational) => {
            if (err) res.status(500).send(err);
            res.status(201).send(operational);
        })
        // })
    },

    getAll: (req, res) => {
        // mongoose.connect(connUri, { useNewUrlParser: true }, err => {
        //     if (err) res.status(500).send(err);
        Operational.find({}, (err, operational) => {
            if (err) res.status(500).send(err);
            // mongoose.disconnect(err => {
            //     if (err) res.status(500).send(err);
            res.status(200).send(operational);
        })
        // })
        // });
    },

    patch: (req, res) => {
        // mongoose.connect(connUri, { useNewUrlParser: true }, err => {
        //     if (err) res.status(500).send(err);
        Operational.findOne({ 'serial': req.body.serial }, (err, operational) => {
            if (err) res.status(404).send(err);
            operational.set(req.body);
            operational.save((err, updated) => {
                if (err) res.status(500).send(err);
                res.status(200).send(updated);
            })
        })
        // })
    },

    remove: (req, res) => {
        // mongoose.connect(connUri, { useNewUrlParser: true }, err => {
        //     if (err) res.status(500).send(err);
        Operational.findOne({ 'serial': req.body.serial }, (err, operational) => {
            if (err) res.status(404).send(err);
            if (operational) {
                operational.remove(err => {
                    if (err) res.status(500).send(err);
                    res.status(200).send({});
                })
            } else {
                const result = {};
                result.error = `Record does not exist`;
                result.status = 500;
                res.status(500).send(result);
            }
        })
        // })
    }
}