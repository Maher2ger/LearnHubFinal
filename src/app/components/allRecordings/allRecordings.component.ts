//commentation done

import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";

//--- Services
import {AuthService} from 'src/app/services/auth.service';
import { SocketService } from 'src/app/services/socket.service';

//--- Angular Material
import {MatTable} from "@angular/material/table";


@Component({
	           selector   : 'app-allRecordings',
	           templateUrl: './allRecordings.component.html',
	           styleUrls  : ['./allRecordings.component.css']
           })
export class allRecordingsComponent implements OnInit {
	// -------- Child Components --------------
	//access the child table
	@ViewChild(MatTable) table!: MatTable<RecordingElement>;

	isLoading = true;       //this var is needed to control the rendering of the spinner
	userId!:string;
	//tableDate: has all Recordings of the client we get from server
	tableData: RecordingElement[] = [];
	//displayedColumns: which columns should be rendered
	displayedColumns: string[] = ['name', 'comments', 'startTime', 'details'];

	constructor(private authService: AuthService,private router: Router,
	            private socketService: SocketService) {
			this.userId = this.authService.getUserId();
	}

	ngOnInit() {
		//check if the user id exist (iff the client logged in)
		if (this.userId) {
			this.socketService.getRecordingsListForOneClient(this.userId)
			    .subscribe((data) => {
					//after the response comes back from server with the recordings of the client
				    for(let [key,recording] of data.entries()) {
						const date = new Date(recording.startTime).toLocaleString();
					    this.tableData.push({
						                        position: key+1,
						                        id: recording._id,
						                        name     : recording.name,
						                        comments : recording.comments,
						                        startTime: date,

					                        })
				    }
				    this.isLoading = false;
					//render the tableDate in the template
				    this.table.renderRows();


			    })
		} else {
			this.isLoading = false;
		}


	}

	showDetails(id:string):void {
		//navigate to RecordingsDetailsComponent
		this.router.navigate(['recordings/'+id]);
	}

	subStr(string: string) : string {
		if (string) {
			if (string.length < 25) {
			  return string;
			}
			return string.substring(0,20)+ " ...";
		} else {
			return '';
		}
	}


}

//interface for the Table Data
export interface RecordingElement {
	position: number;
	id: string;
	name: string;
	comments: string;
	startTime: string;
}

