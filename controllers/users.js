const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/users');

const connUri = process.env.MONGO_LOCAL_CONN_URL;

module.exports = {
    // add: (req, res) => {
    //     mongoose.connect(connUri, { useNewUrlParser: true }, err => {
    //         let result = {};
    //         let status = 201;
    //         if (!err) {
    //             const { name, password } = req.body;
    //             const user = new User({ name, password });
    //             user.save((err, user) => {
    //                 if (!err) {
    //                     result.status = status;
    //                     result.result = user;
    //                 } else {
    //                     status = 500;
    //                     result.status = status;
    //                     result.error = err;
    //                 }
    //                 res.status(status).send(result);
    //             });
    //         } else {
    //             status = 500;
    //             result.status = status;
    //             result.error = err;
    //             res.status(status).send(result);
    //         }
    //     });
    // },

    add: (req, res) => {
        // mongoose.connect(connUri, { useNewUrlParser:  true }, err => {
        //     if (err) res.status(500).send(err);
        const { name, password } = req.body;
        const user = new User({ name, password });
        user.save((err, user) => {
            if (err) res.status(500).send(err);
            res.status(201).send(user);
        })
        // })
    },

    // login: (req, res) => {
    //     const { name, password } = req.body;

    //     mongoose.connect(connUri, { useNewUrlParser: true }, err => {
    //         let result = {};
    //         let status = 200;
    //         if (!err) {
    //             User.findOne({ name }, (err, user) => {
    //                 if (!err) {
    //                     if (user) {
    //                         bcrypt.compare(password, user.password)
    //                             .then(match => {
    //                                 if (match) {

    //                                     // creating token
    //                                     const payload = { user: user.name };
    //                                     const options = {
    //                                         expiresIn: '2d',
    //                                         issuer: 'https://scotch.io'
    //                                     };
    //                                     const secret = process.env.JWT_SECRET;
    //                                     const token = jwt.sign(payload, secret, options);
    //                                     // console.log('Token: ', token);
    //                                     result.token = token;
    //                                     // result.status = status;
    //                                     // result.result = user;
    //                                 } else {
    //                                     status = 401;
    //                                     result.status = status;
    //                                     result.error = 'Authentication Error';
    //                                 }
    //                                 res.status(status).send(result);
    //                             }).catch(err => {
    //                                 status = 500;
    //                                 result.status = status;
    //                                 result.error = err;
    //                                 res.status(status).send(result);
    //                             });
    //                     } else {
    //                         res.status(404).send({ 'Error': 'User does not exist' });
    //                     }

    //                 } else {
    //                     status = 404;
    //                     res.status = status;
    //                     result.err = err;
    //                     res.status(status).send(result);
    //                 }
    //             });
    //         } else {
    //             status = 500;
    //             result.status = status;
    //             result.error = err;
    //             res.status(status).send(result);
    //         }
    //     });
    // },

    login: (req, res) => {
        const { name, password } = req.body;
        // mongoose.connect(connUri, { useNewUrlParser: true }, err => {
        // if (err) res.status(500).send(err);
        User.findOne({ name }, (err, user) => {
            if (err) res.status(404).send(err);
            if (user) {
                bcrypt.compare(password, user.password)
                    .then(match => {
                        if (!match) res.status(400).send({ 'Error': 'Authentication failed, Invalid password' });
                        const payload = { user: user.name };
                        const options = {
                            expiresIn: '2d',
                            issuer: 'https://scotch.io'
                        };
                        const secret = process.env.JWT_SECRET;
                        const token = jwt.sign(payload, secret, options);

                        res.status(200).send({ token });
                    })
            } else {
                res.status(404).send({ 'Error': 'User not found' });
            }
        })
        // })
    },

    getAll: (req, res) => {
        // mongoose.connect(connUri, { useNewUrlParser: true }, err => {
        User.find({}, (err, users) => {
            if (!err) {
                res.send(users);
            } else {
                console.log('Error', err);
            }
        });
        // });
    }
}