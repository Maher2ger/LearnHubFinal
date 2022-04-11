import tkinter as tk
import itertools

#sensor class

class Sensor(tk.Frame):
    newId = itertools.count()
    sensorActiv = False
    sensorOn = False
    def __init__(self,name, type,master=None):
        super().__init__(master)
        self.id = "s"+ str(next(self.newId))
        self.master = master
        self.name = name
        self.type = type
        self.state = "off"
        self.createSensor()

    def createSensor(self):
        self.sensorFrame = tk.LabelFrame(self, text=self.name, bg="white", height=50, width=200)
        self.sensorFrame.pack(side="left", fill="both", expand="yes")
        tk.Label(self.sensorFrame, text=self.type, fg="brown").pack()
        self.canvas1 = tk.Canvas(master=self.sensorFrame, width="100", heigh="100",bg="white")
        self.canvas1.pack(side="top")
        self.circle1 = self.createCircle(self.canvas1, "gray")
        tk.Button(self.sensorFrame, text="ON/OFF", command=lambda: self.sensorOnOff()).pack(side="bottom")

    def createCircle(self,canvas,color):
        return(canvas.create_oval("30", "30", "70", "70", fill=color))

    def sensorOnOff(self):
        self.sensorOn = not self.sensorOn
        if self.sensorOn:
            self.circle1 = self.createCircle(self.canvas1,"green")
        else:
            self.circle1 = self.createCircle(self.canvas1, "red")

    def sensorOnOffWithValue(self,value):
        self.sensorOn = value
        if self.sensorOn:
            self.circle1 = self.createCircle(self.canvas1,"green")
        else:
            self.circle1 = self.createCircle(self.canvas1, "red")

    def activateDeactivateSensor(self):
        self.sensorActiv = not self.sensorActiv



############################
class Application(tk.Frame):
    sensorslist = []
    def __init__(self, master= None):
        super().__init__(master)
        self.master = master

        self.pack(fill='both', expand=True ,side="bottom")
        self.sensors_frame = tk.Frame(self,bg="blue", bd="2")
        self.control_frame = tk.Frame(self,bg="green", bd="2")
        self.create_widgets()

        self.addNewSensor(Sensor('Sensor1', 'Alpha 290', master=self.sensors_frame))
        self.addNewSensor(Sensor('Sensor2', 'Taliba 480', master=self.sensors_frame))
        self.addNewSensor(Sensor('Sensor3', 'Toshina 3353', master=self.sensors_frame))
        self.addNewSensor(Sensor('Sensor3', 'Toshina 3353', master=self.sensors_frame))
        self.addNewSensor(Sensor('Sensor3', 'Toshina 3353', master=self.sensors_frame))
        self.addNewSensor(Sensor('Sensor1', 'Alpha 290', master=self.sensors_frame))
        self.addNewSensor(Sensor('Sensor2', 'Taliba 480', master=self.sensors_frame))
        self.addNewSensor(Sensor('Sensor3', 'Toshina 3353', master=self.sensors_frame))
        self.addNewSensor(Sensor('Sensor3', 'Toshina 3353', master=self.sensors_frame))
        self.addNewSensor(Sensor('Sensor3', 'Toshina 3353', master=self.sensors_frame))
        self.addNewSensor(Sensor('Sensor3', 'Toshina 3353', master=self.sensors_frame))
        self.addNewSensor(Sensor('Sensor3', 'Toshina 3353', master=self.sensors_frame))
        self.addNewSensor(Sensor('Sensor1', 'Alpha 290', master=self.sensors_frame))
        self.addNewSensor(Sensor('Sensor2', 'Taliba 480', master=self.sensors_frame))
        self.addNewSensor(Sensor('Sensor3', 'Toshina 3353', master=self.sensors_frame))
        self.addNewSensor(Sensor('Sensor3', 'Toshina 3353', master=self.sensors_frame))
        self.addNewSensor(Sensor('Sensor3', 'Toshina 3353', master=self.sensors_frame))

    def create_widgets(self):
        self.sensors_frame.pack()
        self.control_frame.pack(side="bottom")
        entry1 = tk.Entry(self.control_frame)
        entry1.pack()
        entry2 = tk.Entry(self.control_frame)
        entry2.pack()
        tk.Button(self.control_frame, text="add new sensor", command= lambda: self.addNewSensor(Sensor(entry1.get(),
                                                                                                       entry2.get(),
                                                                                                       master=self.sensors_frame))).pack(side="bottom")
        tk.Button(self.control_frame, text="activate all Sensors", command= lambda: self.stopRecordingAllSensors()).pack(side="bottom")
        self.quit = tk.Button(self, text="Quit", fg='red', command=self.master.destroy)
        self.quit.pack(side='bottom')

    def addNewSensor(self, sensor):
        self.sensorslist.append(sensor)
        self.updateSensorsFrame()

    def updateSensorsFrame(self):
        for sensor in self.sensorslist:
            sensor.pack(side='left')

    def getSensorsList(self):
        return(self.sensorslist)

    def removeSensor(self, sensor):
        self.sensorslist.remove(sensor)
        self.create_widgets()


    def activeAllSensors(self):
        for sensor in self.sensorslist:
            sensor.sensorOnOffWithValue(True)
        self.updateSensorsFrame()

    def deactiveAllSensors(self):
        for sensor in self.sensorslist:
            sensor.sensorOnOffWithValue(False)

    def changeSensorStatus(self,sensor):
        sensor.sensorOnOff()
        self.updateSensorsFrame()

    def numberOfSensors(self):
        return len(self.sensorslist)

    def startRecordingSelectedSensors(self,sensors):
        for sensorId in sensors:
            self.findSensorUsingId(sensorId).sensorOnOffWithValue(True)

    def findSensorUsingId(self, sensorId):
        for sensor in self.sensorslist:
            if sensor.id == sensorId:
                print('sensor found' + sensor.id)
                return sensor
    def stopRecordingAllSensors(self):
        for sensor in self.sensorslist:
            sensor.sensorOnOffWithValue(False)
            print(sensor.sensorOn)
