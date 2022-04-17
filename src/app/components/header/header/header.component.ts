import {Component, OnInit} from '@angular/core';
import {SocketService} from 'src/app/services/socket.service';
import {Subscription} from 'rxjs';
import {AuthService} from "../../../services/auth.service";

@Component({
	           selector   : 'app-header',
	           templateUrl: './header.component.html',
	           styleUrls  : ['./header.component.css']
           })
export class HeaderComponent implements OnInit {
	private _stateSub!: Subscription;
	private _authSub!: Subscription;

	userIsAuthenticated: boolean = false;
	controlpanelConnected: boolean = false;

	constructor(public socketservice: SocketService,
	            public authService: AuthService,) {
	}

	ngOnInit(): void {
		this._stateSub = this.socketservice.controlpanelConnected
		                     .subscribe((state: boolean) => {
			                     this.controlpanelConnected = state;
		                     })

		this._authSub = this.authService.getAuthStatusList()
		                    .subscribe((isAuthenticated) => {
			                    this.userIsAuthenticated = isAuthenticated;
			                    console.log(isAuthenticated);
		                    })
	}

	ngOnDestroy(): void {
		this._stateSub.unsubscribe();
		this._authSub.unsubscribe();

	}

	logout(): void {
		this.authService.logoutUser();
	}


}
