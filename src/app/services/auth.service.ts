//commentation done


import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Subject, BehaviorSubject} from 'rxjs';
import {Router} from "@angular/router";

@Injectable({
	            providedIn: 'root'
            })


//this servers is responsible for all login and signup processes
export class AuthService {
	private isAuthenticated = false;     //is true, when the client is logged in
	private token!: any;                 //user token: important for Authentication and Sessions
	userName:any= "";                    //store the name of the client
	userId!: string | null;              //store the userId (the same ID of the user in DB)

	// ---------- Subscribers ------
	//We use behaviorsubject to pass the AuthStatus to the other components
	private authStatusListner = new BehaviorSubject<boolean>(false);
	//alertListner: passes errors to the login and signup template when the process fails
	private alertListner = new Subject<string>();


	constructor(private http: HttpClient,
	            private router: Router) {

	}

	//   -----------------------  Subscriptions -------------------------
	getAuthStatusListner() {
		return this.authStatusListner.asObservable();
	}

	getAlertListner() {
		return this.alertListner.asObservable();
	}



	// ------------------ Service Variables  ---------------
	getToken(): string {
		return this.token;
	}

	getUserId():string {
		if (this.userId) {
			return this.userId;
		}
		return 'user-Id undefined';
	}

	getUserName() {
		return this.userName;
	}
	getIsAuthenticated(): boolean {
		return this.isAuthenticated;
	}



	// ---------------  signup functions -----------------------

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


	// ---------------  login functions -----------------------

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
				    //after how many seconds should the session end
				    const expiresIn = response.expiresIn;
				    this.isAuthenticated = true;
				    this.authStatusListner.next(true);  //pass the auth state to other components
				    //expirationDate: claculate the time to end the session
				    const expirationDate = (Date.now() + (expiresIn * 1000));
					//save the auth infos in the localstorage
				    this.saveAuthDataInLocalStorage(response.token, expirationDate, JSON.stringify(this.userId));
					//redirect to dashboard page, when the client logged in successfully
				    this.router.navigate(['/dashboard']);
			    }
		    }, error => {
				//send the error to the login template
			    this.alertListner.next(error.error.message);
		    })
	}

	logoutUser() {
		// reset the auth variables
		this.token = null;
		this.userId = null;
		this.isAuthenticated = false;
		//inform the other components, that the user is logged out now
		this.authStatusListner.next(false);
		//redirect to the login page
		this.router.navigate(['/login']);
		//delete all auth infos from the localstorage
		this.clearAuthDataInLocalStorage();
	}

	autoAuthUser() {
		//this function will be called after refreshing the webpage
		//when the user was authenticated befor refreshing and the session is not expired, the user
		// will be authenticated automatically again
		if (this.isAuthenticated) {
			//if the client is authenticated, just do no thing
			return
		} else {
			//if the user is not authenticated, get the auth infos from the localstorage
			const authInfos = this.getAuthDataFromLocalStorage();
			if (!authInfos) {
				//if there is no auth in the localstorage, then return nothing
				return;
			}
			//calculate new expiration date
			const expiresIn = parseInt(authInfos.expirationDate) - Date.now();
			if (expiresIn > 0) {
				//if the expiration date after the actuall point in time, it means the session
				// is not expired and the user can be authenticated
				this.token = authInfos.token;
				this.userId = authInfos.userId;
				this.userName = authInfos.userName;
				this.isAuthenticated = true;
				this.authStatusListner.next(true);
			}
		}

	}

	//// ---------------------  localStorage functions -------------------

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
