
import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs"

// --- Services
import {SocketService} from '../../services/socket.service';


@Component({
	           selector   : 'app-terminal',
	           templateUrl: './terminal.component.html',
	           styleUrls  : ['./terminal.component.css']
           })
export class TerminalComponent implements OnInit {
	notificationsList: any[] = [];     //save all notifications we get from server
	private _notificationsSub!: Subscription; //listen to notifications come from server

	constructor(public socketservice: SocketService) {
	}

	ngOnInit(): void {
		this._notificationsSub = this.socketservice.notification
		                   .subscribe((notification) => {
			                   console.log(notification);
							   this.notificationsList.push(notification);
		                   })
	}

	ngOnDestroy() {
		this._notificationsSub.unsubscribe();
	}

}
