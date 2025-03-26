import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './authguard.guard';
import { PatientFileComponent } from './components';
import { AdminDashbordComponent } from './components/admin-dashbord/admin-dashbord.component';
import { AppointmentsComponent } from './components/appointments/appointments.component';
import { DoctorsComponent } from './components/home/doctors/doctors.component';
import { HomeComponent } from './components/home/home.component';
import { LocationComponent } from './components/location/location.component';
import { PatientsInfoComponent } from './components/patients-info/patients-info.component';
import { PostsComponent } from './components/posts/posts.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ServicesComponent } from './components/services/services.component';
const routes: Routes = [
  {
    path: '',
    component: AdminDashbordComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'doctors', component: DoctorsComponent },
      { path: 'messages', component: ServicesComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'appointments', component: AppointmentsComponent },
      { path: 'patients-info', component: PatientsInfoComponent },
      { path: 'patient-file/:id', component: PatientFileComponent }, // Updated with ID parameter
      { path: 'posts', component: PostsComponent },
      {
        path: 'location',
        component: LocationComponent,
        canActivate: [AuthGuard],
      },
      { path: '', redirectTo: '/admin/posts', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
