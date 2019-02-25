const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/users');

const connUri = process.env.MONGO_LOCAL_CONN_URL;

module.exports = {

    add: (req, res) => {
        const { name, password } = req.body;
        const user = new User({ name, password });
        user.save((err, user) => {
            if (err) res.status(500).send(err);
            res.status(201).send(user);
        })
    },


    login: (req, res) => {
        const { name, password } = req.body;
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
    },

    getAll: (req, res) => {
        User.find({}, (err, users) => {
            if (!err) {
                res.send(users);
            } else {
                console.log('Error', err);
            }
        });
    }
}