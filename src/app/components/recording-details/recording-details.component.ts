import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { SocketService } from 'src/app/services/socket.service';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-recording-details',
  templateUrl: './recording-details.component.html',
  styleUrls: ['./recording-details.component.css']
})
export class RecordingDetailsComponent implements OnInit {
  isLoading = true;

  recording:any = {};
  _RecordingDetailSub!: Subscription;
  params!:any;
  constructor(private activatedRoute: ActivatedRoute,
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
    this.router.navigate(['recordings'])
  }

  millisToMinutesAndSeconds(startTime:any, endTime:any) {
    let millis:number = Date.parse(endTime) - Date.parse(startTime);
    var minutes: number = Math.floor(millis / 60000);
    var seconds:any = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }

}
