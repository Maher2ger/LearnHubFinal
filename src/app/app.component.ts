import {Component, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {Sensor} from './models/sensor.model';
import {SocketService} from './services/socket.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {StopwatchComponent} from "./components/stopwatch/stopwatch.component";
import {
	SensorsListComponent
} from "./components/sensors-list/sensors-list.component";

import {Recording} from "./models/recording.model"
import {AuthService} from "./services/auth.service";


@Component({
	           selector   : 'app-root',
	           templateUrl: './app.component.html',
	           styleUrls  : ['./app.component.css']
           })
export class AppComponent implements OnInit {
	//access the child comp StopwatchComponent
	private _authSub!: Subscription;
	userIsAuthenticated: boolean = false;
	recordingsList: Recording[] = [];





	constructor(private authService: AuthService) {


	}


	ngOnInit() {
		this.authService.autoAuthUser();
		this._authSub = this.authService.getAuthStatusList()
		                    .subscribe((isAuthenticated) => {
			                    this.userIsAuthenticated = isAuthenticated;
		                    })

	}

	ngOnDestroy() {
		this._authSub.unsubscribe();
	}




}
