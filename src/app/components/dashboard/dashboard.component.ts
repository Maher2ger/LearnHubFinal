import {Component, OnInit, ViewChild} from '@angular/core';
import {Subscription} from "rxjs";

//---- components
import {
	StopwatchComponent
} from "../../components/stopwatch/stopwatch.component";
import {
	SensorsComponent
} from "../sensors/sensors.component";

//---- services
import {AuthService} from "../../services/auth.service";
import {SocketService} from "../../services/socket.service";


//---  models
import {Recording} from "../../models/recording.model";

//  ---- Angular Material
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
	           selector   : 'app-dashboard',
	           templateUrl: './dashboard.component.html',
	           styleUrls  : ['./dashboard.component.css']
           })
export class DashboardComponent implements OnInit {
	// -------- Child Components --------------
	//access the child comp StopwatchComponent
	@ViewChild(StopwatchComponent, {static: true}) StopwatchComponent!: StopwatchComponent;
	//access the child comp SensorsComponent
	@ViewChild(SensorsComponent, {static: true}) SensorsListComponent!: SensorsComponent;
	//access the child recordingForm
	@ViewChild('recordingForm', {static: true}) recordingForm: any;

	//--------- Subscriptions   ------------------
	private _sensorsSub!: Subscription;     //listen to the Sensorslist, when it comes from server
	//_ControlPanelstateSub: listen to the state of the controlpanel (connected or not)
	private _ControlPanelstateSub!: Subscription;
	//_isRecordingSub: listen to the state of controlpanel, if it is recording now or not
	private _isRecordingSub!: Subscription;
	//_recordingFileSub: get the recording file and details after a recording is fisished
	private _recordingFileSub!: Subscription;
	//_authSub: listen to the client state if the client is authenticated or not
	private _authSub!: Subscription;

	userIsAuthenticated: boolean = false;
	sensorsList: any[] = [];          //local var, in it we store the sensors we get from server
	controlpanelConnected: boolean = false;
	isRecording: boolean = false;
	localRecordingsList: Recording[] = [];    //local history from socketservice


	constructor(public socketservice: SocketService,
	            public authService: AuthService,
	            private _snackBar: MatSnackBar    //angular material directive for snack bar
	) {


	}


	ngOnInit() {
		//load localRecordingslist from socketservice
		this.socketservice.getSensorsListFromServer();   //request sensorslist from server
		this.localRecordingsList = this.socketservice.getLocalRecordingslist();
		this._authSub = this.authService.getAuthStatusListner()
		                    .subscribe((isAuthenticated) => {
			                    this.userIsAuthenticated = isAuthenticated;
		                    })
		//subscribe to sensorsList var in socketservice to get the sensorsList
		this._sensorsSub = this.socketservice.sensorsList
		                       .subscribe(data => {
			                       this.sensorsList = data;
		                       })
		this._ControlPanelstateSub = this.socketservice.controlpanelConnected
		                     .subscribe((state: boolean) => {
			                     this.controlpanelConnected = state;
			                     if (!state) {    //if false
				                     this.sensorsList.length = 0;   //clear the sensorslist from mem
				                     this._snackBar.open('Control Panel is not Connected', '', {
					                     duration: 3000
				                     });
			                     } else {
									 //call the sensorslist from the server
									 setTimeout(() => {
										 this.socketservice.getSensorsListFromServer();
									 },500); //wait 0.5 till the connection with controlpanel
				                     // has been established
									 this._snackBar.open('Control Panel is Connected', '', {
					                     duration: 3000
				                     });
			                     }
		                     })
		this._isRecordingSub = this.socketservice.isRecording
		                           .subscribe((recording: boolean) => {
			                           if (this.isRecording != recording) {
				                           this.isRecording = recording;
				                           if (recording) {  //if ture
					                           this.StopwatchComponent.startTimer();
				                           } else {  //if false
					                           this.StopwatchComponent.clearTimer();
				                           }
			                           }

		                           })
		this._recordingFileSub = this.socketservice.recordingFile
		                             .subscribe((recording: Recording) => {
			                             //add new recordingFile to the localRecordingslist
										 this.socketservice.addToLocalRecordingslist(recording);
		                             })


	}

	ngOnDestroy() {
		//unsubscribe all Subscription in the component
		this._sensorsSub.unsubscribe();
		this._ControlPanelstateSub.unsubscribe();
		this._isRecordingSub.unsubscribe();
		this._recordingFileSub.unsubscribe();
		this._authSub.unsubscribe();
	}

	openSnackBar(message: string, action: string) {
		// function to render the snack bar, when the controlpanel state changes
		this._snackBar.open(message, action);
	}

	startRecording() {
		//this function to start recording from the sensors in the controlpanel
		let recordingName;
		let recordingComments;
		//check iff the client entered name and comments for the new recording (name and comments
		// are not required)
		if (this.recordingForm.value['recording-name'] === null || this.recordingForm.value['recording-name'] === "") {
			//if not, name the recording 'NewRec ' with time now
			recordingName = "NewRec- " + Date.now();
		} else {
			recordingName = this.recordingForm.value['recording-name'];
		}

		if (this.recordingForm.value['comments'] === null || this.recordingForm.value['comments'] === "") {
			recordingComments = "no comments";
		} else {
			recordingComments = this.recordingForm.value['comments'];
		}

		//from the SensorsComponent get the sensors, we want record from
		let formValues = this.SensorsListComponent.myForm.value;
		for(let value in formValues) {
			//check if the user has selected any sensors
			if (formValues[value]) { //if we have min. one sensor selected
				this.socketservice.startRecording({
					                                  recordingName: recordingName,
					                                  comments     : recordingComments,
					                                  sensors      : this.SensorsListComponent.myForm.value,
					                                  creator      : this.authService.getUserId()
				                                  });
				return;
			}
		}
		alert("no sensors selected!")  //iff no sensors have been selected
	}

	stopRecording() {
		this.socketservice.stopRecording();
		this.recordingForm.reset();                       //reset the recordingsform
		this.SensorsListComponent.myForm.reset();          //reset the sensorsForm
	}

	updateSenosrsList() {
		this.socketservice.getSensorsListFromServer();
	}
}
