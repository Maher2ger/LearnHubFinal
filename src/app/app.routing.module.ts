// ----- modules import
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

// ----- compnents import
import {
	allRecordingsComponent
} from "./components/allRecordings/allRecordings.component";
import {
	RecordingDetailsComponent
} from "./components/recordingDetails/recordingDetails.component";
import { AboutComponent } from './components/about/about.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {LoginComponent} from "./components/login/login.component";
import {SignupComponent} from "./components/signup/signup.component";

//--- Services and Guards
import {AuthGuard} from "./services/guards/auth.guard";


const routes: Routes = [
	{path: '',redirectTo:"dashboard", pathMatch:"full"},
	{path: 'dashboard', component: DashboardComponent,canActivate: [AuthGuard]},
	{path: 'login', component: LoginComponent},
	{path: 'signup', component: SignupComponent},
	{path: 'recordings', component: allRecordingsComponent,canActivate: [AuthGuard]},
	{path: 'recordings/:id', component: RecordingDetailsComponent,canActivate: [AuthGuard]},
	{path: 'about', component: AboutComponent},
	{path: '**',redirectTo:"dashboard", pathMatch:"full"},
]

@NgModule({

	          imports                                    : [
		          RouterModule.forRoot(routes),],
	          exports                                    : [RouterModule],
	          providers                                  : [AuthGuard]
          })

export class AppRoutingModule {
}
