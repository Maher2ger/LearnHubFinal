// source:
// https://medium.com/web-developer/create-a-stopwatch-ionic-3-angular-5-d45bc0358626

import {Component, OnInit} from '@angular/core';

@Component({
	           selector   : 'app-stopwatch',
	           templateUrl: './stopwatch.component.html',
	           styleUrls  : ['./stopwatch.component.css']
           })
export class StopwatchComponent implements OnInit {
	counter2: string = "0";
	counter: any;
	timerRef!:any;
	running: boolean = false;
	startText = 'Start';

	ngOnInit() {

	}

	startTimer() {
		this.running = !this.running;
		if (this.running) {
			this.startText = 'Stop';
			const startTime = Date.now() - (this.counter || 0);
			this.timerRef = setInterval(() => {
				this.counter = Date.now() - startTime;
				this.counter2 = this.msToTime(this.counter);


			});
		} else {
			this.startText = 'Resume';
			clearInterval(this.timerRef);
		}
	}

	msToTime(duration:number) {
		var milliseconds = Math.floor((duration % 1000) / 100),
			seconds:any = Math.floor((duration / 1000) % 60),
			minutes:any = Math.floor((duration / (1000 * 60)) % 60),
			hours:any = Math.floor((duration / (1000 * 60 * 60)) % 24);

		hours = (hours < 10) ? "0" + hours : hours;
		minutes = (minutes < 10) ? "0" + minutes : minutes;
		seconds = (seconds < 10) ? "0" + seconds : seconds;

		return hours + ":" + minutes + ":" + seconds + "." + milliseconds;}

	clearTimer() {
		this.running = false;
		this.startText = 'Start';
		this.counter = undefined;
		this.counter2 = "0";

		clearInterval(this.timerRef);
	}

	ngOnDestroy() {
		clearInterval(this.timerRef);
	}
}
