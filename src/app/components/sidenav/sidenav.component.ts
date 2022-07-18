
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";

// --- Services
import { AuthService } from 'src/app/services/auth.service';


@Component({
	           selector   : 'app-sidenav',
	           templateUrl: './sidenav.component.html',
	           styleUrls  : ['./sidenav.component.css']
           })
export class SidenavComponent implements OnInit, OnDestroy {
	userIsAuthenticated: boolean = false;
	userName = "";

	//------- Subscriptions ----
	private _authSub!: Subscription;  //listen to authentication state from authService

	constructor(private authService: AuthService) {
	}

	ngOnInit(): void {
		this.userName = this.authService.getUserName();
		this._authSub = this.authService.getAuthStatusListner()
		                    .subscribe((isAuthenticated) => {
			                    this.userIsAuthenticated = isAuthenticated;
		                    })
	}

	logout(): void {
		//call the logoutUser function in the authService
		this.authService.logoutUser();
	}

	ngOnDestroy() {
		this._authSub.unsubscribe();

	}


}
