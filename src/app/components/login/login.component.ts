import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Subscription} from "rxjs";

@Component({
	           selector   : 'app-login',
	           templateUrl: './login.component.html',
	           styleUrls  : ['./login.component.css']
           })
export class LoginComponent implements OnInit, OnDestroy {
	public _alertSub!: Subscription;
	alert!:string| null;

	constructor(private authService: AuthService) {

	}

	ngOnInit(): void {
		this._alertSub = this.authService.getAlertListner()
			.subscribe(value => {
				this.alert = value;
			})
	}

	ngOnDestroy():void {
		this._alertSub.unsubscribe();
	}

	onLogin(loginForm: NgForm) {
		this.authService.loginUser(
			loginForm.value.uemail,
			loginForm.value.upassword
		);
	}
}
