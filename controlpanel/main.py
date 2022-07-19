import tkinter as tk
from interface import Application
import socketio
import time

#init socket io
sio = socketio.Client()

root = tk.Tk()
root.geometry('1000x300')
root.title("Controlpanel Simulator")

#Socket IO Conf.
BUFFER_SIZE = 4096  # send 4096 bytes each time step
SEPARATOR = "<SEPARATOR>"

def connect():
    print('Connection established')

sio.connect('http://localhost:3500', headers={'type':"controlpanel"})

@sio.on('connection')
def sendType():
    print('Type sent!')
    sio.emit('client_type',{type:"ControlPanel"})

@sio.on('cp')
def printData(data):
    app.startRecordingSelectedSensors(data['value'])

@sio.on('S_startRecording')
def startRecording(data):
    for sensor in app.getSensorsList():
        if data[sensor.id]:
            sensor.sensorOnOffWithValue(True)

@sio.on('S_stopRecording')
def stopRecording():
    for sensor in app.getSensorsList():
        sensor.sensorOnOffWithValue(False)
    createRecordingsFile()
    sio.emit("cp_recordingFile" )


@sio.on('S_getSensorsList')
def sendSensorsList():
    sensorsList = []
    for sensor in app.getSensorsList():
        sensorsList.append({
            'id': str(sensor.id),
            'name': sensor.name,
            'type': sensor.type,
            'state': sensor.state,
            'category': sensor.catergory
        })

    print('R_sensors-infos sent to server')
    return sio.emit('CP_sensorsListData', sensorsList)

def callback():
    return

def sendFileToServer(filename):
    file = open(filename, "w")
    #return sio.send('upload', file, '')

def createRecordingsFile():
    with open('recordings/sample.txt') as f:
      lines = f.readlines()
    fileName =  'Recording'+str(int(time.time()))+'.txt'
    with open('recordings/'+fileName, 'w') as f:
      f.write(''.join(lines))
    sendFileToServer(str('recordings/'+fileName))






app = Application(master=root)
app.mainloop()
