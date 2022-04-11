import {Component, OnInit} from '@angular/core';
import {SocketService} from '../../services/socket.service';
import {Subscription} from "rxjs";

@Component({
	           selector   : 'app-terminal',
	           templateUrl: './terminal.component.html',
	           styleUrls  : ['./terminal.component.css']
           })
export class TerminalComponent implements OnInit {
	errorsList: any[] = [];
	private _stateSub!: Subscription;
	private _errSub!: Subscription;

	constructor(public socketservice: SocketService) {
	}

	ngOnInit(): void {
		this._errSub = this.socketservice.errors
		                   .subscribe((err) => {
			                   this.errorsList.push(err);
		                   })
	}

	ngOnDestroy() {
		this._stateSub.unsubscribe();
		this._errSub.unsubscribe();
	}

}
