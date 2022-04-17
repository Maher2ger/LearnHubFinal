import tkinter as tk
from interface import Application
import socketio

sio = socketio.Client()

root = tk.Tk()
root.geometry('600x400+10+20')
root.title("myApp")


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


@sio.on('S_getSensorsList')
def sendSensorsList():
    sensorsList = []
    for sensor in app.getSensorsList():
        sensorsList.append({
            'id': str(sensor.id),
            'name': sensor.name,
            'type': sensor.type,
            'state': sensor.state
        })

    print('R_sensors-infos sent to server')
    return sio.emit('CP_sensorsListData', sensorsList)



app = Application(master=root)
app.mainloop()
