//commentation done

import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";

// ---- services --
import {AuthService} from "../../services/auth.service";

@Component({
	           selector   : 'app-login',
	           templateUrl: './login.component.html',
	           styleUrls  : ['./login.component.css']
           })
export class LoginComponent implements OnInit, OnDestroy {
	//_alertSub: listen to the errors when login fails
	public _alertSub!: Subscription;
	alert!:string| null; //save the error message, when login fails

	constructor(private authService: AuthService) {

	}

	ngOnInit():void {
		this._alertSub = this.authService.getAlertListner()
			.subscribe(value => {
				this.alert = value;
			})
	}

	ngOnDestroy():void {
		this._alertSub.unsubscribe();
	}

	onLogin(loginForm: NgForm) {
		//call the loginUser function in the authService
		this.authService.loginUser(
			//pass the user credentials to the authService
			loginForm.value.uemail,
			loginForm.value.upassword
		);
	}
}
