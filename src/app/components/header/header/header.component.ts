//commentation done

import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';

// --- Services --
import {AuthService} from "../../../services/auth.service";
import {SocketService} from '../../../services/socket.service';


@Component({
	           selector   : 'app-header',
	           templateUrl: './header.component.html',
	           styleUrls  : ['./header.component.css']
           })
export class HeaderComponent implements OnInit {
	//_ControlPanelstateSub: listen to the state of the controlpanel (connected or not)
	private _ControlPanelstateSub!: Subscription;
	//_authSub: listen to the client state if the client is authenticated or not
	private _authSub!: Subscription;

	userIsAuthenticated: boolean = false;
	controlpanelConnected: boolean = false;

	constructor(public socketservice: SocketService,
	            public authService: AuthService) {
	}

	ngOnInit(): void {
		this._ControlPanelstateSub = this.socketservice.controlpanelConnected
		                     .subscribe((state: boolean) => {
								 this.controlpanelConnected = state;
		                     });

		this._authSub = this.authService.getAuthStatusListner()
		                    .subscribe((isAuthenticated) => {
			                    this.userIsAuthenticated = isAuthenticated;
		                    })
	}

	ngOnDestroy(): void {
		this._ControlPanelstateSub.unsubscribe();
		this._authSub.unsubscribe();

	}



}
