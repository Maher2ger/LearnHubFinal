//commentation done

import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';

// --- Services
import {AuthService} from "./services/auth.service";


@Component({
	           selector   : 'app-root',
	           templateUrl: './app.component.html',
	           styleUrls  : ['./app.component.css']
           })
export class AppComponent implements OnInit {
	title = "LearningHub"
	//_authSub: listen to the client state if the client is authenticated or not
	private _authSub!: Subscription;
	userIsAuthenticated: boolean = false;





	constructor(private authService: AuthService) {


	}


	ngOnInit() {
		this.authService.autoAuthUser();
		this._authSub = this.authService.getAuthStatusListner()
		                    .subscribe((isAuthenticated) => {
			                    this.userIsAuthenticated = isAuthenticated;
		                    })

	}

	ngOnDestroy() {
		this._authSub.unsubscribe();
	}




}
