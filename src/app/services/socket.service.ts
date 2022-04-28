import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {Sensor} from 'src/app/models/sensor.model';
import {Recording} from '../models/recording.model';
import {HttpClient} from "@angular/common/http";
import { AuthService } from './auth.service';
import {Subject} from "rxjs";

@Injectable({
	            providedIn: 'root'
            })

export class SocketService {
	errors = this.socket.fromEvent<any>('S_notifacation');
	sensorsList = this.socket.fromEvent<any[]>('S_sensorsListData');
	controlpanelConnected = this.socket.fromEvent<boolean>('controlpanelConnected');
	isRecording = this.socket.fromEvent<boolean>('isRecording');
	recordingFile = this.socket.fromEvent<Recording>('recording');
	private recordingsDetailsListner = new Subject<any>();
	localRecordingsList: Recording[] = [];  //we store all recordings from one
	// loacally in this array



	constructor(private socket: Socket,
	            private authService: AuthService,
	            private http: HttpClient) {
		this.socket.on('S_recordingDetails', (data:any)=> {
			this.recordingsDetailsListner.next(data);
		})

	}

	addToLocalRecordingslist(recording:Recording) {
		this.localRecordingsList.push(recording);
	}

	getLocalRecordingslist() {
		return this.localRecordingsList;
	}

	getRecordingDetailsListner() {
		return this.recordingsDetailsListner.asObservable();
	}

	getRecordingsList (userId:string) {
		return this.http.post<[any]>('http://localhost:3500/recordings', {creator: userId});
	}

	getRecordingsDetails (id:string) {
		this.socket.emit('getRecordingsDetails',id)
	}

	getSensorsListFromServer() {
		//require SensorsList from Server
		this.socket.emit('B_getSensorsList');
	}

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

	/*
	 getDocument(id: string) {
	 this.socket.emit('getDoc', id);
	 }

	 newDocument() {
	 this.socket.emit('addDoc', { id: this.docId(), doc: '' });
	 }

	 editDocument(document: Document) {
	 this.socket.emit('editDoc', document);
	 }

	 private docId() {
	 let text = '';
	 const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	 for (let i = 0; i < 5; i++) {
	 text += possible.charAt(Math.floor(Math.random() * possible.length));
	 }

	 return text;
	 }

	 getSocketId() {
	 return this.socket.ioSocket.id;}

	 logout() {
	 this.socket.emit('disconnect', this.socket.ioSocket.id);
	 }

	 */
}
