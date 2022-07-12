//commentation done


//import socket modules
const {createServer} = require("http");
const sio = require("socket.io");

//Import the app file with all routes and middlewares
const app = require('./server/app');
//Import all socket configurations from socket.js
const socketConf = require("./server/socket");

//Server creation
const port = process.env.PORT || 3500;
const httpServer = createServer(app);
httpServer.listen(port, function () {
    console.log('Server works on port ' + port);
})


// Socket setup & pass server
const io = sio(httpServer, {
  cors: {
  origin: "*",
    methods: ["GET", "POST"]
}}
);

// ------ Socket connection init ----------
io.on('connection', socketConf);
