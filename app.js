import express from 'express';
import path from 'path';
import bodyParses from 'body-parser';
import cors from 'cors';
import passport from 'passport';
import mongoose from 'mongoose';
import config from './backend/config/database';
import users from './backend/routes/users';

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

// CORS Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'dist')));

// Body Parser Middleware
app.use(bodyParses.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./backend/config/passport')(passport);

app.use('/users', users);

// Index Route
app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
});
app.use(express.json());
// Start Server
app.listen(port, () => {
    console.log('Server started on port: ' + port);
});