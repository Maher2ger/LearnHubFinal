const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');



//// DB

////// imported Middlewars

//import Models

//import Routes file


////////////////////////////////////////////////////////////////
/////////////////////////////// APP ////////////////////////////
////////////////////////////////////////////////////////////////

const app = express();

////connect to mongoDB
//connect to mongoose
///////////////////////// MIDDLEWARES ///////////////////////////////
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS, POST, PATCH, PUT, DELETE");
    next();
})


//public media

app.use('', (req, res) => {
    console.log("get req!");
    res.status(200).json({
        message: 'server works!   maher'
    })
})
///////////////////////// MIDDLEWARES ///////////////////////////////



///////////Routes
