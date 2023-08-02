import { LoginComponent } from './user-management/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './user-management/login/guards/login.guard';
import { SignupComponent } from './user-management/signup/signup.component';
import { ApplicantRoutingRoutingModule } from './applicant-management/applicant-routing/applicant-routing-routing.module';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  { path: 'signup', component: SignupComponent },
  {
    path: 'applicant-routing-',
    loadChildren: () =>
      import('./applicant-management/applicant-routing/applicant-routing-routing.module').then(
        (m) => m.ApplicantRoutingRoutingModule
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import('./master-layout/master-layout.module').then(
        (m) => m.MasterLayoutModule
      ),
    canActivate: [LoginGuard],
  },
  
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
  ApplicantRoutingRoutingModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
