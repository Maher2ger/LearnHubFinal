import { Component, OnInit } from '@angular/core';
import { SocketService } from 'src/app/services/socket.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private _stateSub!: Subscription;
  controlpanelConnected: boolean = false;
  constructor(public socketservice: SocketService) { }

  ngOnInit(): void {
      this._stateSub = this.socketservice.controlpanelConnected
          .subscribe((state: boolean) => {
            this.controlpanelConnected = state;
          })
  }

  ngOnDestroy(): void {
    this._stateSub.unsubscribe();
  }

}
