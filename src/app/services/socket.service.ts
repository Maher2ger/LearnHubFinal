//commentation done

import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {Recording} from '../models/recording.model';   //Recording Schema for DB
import {HttpClient} from "@angular/common/http";
import {AuthService} from './auth.service';
import {Subject} from "rxjs";

@Injectable({
	            providedIn: 'root'
            })

export class SocketService {
	// --------------------- Socket Events ----------------------------------------
	//Listen to event with name 'S_notification' and pass the data to the subscriber
	notification = this.socket.fromEvent<any>('S_notification');
	//Listen to event with name 'S_sensorsListData' and pass the data to the subscriber
	sensorsList = this.socket.fromEvent<any[]>('S_sensorsListData');
	//Listen to state of controlpanel from server and pass it to the subscriber data to the subscriber
	controlpanelConnected = this.socket.fromEvent<boolean>('controlpanelConnected');
	//Listen if controlpanel is recording now and pass it to the subscriber data to the subscriber
	isRecording = this.socket.fromEvent<boolean>('isRecording');
	//Listen and get a recordings details from server after a recording in finished
	recordingFile = this.socket.fromEvent<Recording>('recording');
	//gets Recordings Details from DB and passes it to Subscriber
	private findRecordingInDB = new Subject<any>();
	//we store all recordings from one session local in this array
	localRecordingsList: Recording[] = [];


	constructor(private socket: Socket,
	            private authService: AuthService,
	            private http: HttpClient) {
		//Listen to the event 'S_recordingDetails' and pass the data to the subscriber
		this.socket.on('S_recordingDetails', (data: any) => {
			this.findRecordingInDB.next(data);
		})
	}

	// ----------------- Recordingslist ---------------------------

	addToLocalRecordingslist(recording: Recording) {
		//add a new recording to the local Recordingslist
		this.localRecordingsList.push(recording);
	}

	getLocalRecordingslist() {
		return this.localRecordingsList;
	}


	// ----------------- database -----------------------
	getRecordingDetailsListner() {
		//pass the Subscriber 'findRecordingInDB' to other components
		return this.findRecordingInDB.asObservable();
	}


	getRecordingsListForOneClient(userId: string) {
		//fetch the recording of one user from the database
		return this.http.post<[any]>('http://localhost:3500/recordings', {creator: userId});
	}

	getRecordingsDetails(id: string) {
		//get the details of one recording with given id
		this.socket.emit('getRecordingsDetails', id)
	}

	getSensorsListFromServer() {
		//require SensorsList from Server
		this.socket.emit('B_getSensorsList');
	}


	//  -----------------------      Recording process  -----------------------
	getSensorsList() {
		return this.sensorsList;
	}


	startRecording(data: any) {  //sensors: we want record from
		//send startRecording request to the server
		this.socket.emit('B_startRecording', data);
	}

	stopRecording() {
		//send stopRecording request to the server
		this.socket.emit('B_stopRecording');
	}

}
