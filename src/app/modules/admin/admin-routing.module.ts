import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthguardGuard } from "src/app/authguard.guard";
import { AdminDashbordComponent } from "./components/admin-dashbord/admin-dashbord.component";
import { HomeComponent } from "./components/home/home.component";
import { ServicesComponent } from "./components/services/services.component";
const routes: Routes=[{
    path:'', component: AdminDashbordComponent,
    children:[
        {path: 'home', component:HomeComponent, canActivate:[AuthguardGuard]},
        {path:'services',component:ServicesComponent},
        {path: '', redirectTo:'/admin/home', pathMatch:'full'}
    ]
}];

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminRoutingModule {}