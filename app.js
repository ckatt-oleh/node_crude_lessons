import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
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
const router = express.Router();

// Port Number
const port = 4000;

app.use(cors());
// Body Parser Middleware
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    res.header("content-type","application/json");
    res.header("access-control-allow-headers", "origin", 
        "x-requested-with", "accept");
    next();
});
  
// Index Route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to EasyUsers application. Take user quickly."});
});

require('./backend/routes/user.routes')(app)

app.use('/', router);
// Start Server
app.listen(port, () => {
    console.log('Server started on port: ' + port);
});