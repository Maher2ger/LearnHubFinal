import {Component, OnInit, ViewChild} from '@angular/core';
import {Subscription} from "rxjs";
import {Recording} from "../../models/recording.model";
import {SocketService} from "../../services/socket.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {
	StopwatchComponent
} from "../../components/stopwatch/stopwatch.component";
import {
	SensorsListComponent
} from "../../components/sensors-list/sensors-list.component";
import {AuthService} from "../../services/auth.service";

@Component({
	           selector   : 'app-dashboard',
	           templateUrl: './dashboard.component.html',
	           styleUrls  : ['./dashboard.component.css']
           })
export class DashboardComponent implements OnInit {

	//access the child comp StopwatchComponent
	@ViewChild(StopwatchComponent, {static: true}) StopwatchComponent!: StopwatchComponent;
	@ViewChild(SensorsListComponent, {static: true}) SensorsListComponent!: SensorsListComponent;
	@ViewChild('recordingForm', {static: true}) recordingForm: any;
	private _sensorsSub!: Subscription;
	private _stateSub!: Subscription;
	private _isRecordingSub!: Subscription;
	private _recordingFileSub!: Subscription;
	private _authSub!: Subscription;

	userIsAuthenticated: boolean = false;
	sensorsList: any[] = [];
	controlpanelConnected: boolean = false;
	isRecording: boolean = false;
	recordingsList: Recording[] = [];


	constructor(public socketservice: SocketService,
	            public authService: AuthService,
	            private _snackBar: MatSnackBar) {


	}


	ngOnInit() {
		this._authSub = this.authService.getAuthStatusList()
		                    .subscribe((isAuthenticated) => {
			                    this.userIsAuthenticated = isAuthenticated;
			                    console.log(isAuthenticated);
		                    })
		//subscribe to sensorsList var in socketservice to get the sensorsList
		this._sensorsSub = this.socketservice.sensorsList
		                       .subscribe(data => {
			                       this.sensorsList = data;
		                       })
		this._stateSub = this.socketservice.controlpanelConnected
		                     .subscribe((state: boolean) => {
			                     this.controlpanelConnected = state;
			                     if (!state) {
				                     this.sensorsList.length = 0;
				                     this._snackBar.open('Control Panel is not Connected', '', {
					                     duration: 3000
				                     });
			                     } else {
				                     this._snackBar.open('Control Panel is Connected', '', {
					                     duration: 3000
				                     });
			                     }
		                     })
		this.socketservice.getSensorsListFromServer();
		this._isRecordingSub = this.socketservice.isRecording
		                           .subscribe((recording: boolean) => {
			                           if (this.isRecording != recording) {
				                           this.isRecording = recording;
				                           if (recording) {
					                           this.StopwatchComponent.startTimer();
				                           } else {
					                           this.StopwatchComponent.clearTimer();
				                           }
			                           }

		                           })
		//onInit, request the sensors List from Server
		this._recordingFileSub = this.socketservice.recordingFile
		                             .subscribe((recording: Recording) => {
			                             this.recordingsList.push(recording);
		                             })


	}

	ngOnDestroy() {
		this._sensorsSub.unsubscribe();
		this._stateSub.unsubscribe();
		this._isRecordingSub.unsubscribe();
		this._recordingFileSub.unsubscribe();
		this._authSub.unsubscribe();
	}

	openSnackBar(message: string, action: string) {
		this._snackBar.open(message, action);
	}

	startRecording() {
		let recordingName;
		this.recordingForm.value['recording-name']		//check if the  entered a
		// recording name
		if (this.recordingForm.value['recording-name'] === null || this.recordingForm.value['recording-name'] === "") {
			//if not, name the recording 'new recording ' with time now
			recordingName = "New Recording - " + Date.now();
		} else {
			recordingName = this.recordingForm.value['recording-name'];
		}
		let formValues = this.SensorsListComponent.myForm.value;
		for(let value in formValues) {
			//check if the user has selected any sensors
			if (formValues[value]) { //if we have min. one sensor selected
				this.socketservice.startRecording({
					                                  recordingName: recordingName,
					                                  comments     : this.recordingForm.value['comments'],
					                                  sensors      : this.SensorsListComponent.myForm.value
				                                  });
				return;
			}
		}
		alert("no sensors selected!")
	}

	stopRecording() {
		this.socketservice.stopRecording();
		this.recordingForm.reset();
	}


}
