import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import { AuthService } from 'src/app/services/auth.service';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  public _alertSub!: Subscription;

  alert!:string| null;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this._alertSub = this.authService.getAlertListner()
                         .subscribe(value => {
                           this.alert = value;
                         })
  }

  ngOnDestroy():void {
    this._alertSub.unsubscribe();
  }
  onSignup(form: NgForm): void {
    this.authService.createUser(
        form.value.uname,
        form.value.uemail,
        form.value.uStudentNumber,
        form.value.upassword
        );
  }
}
