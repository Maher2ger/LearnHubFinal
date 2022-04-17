import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {environment} from 'src/environments/environment';
import {SocketIoModule, SocketIoConfig} from 'ngx-socket-io';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {AngularSvgIconModule} from 'angular-svg-icon';

// ----- Angualar material Imports
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

//components
import {TerminalComponent} from './components/terminal/terminal.component';
import {StopwatchComponent} from './components/stopwatch/stopwatch.component';
import {
	SensorsListComponent
} from './components/sensors-list/sensors-list.component';
import {
	RecordingsListComponent
} from './components/recordings-list/recordings-list.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatChipsModule} from '@angular/material/chips';
import {MatFormFieldModule} from "@angular/material/form-field";
import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header/header.component';

//modules import
import {AppRoutingModule} from "./app.routing.module";
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import {AuthInterceptor} from "./services/interceptors/auth.interceptor";

//inceptors
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';


const config: SocketIoConfig = {
	url: 'http://localhost:3500', options: {
		extraHeaders: {
			type: "browser_client",
		}
	}
};

@NgModule({
	          declarations                         : [
		          AppComponent,
		          HeaderComponent,
		          TerminalComponent,
		          StopwatchComponent,
		          SensorsListComponent,
		          RecordingsListComponent,
            DashboardComponent,
            LoginComponent,
            SignupComponent],
	          imports                              : [
		          BrowserModule,
		          FormsModule,
		          ReactiveFormsModule,
		          MatToolbarModule,
		          HttpClientModule,
		          SocketIoModule.forRoot(config),
		          BrowserAnimationsModule,
		          MatSnackBarModule,
		          MatInputModule,
		          MatButtonModule,
		          AppRoutingModule,
		          MatCardModule,
		          MatSlideToggleModule,
		          AngularSvgIconModule.forRoot(),
		          MatChipsModule,
		          NgbModule,
		          MatFormFieldModule,],
	          providers                            : [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
	          bootstrap                            : [AppComponent]
          })
export class AppModule {
}
