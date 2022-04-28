const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

//// DB
const mongoose = require('mongoose');



//// DB

////// imported Middlewars


//import Routes file
const userRoutes = require('./routes/users');
const recordingRoutes = require('./routes/recordings');


////////////////////////////////////////////////////////////////
/////////////////////////////// APP ////////////////////////////
////////////////////////////////////////////////////////////////

const app = express();

////connect to mongoDB
mongoose.connect("mongodb+srv://maher2:ababab@cluster0.rtgkm.mongodb.net/learnHub?retryWrites=true&w=majority")
    .then(() => console.log('Mongodb connected successfully!'))
    .catch(err => console.log(err));

///////////////////////// MIDDLEWARES ///////////////////////////////
app.use(bodyParser.json()); //Parse incoming request bodies in a middleware before your handlers
app.use(bodyParser.urlencoded({extended: false}))

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS, POST, PATCH, PUT, DELETE");
    next();
})


//public media
app.use("/media",express.static(path.join('server/media')));




///////////Routes
app.use('/users', userRoutes);
app.use('/recordings', recordingRoutes);


////////// Listening
module.exports = app;
