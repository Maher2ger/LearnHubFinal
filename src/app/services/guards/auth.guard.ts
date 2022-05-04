//commentation done

import {
	ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree
} from "@angular/router";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

// --- Services
import {AuthService} from "../auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
	//canActivate Interface that a class can implement to be a guard deciding if a route can be activated.
	constructor(private authService: AuthService, private router: Router) {

	}

	canActivate(route: ActivatedRouteSnapshot,
	            state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		//canActivate will be called on every Route that use the AuthGuard
		//Try to authenticate the client automatically using the data in localStorage
		this.authService.autoAuthUser();

		if (this.authService.getIsAuthenticated()) {
			//when the user is authenticated, then return true (it means the route can be activated)
			return true;
		} else {
			//when the user is not authenticated
			this.router.navigate(['/login']);
			return false; //then return true (it means the route cannot be activated)
		}
	}

}
