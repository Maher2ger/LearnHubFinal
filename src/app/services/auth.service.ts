import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Subject, BehaviorSubject} from 'rxjs';
import {Router} from "@angular/router";

@Injectable({
	            providedIn: 'root'
            })

export class AuthService {
	private isAuthenticated = false;
	private token!: any;
	//We use behaviorsubject to pass the AuthStatus to the other components
	private authStatusListner = new BehaviorSubject<boolean>(false);
	private alertListner = new Subject<string>();
	private tokenTimer!: any;
	userName:any= "";

	userId!: string | null;


	constructor(private http: HttpClient, private router: Router) {

	}

	getToken(): string {
		return this.token;
	}


	getAuthStatusList() {
		return this.authStatusListner.asObservable();
	}

	getAlertListner() {
		return this.alertListner.asObservable();
	}


	getUserId() {
		return this.userId;
	}


	createUser(name: string, email: string, studentNumber: string,
	           password: string,) {
		const authData: any = {
			name         : name,
			email        : email,
			studentNumber: studentNumber,
			password     : password,

		}
		this.http.post('http://localhost:3500/users/signup', authData)
		    .subscribe(() => {
			    this.router.navigate(['/login']);
		    }, error => {
			    this.alertListner.next(error.error.message);
			    //this.router.navigate(['/signup']);
		    })
	}

	getIsAuthenticated(): boolean {
		return this.isAuthenticated;
	}


	loginUser(email: string, password: string) {
		const authData = {
			email: email, password: password
		}
		this.http
		    .post<{
			    message: string, token: string, userName: string, expiresIn: number, userId: string
		    }>(`http://localhost:3500/users/login`, authData)
		    .subscribe(response => {
			    this.token = response.token;
			    if (response.token && response.userId) {
				    this.userId = response.userId;
				    this.userName = response.userName;
				    const expiresIn = response.expiresIn;
				    this.setAuthTimer(expiresIn);
				    this.isAuthenticated = true;
				    this.authStatusListner.next(true);
				    const now = new Date();
				    const expirationDate = (Date.now() + (expiresIn * 1000));
				    this.saveAuthDataInLocalStorage(response.token, expirationDate, JSON.stringify(this.userId));
				    this.router.navigate(['/dashboard']);
			    }
		    }, error => {
			    this.alertListner.next(error.error.message);
		    })
	}

	logoutUser() {
		this.token = null;
		this.isAuthenticated = false;
		this.authStatusListner.next(false);
		this.router.navigate(['/login']);
		//clearTimeout(this.tokenTimer);
		this.clearAuthDataInLocalStorage();
		this.userId = null;
	}

	getUserName() {


		return this.userName;
	}

	autoAuthUser() {
		if (this.isAuthenticated) {
			return
		} else {
			const authInfos = this.getAuthDataFromLocalStorage();
			if (!authInfos) {
				return;
			}
			let now = new Date();
			const expiresIn = parseInt(authInfos.expirationDate) - Date.now();
			if (expiresIn > 0) {
				this.token = authInfos.token;
				this.isAuthenticated = true;
				this.setAuthTimer(expiresIn);
				this.userId = authInfos.userId;
				this.userName = authInfos.userName;
				this.authStatusListner.next(true);
			}
		}

	}

	////JWT Token 

	private setAuthTimer(duration: number) {
		//set time to logout when the token is expired
		/*
		 this.tokenTimer = setTimeout(() => {
		 this.logoutUser();
		 }, duration * 1000) */
	}

	private saveAuthDataInLocalStorage(token: string, expiresIn: number,
	                                   userId: string) {
		//store the AuthData to the localstorage
		localStorage.setItem('token', token);
		localStorage.setItem('userId', userId);
		localStorage.setItem('expirationDate', String(expiresIn));
		localStorage.setItem('userName', this.userName);
	}

	private clearAuthDataInLocalStorage() {
		//remove the AuthData from the localstorage
		localStorage.removeItem('token');
		localStorage.removeItem('expirationDate');
		localStorage.removeItem('userId');
		localStorage.removeItem('userName');
	}

	private getAuthDataFromLocalStorage() {
		//get the AuthData from the localstorage
		const token = localStorage.getItem('token');
		const expirationDate = localStorage.getItem('expirationDate');
		if (!token || !expirationDate) {
			return;
		} else {
			return {
				token         : token,
				expirationDate: expirationDate,
				userId        : localStorage.getItem('userId'),
				userName      : localStorage.getItem('userName'),
			}
		}
	}


}
