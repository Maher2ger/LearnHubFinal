const http = require('http');
const app = require('./server/app');
const {createServer} = require("http");
const {Server} = require("socket.io");
const sio = require("socket.io");


const port = process.env.PORT || 3500;
const httpServer = createServer(app);
httpServer.listen(port, function () {
    console.log('Server works on port ' + port);
})

// Socket setup & pass server

const io = sio(httpServer, {
    origins: ["*"],
    handlePreflightRequest: (req, res) => {
        res.writeHead(200, {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,POST",
            "Access-Control-Allow-Headers": "my-custom-header",
            "Access-Control-Allow-Credentials": true
        });
        res.end();
    }
});


let controlPanelId = null;  //ControlPanel Socket ID: null by default, will get a value
// , when the control Panel is connected
let isRecording = false;    //is true, when the conrolpanel is recording

// ------ Socket connection init ----------
//
io.on('connection', (socket) => {   // when new client connect to the io socket
                                    //socket.handshake.headers.type: header field, tells us, if the client is a webbrowser or the control panel (python)
                                    // + socket ID
    console.log(socket.handshake.headers.type + " connected, id: " + socket.id); // show when the client connected

    let recording;




    //if the client is controlloanel
    if (socket.handshake.headers.type == 'controlpanel') {
        controlPanelId = socket.id;     //store the controlpanel socket ID in the controlPanelId variable
        socket.broadcast.emit("controlpanelConnected", true);
        socket.broadcast.emit('S_notifacation',
            {
                title: "ControlPanel",
                message: "controlpanel connected",
                timestamp: new Date().toTimeString().split(' ')[0],
                color: 'text-success'
            });
        setTimeout(() => {
            io.to(controlPanelId).emit("S_getSensorsList");        //ask for the sensorsList from the controlpanel
        }, 50)
    }

    if (socket.handshake.headers.type == 'browser_client') {
        socket.emit("controlpanelConnected", true);
    }

    //when a client disconnects
    socket.on("disconnect", () => {
        //check if this client is the controlpanel
        if (socket.handshake.headers.type == "controlpanel") {
            controlPanelId = null;  //reset the controlPanelId
            socket.broadcast.emit("controlpanelConnected", false);
            isRecording = false;
            socket.broadcast.emit("isRecording", false);
            socket.broadcast.emit('S_notifacation',
                {
                    title: "ControlPanel",
                    message: "controlpanel disconnected",
                    timestamp: new Date().toTimeString().split(' ')[0],
                    color: 'text-danger'
                });

        }
        console.log(socket.handshake.headers.type + " with ID +" + socket.id + " logged out!");
    });

    //-------------------------------------------------------------------------------------

    //// -- Controlpanel

    socket.on('CP_sensorsListData', (data) => {
            if (controlPanelId) {
                socket.broadcast.emit('S_sensorsListData', data);
            } else {
                socket.emit('S_notifacation',
                    {
                        title: "",
                        message: "ControlPanel not connected!",
                        timestamp: new Date().toTimeString().split(' ')[0],
                        color: 'text-warning'
                    });
            }
        }
    )


    //// -- Browser CLients
    socket.on('B_startRecording', (data) => {
            if (controlPanelId) {
                console.log("recording started");

                io.to(controlPanelId).emit('S_startRecording', data['sensors']);
                isRecording = true;
                socket.emit('isRecording', true);
                socket.emit('S_notifacation',
                    {
                        title: "start-recording",
                        message: "recording started",
                        timestamp: new Date().toTimeString().split(' ')[0],
                        color: 'text-success'
                    });
                recording = {
                    id:"###",
                    name: data['recordingName'],
                    sensors: [],
                    comments: data['comments'],
                    startTime: new Date(),
                    endTime: ''
                }

                for (let sensor in data['sensors']) {
                    if (data['sensors'][sensor]) {
                        console.log(sensor);
                        recording.sensors.push(sensor)
                    }
                }



            } else {
                socket.emit('S_notifacation',
                    {
                        title: "start-recording",
                        message: "start recording is not possible, ControlPanel is not connected!",
                        timestamp: new Date().toTimeString().split(' ')[0],
                        color:"text-warning"
                    });
            }
            //we create a new recording instance
            //some values like id, endtime will be recieved after recording is finished

        }
    )

    socket.on('B_stopRecording', () => {
        if (controlPanelId) {
            console.log("recording stopped");
            io.to(controlPanelId).emit('S_stopRecording');
            isRecording = false;
            socket.emit('isRecording', false);
            socket.emit('S_notifacation',
                {
                    title: "Stop-recording",
                    message: "Recording has been stopped",
                    timestamp: new Date().toTimeString().split(' ')[0],
                    color: 'text-success'
                });
            recording.endTime = new Date();
            recording.duration =  (recording.endTime - recording.startTime)/1000;
            console.log(recording);
            io.emit('recording', recording);
        } else {
            socket.emit('S_notifacation',
                {
                    title: "Stop-Recording",
                    message: "stop recording is not possible, ControlPanel not connected!",
                    timestamp: new Date().toTimeString().split(' ')[0],
                    color: 'text-warning'
                });        }


    })

    socket.on('B_getSensorsList', () => {
        if (controlPanelId) {   //check, if controlpanel is connected
            io.to(controlPanelId).emit("S_getSensorsList"); // if connected, get the sensors List from controlpanel
            socket.emit('S_notifacation',
                {
                    title: "Sensorslist",
                    message: "Sensorslist is loaded",
                    timestamp: new Date().toTimeString().split(' ')[0],
                    color: 'text-success'
                });
        } else {
            io.emit("controlpanelConnected", false)
            socket.emit('S_notifacation',
                {
                    title: "Sensorslist",
                    message: "Sensorslist cannot be loaded, ControlPanel not connected!",
                    timestamp: new Date().toTimeString().split(' ')[0],
                    color: 'text-warning'
                });
        }
    })


})


/*
let documents = {};
io.on("connection", socket => {
    let previousId;

    const safeJoin = currentId => {
        socket.leave(previousId);
        socket.join(currentId, () => console.log(`Socket ${socket.id} joined room ${currentId}`));
        previousId = currentId;
    };

    socket.on("getDoc", docId => {
        safeJoin(docId);
        socket.emit("document", documents[docId]);
    });

    socket.on("addDoc", doc => {
        documents[doc.id] = doc;
        safeJoin(doc.id);
        io.emit("documents", Object.keys(documents));
        socket.emit("document", doc);
    });

    socket.on("editDoc", doc => {
        documents[doc.id] = doc;
        socket.to(doc.id).emit("document", doc);
    });

    socket.on("disconnect", () => {
        console.log(socket.id + " is logged out");
    });

    io.emit("documents", Object.keys(documents));

    console.log(`Socket ${socket.id} has connected`);
});
*/
