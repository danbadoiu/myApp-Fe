import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminDashbordComponent } from "./components/admin-dashbord/admin-dashbord.component";
import { HomeComponent } from "./components/home/home.component";
import { LocationComponent } from "./components/location/location.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { ServicesComponent } from "./components/services/services.component";
const routes: Routes=[{
    path:'', component: AdminDashbordComponent,
    children:[
        // {path: 'home', component:HomeComponent, canActivate:[AuthguardGuard]},
        {path: 'home', component:HomeComponent},
        {path:'services',component:ServicesComponent},
        {path: 'profile', component:ProfileComponent},
        {path: 'location', component:LocationComponent},
        {path: '', redirectTo:'/admin/home', pathMatch:'full'}
    ]
}];

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminRoutingModule {}