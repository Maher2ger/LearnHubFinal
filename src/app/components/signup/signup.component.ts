//commentation done


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
  //_alertSub: listen to the errors when signup fails
  public _alertSub!: Subscription;

  alert!:string| null; //save the error message, when signup fails


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
    //call the createUser function in the authService
    this.authService.createUser(
        //pass the user credentials to the authService
        form.value.uname,
        form.value.uemail,
        form.value.uStudentNumber,
        form.value.upassword
        );
  }
}
