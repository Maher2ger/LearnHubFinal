import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from 'src/app/services/auth.service';
import {MatTable} from "@angular/material/table";
import {Router} from "@angular/router";
import { SocketService } from 'src/app/services/socket.service';


@Component({
	           selector   : 'app-recordings-tab',
	           templateUrl: './recordings-tab.component.html',
	           styleUrls  : ['./recordings-tab.component.css']
           })
export class RecordingsTabComponent implements OnInit {
	isLoading = true;
	@ViewChild(MatTable) table!: MatTable<RecordingElement>;
	userId = this.authService.getUserId();
	tableData: RecordingElement[] = [];
	displayedColumns: string[] = ['name', 'comments', 'startTime', 'details'];

	constructor(private authService: AuthService,private router: Router,
	            private socketService: SocketService) {
	}

	ngOnInit() {

		if (this.userId) {
			this.socketService.getRecordingsList(this.userId)
			    .subscribe((data) => {
				    for(let [key,recording] of data.entries()) {
					    this.tableData.push({
						                        position: key+1,
						                        id: recording._id,
						                        name     : recording.name,
						                        comments : recording.comments,
						                        startTime: recording.startTime,

					                        })
				    }
				    this.isLoading = false;
				    this.table.renderRows();


			    })
		} else {
			this.isLoading = false;
			console.log('no recordings found');
		}


	}

	showDetails(id:string):void {
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

export interface RecordingElement {
	position: number;
	id: string;
	name: string;
	comments: string;
	startTime: Date;
}

