require('dotenv').config();

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');
const mongoose = require('mongoose');
const connUri = process.env.MONGO_LOCAL_CONN_URL;

const app = express();
const router = express.Router();

const environment = process.env.NODE_ENV;
const stage = require('./config')[environment];

app.use(cors());    // middleware function to enable CORS (Cross Origin Resource Sharing).
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (environment !== 'production') {
    app.use(logger('dev'));
}

app.use('/api', routes(router));

mongoose.connect(connUri, { useNewUrlParser: true }, err => {
    if (err) {
        console.log(`Error connecting to database.`);
    } else {
        // Once the connection to the database has been established, start listening to incoming requests.
        app.listen(`${stage.port}`, () => {
            console.log(`Server now listening at localhost:${stage.port}`);
        })
    }
})

// app.listen(`${stage.port}`, () => {
//     console.log(`Server now listening at localhost:${stage.port}`);
// });

module.exports = app;