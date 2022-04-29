import {Component, OnInit} from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
	           selector   : 'app-sidenav',
	           templateUrl: './sidenav.component.html',
	           styleUrls  : ['./sidenav.component.css']
           })
export class SidenavComponent implements OnInit {
	userName = "";
	constructor(private authService: AuthService) {
	}

	ngOnInit(): void {
		this.userName = this.authService.getUserName();
	}

}
