import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {Sensor} from 'src/app/models/sensor.model';
import { Recording } from '../models/recording.model';

@Injectable({
	            providedIn: 'root'
            })

export class SocketService {
	errors = this.socket.fromEvent<any>('S_notifacation');
	sensorsList = this.socket.fromEvent<any[]>('S_sensorsListData');
	controlpanelConnected = this.socket.fromEvent<boolean>('controlpanelConnected');
	isRecording = this.socket.fromEvent<boolean>('isRecording');
	recordingFile = this.socket.fromEvent<Recording>('recording');


	constructor(private socket: Socket) {
		this.socket.on('S_sensorsListData', (data:any) => {
		               }
		)
		this.socket.on('recording', (data:any) => {
		               }
		)

	}


	getSensorsListFromServer() {
		//require SensorsList from Server
		this.socket.emit('B_getSensorsList');
			}

	getSensorsList() {
		return this.sensorsList;
	}

	startRecording(data:any) {  //sensors: we want record from
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
