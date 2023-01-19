import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthguardGuard } from './authguard.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  { path: 'home', component: HomeComponent, canActivate: [AuthguardGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'home/register', component: RegisterComponent },
  { path: 'home/profile', component: ProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
