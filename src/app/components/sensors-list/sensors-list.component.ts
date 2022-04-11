import {
	Component, OnInit, Input, ViewChild, Output, EventEmitter
} from '@angular/core';

@Component({
	           selector   : 'app-sensors-list',
	           templateUrl: './sensors-list.component.html',
	           styleUrls  : ['./sensors-list.component.css']
           })
export class SensorsListComponent implements OnInit {
	@Input() sensorsList!: any[];      //access the sensorsList in parentComp
	//access the controlpanelConnected var in Parent Comp
	@Input() controlpanelConnected!: boolean;
	//access the isRecording var in Parent Comp
	@Input() isRecording!: boolean;
	//access the startRecording func in parentComp

	//access the form Object
	@ViewChild('myForm', {static: true}) myForm: any;

	isChecked = true;

	constructor() {

	}


	ngOnInit(): void {
	}

}
