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
		    },
		               error => {
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
			    message: string, token: string, expiresIn: number, userId: string
		    }>(`http://localhost:3500/users/login`, authData)
		    .subscribe(response => {
			    this.token = response.token;
			    if (response.token && response.userId) {
				    this.userId = response.userId;
				    const expiresIn = response.expiresIn;
				    this.setAuthTimer(expiresIn);
				    this.isAuthenticated = true;
				    this.authStatusListner.next(true);
				    const now = new Date();
				    const expirationDate = new Date(now.getTime() + (expiresIn * 1000));
				    this.saveAuthDataInLocalStorage(response.token, expirationDate, JSON.stringify(this.userId));
				    this.router.navigate(['/']);
			    }
		    }, error => {
			    console.log(error.error.message);
			    this.alertListner.next(error.error.message);
		    })
	}

	logoutUser() {
		this.token = null;
		this.isAuthenticated = false;
		this.authStatusListner.next(false);
		this.router.navigate(['/login']);
		clearTimeout(this.tokenTimer);
		this.clearAuthDataInLocalStorage();
		this.userId = null;
	}

	autoAuthUser() {
		const authInfos = this.getAuthDataFromLocalStorage();
		if (!authInfos) {
			return;
		}
		let now = new Date();
		const expiresIn = authInfos.expirationDate.getTime() - now.getTime();
		if (expiresIn > 0) {
			this.token = authInfos.token;
			this.isAuthenticated = true;
			this.setAuthTimer(expiresIn * 1000);
			this.authStatusListner.next(true);
		}
		this.userId = authInfos.userId;
	}

	////JWT Token 

	private setAuthTimer(duration: number) {
		//set time to logout when the token is expired
		this.tokenTimer = setTimeout(() => {
			this.logoutUser();
		}, duration * 1000)
	}

	private saveAuthDataInLocalStorage(token: string, expiresIn: Date,
	                                   userId: string) {
		//store the AuthData to the localstorage
		localStorage.setItem('token', token);
		localStorage.setItem('userId', userId);
		localStorage.setItem('expirationDate', expiresIn.toISOString());
	}

	private clearAuthDataInLocalStorage() {
		//remove the AuthData from the localstorage
		localStorage.removeItem('token');
		localStorage.removeItem('expirationDate');
		localStorage.removeItem('userId');
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
				expirationDate: new Date(expirationDate),
				userId        : localStorage.getItem('userId')
			}
		}
	}


}
