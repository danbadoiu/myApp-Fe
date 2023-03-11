import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorGuard } from '../doctor.guard';
import { AuthGuard } from './authguard.guard';
import { AdminDashbordComponent } from './components/admin-dashbord/admin-dashbord.component';
import { HomeComponent } from './components/home/home.component';
import { LocationComponent } from './components/location/location.component';
import { MedicineBoxComponent } from './components/medicine/medicine-box/medicine-box.component';
import { MedicineComponent } from './components/medicine/Medicine/Medicine.component';
import { PostsComponent } from './components/posts/posts.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ServicesComponent } from './components/services/services.component';
const routes: Routes = [
  {
    path: '',
    component: AdminDashbordComponent,
    children: [
      // {path: 'home', component:HomeComponent, canActivate:[AuthguardGuard]},
      { path: 'home', component: HomeComponent },
      { path: 'messages', component: ServicesComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'medicine', component: MedicineComponent,canActivate:[DoctorGuard]},
      { path: 'medicine-box', component: MedicineBoxComponent },
      { path: 'posts', component: PostsComponent, canActivate:[DoctorGuard]},
      {
        path: 'location',
        component: LocationComponent,
        canActivate: [AuthGuard],
      },
      { path: '', redirectTo: '/admin/home', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
