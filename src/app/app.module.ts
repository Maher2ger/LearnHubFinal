import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule , ReactiveFormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header/header.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {environment} from 'src/environments/environment';
import {SocketIoModule, SocketIoConfig} from 'ngx-socket-io';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { AngularSvgIconModule } from 'angular-svg-icon';

// ----- Angualar material Imports
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatCardModule} from '@angular/material/card';
import { TerminalComponent } from './components/terminal/terminal.component';
import { StopwatchComponent } from './components/stopwatch/stopwatch.component';
import { SensorsListComponent } from './components/sensors-list/sensors-list.component';
import { RecordingsListComponent } from './components/recordings-list/recordings-list.component';


const config: SocketIoConfig = {
	url: 'http://localhost:3500', options: {
		extraHeaders: {
			type: "browser_client",
		}
	}
};

@NgModule({
	          declarations           : [AppComponent, HeaderComponent, TerminalComponent, StopwatchComponent, SensorsListComponent, RecordingsListComponent],
	          imports                : [
		          BrowserModule,
		          FormsModule,
		          ReactiveFormsModule,
		          MatToolbarModule,
		          HttpClientModule,
		          SocketIoModule.forRoot(config),
		          BrowserAnimationsModule,
		          MatSnackBarModule,
		          MatCardModule,
		          MatSlideToggleModule,
		          AngularSvgIconModule.forRoot(),
	          ],
	          providers              : [],
	          bootstrap              : [AppComponent]
          })
export class AppModule {
}
