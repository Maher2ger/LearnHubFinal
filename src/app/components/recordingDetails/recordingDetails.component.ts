//commentation done

import { Component, OnDestroy, OnInit } from '@angular/core';
import {Subscription} from "rxjs";

//---- services ---
import { SocketService } from 'src/app/services/socket.service';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-recordingDetails',
  templateUrl: './recordingDetails.component.html',
  styleUrls: ['./recordingDetails.component.css']
})
export class RecordingDetailsComponent implements OnInit, OnDestroy{
  isLoading = true;       //this var is needed to control the rendering of the spinner
  recording!:any;
  params!:any;    //url params

  _RecordingDetailSub!: Subscription;   //listen to the recordingsdata from server
  constructor(private activatedRoute: ActivatedRoute,   //this service to get the url params
              private socketService: SocketService,
              private router: Router) {
    this.activatedRoute.params.subscribe(params => {
      this.params = params;
    })
  }

  ngOnInit(): void {
    this._RecordingDetailSub = this.socketService.getRecordingDetailsListner()
                                   .subscribe((data) => {
                                     this.recording = data;
                                     this.isLoading = false;
                                   })
    this.socketService.getRecordingsDetails(this.params['id']);
  }

  ngOnDestroy () {
    this._RecordingDetailSub.unsubscribe();
  }

  goBack () {
    // navigate to the recordings page
    this.router.navigate(['recordings'])
  }

  millisToMinutesAndSeconds(startTime:any, endTime:any) {
    //convert a Date Object to the format like this 5/1/2022, 3:13:30 PM
    let millis:number = Date.parse(endTime) - Date.parse(startTime);
    var minutes: number = Math.floor(millis / 60000);
    var seconds:any = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }

}
