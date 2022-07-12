import time

class Recording:
    start = 0
    end = 0
    endTime = 0
    startTime = 0
    duration = 0

    def __init__(self, name):
        self.name = name
        self.startRecording()

    def startRecording(self):
        self.startTime = time.asctime(time.localtime(time.time()))  # current time
        self.start = time.time()

    def stopRecording(self):
        self.endTime = time.asctime(time.localtime(time.time()))
        self.end = time.time()
        self.duration = self.end - self.start

