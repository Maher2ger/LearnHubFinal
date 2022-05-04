// source:
// https://medium.com/web-developer/create-a-stopwatch-ionic-3-angular-5-d45bc0358626


import {Component, OnInit} from '@angular/core';

@Component({
	           selector   : 'app-stopwatch',
	           templateUrl: './stopwatch.component.html',
	           styleUrls  : ['./stopwatch.component.css']
           })
export class StopwatchComponent implements OnInit {
	counter: any;            //Timer var
	timerRef!:any;
	running: boolean = false;

	ngOnInit() {

	}

	startTimer() {
		this.running = !this.running;
		if (this.running) {
			const startTime = Date.now() - (this.counter || 0);
			this.timerRef = setInterval(() => {
				this.counter = Date.now() - startTime;
			});
		} else {
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
		this.counter = undefined;

		clearInterval(this.timerRef);
	}

	ngOnDestroy() {
		clearInterval(this.timerRef);
	}
}
