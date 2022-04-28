import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {LoginComponent} from "./components/login/login.component";
import {SignupComponent} from "./components/signup/signup.component";
import {AuthGuard} from "./services/guards/auth.guard";
import {
	RecordingsTabComponent
} from "./components/recordings-tab/recordings-tab.component";
import {
	RecordingDetailsComponent
} from "./components/recording-details/recording-details.component";

const routes: Routes = [
	{path: '',redirectTo:"dashboard", pathMatch:"full"},
	{path: 'dashboard', component: DashboardComponent,canActivate: [AuthGuard]},
	{path: 'login', component: LoginComponent},
	{path: 'signup', component: SignupComponent},
	{path: 'recordings', component: RecordingsTabComponent,canActivate: [AuthGuard]},
	{path: 'recordings/:id', component: RecordingDetailsComponent,canActivate: [AuthGuard]},
]

@NgModule({

	          imports                                    : [
		          RouterModule.forRoot(routes),],
	          exports                                    : [RouterModule],
	          providers                                  : [AuthGuard]
          })

export class AppRoutingModule {
}
