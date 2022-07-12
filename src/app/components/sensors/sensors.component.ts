//commentation done

import {
	Component, OnInit, Input, ViewChild
} from '@angular/core';

@Component({
	           selector   : 'app-sensors',
	           templateUrl: './sensors.component.html',
	           styleUrls  : ['./sensors.component.css']
           })
export class SensorsComponent implements OnInit {
	@Input() sensorsList!: any[];      //access the sensorsList in parentComp (DashboardComp)
	//access the controlpanelConnected stat_var in Parent Comp
	@Input() controlpanelConnected!: boolean;
	//access the isRecording state_var in Parent Comp
	@Input() isRecording!: boolean;

	//access the child form Object
	@ViewChild('myForm', {static: true}) myForm: any;

	constructor() {

	}


	ngOnInit(): void {
	}

}
