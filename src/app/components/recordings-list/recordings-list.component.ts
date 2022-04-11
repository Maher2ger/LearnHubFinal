import {Component, Input, OnInit} from '@angular/core';
import {Recording} from "../../models/recording.model"

@Component({
  selector: 'app-recordings-list',
  templateUrl: './recordings-list.component.html',
  styleUrls: ['./recordings-list.component.css']
})
export class RecordingsListComponent implements OnInit {
  @Input() recordingsList!: Recording[];
  constructor() { }

  ngOnInit(): void {
  }

}
