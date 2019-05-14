import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cors from 'cors';
import passport from 'passport';
import mongoose from 'mongoose';
import config from './backend/config/database';

// Set up mongoose connection
mongoose.Promise = global.Promise;

mongoose.connect(config.database, { useNewUrlParser: true })
    .then(() => {
        console.log("Successfully connected to the database");    
    }).catch(err => {
        console.log('Could not connect to the database. Exiting now...', err);
        process.exit();
    });

const app = express();

// Port Number
const port = 3000;

// Body Parser Middleware
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// Index Route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to EasyUsers application. Take user quickly."});
});

require('./backend/routes/user.routes')(app)

// Start Server
app.listen(port, () => {
    console.log('Server started on port: ' + port);
});