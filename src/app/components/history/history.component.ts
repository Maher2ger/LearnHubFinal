//commentation done

import {Component, Input, OnInit} from '@angular/core';
import {Recording} from "../../models/recording.model";


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  //get the localLecordingsList from the parent component DashboardComponent
  @Input() recordingsList!: Recording[];
  constructor() { }

  ngOnInit(): void {
  }

}
