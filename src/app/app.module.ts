// ----- modules import
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SocketIoModule, SocketIoConfig} from 'ngx-socket-io';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {AngularSvgIconModule} from 'angular-svg-icon';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatChipsModule} from '@angular/material/chips';
import {MatFormFieldModule} from "@angular/material/form-field";
import {AppRoutingModule} from "./app.routing.module";

// ----- Angualar material Imports
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

// --------- components
import {TerminalComponent} from './components/terminal/terminal.component';
import {StopwatchComponent} from './components/stopwatch/stopwatch.component';
import {
	SensorsComponent
} from './components/sensors/sensors.component';
import {
	HistoryComponent
} from './components/history/history.component';

import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header/header.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {LoginComponent} from './components/login/login.component';
import {SignupComponent} from './components/signup/signup.component';
import {SidenavComponent} from './components/sidenav/sidenav.component';
import {allRecordingsComponent} from './components/allRecordings/allRecordings.component';
import {
	RecordingDetailsComponent
} from './components/recordingDetails/recordingDetails.component';
import {AboutComponent} from './components/about/about.component';

// -------  inceptors
import {AuthInterceptor} from "./services/interceptors/auth.interceptor";
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

const config: SocketIoConfig = {
	url: 'http://localhost:3500', options: {
		extraHeaders: {
			type: "browser_client",
		}
	}
};

@NgModule({
	          declarations: [
		          AppComponent,
		          HeaderComponent,
		          TerminalComponent,
		          StopwatchComponent,
		          SensorsComponent,
		          HistoryComponent,
		          DashboardComponent,
		          LoginComponent,
		          SignupComponent,
		          SidenavComponent,
		          allRecordingsComponent,
		          RecordingDetailsComponent,
		          AboutComponent],
	          imports     : [
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
		          MatFormFieldModule,
		          MatSidenavModule,
		          MatIconModule,
		          MatDividerModule,
		          MatTableModule,
		          MatSortModule,
		          MatProgressSpinnerModule],
	          providers   : [
		          {
			          provide: HTTP_INTERCEPTORS,
			          useClass: AuthInterceptor,
			          multi: true
		          }],
	          bootstrap   : [AppComponent]
          })
export class AppModule {
}
