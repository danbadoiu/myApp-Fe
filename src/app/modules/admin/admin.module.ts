import { CommonModule, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashbordComponent } from './components/admin-dashbord/admin-dashbord.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { ServicesComponent } from './components/services/services.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MessageDetailComponent } from './components/services/message-detail/message-detail.component';
import { MessageListComponent } from './components/services/message-list/message-list.component';
import { LocationComponent } from './components/location/location.component';
import { AuthGuard } from './authguard.guard';
import { DoctorsDetailComponent } from './components/home/doctors-detail/doctors-detail.component';
import { DoctorsListComponent } from './components/home/doctors-list/doctors-list.component';
import { MedicineComponent } from './components/medicine/Medicine/Medicine.component';
import { MedicineBoxComponent } from './components/medicine/medicine-box/medicine-box.component';
import { PostsComponent } from './components/posts/posts.component';
import { MatSelectModule } from '@angular/material/select';




// Material Modules


@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSelectModule
    

  ],
  declarations: [
    AdminDashbordComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    ServicesComponent,
    ProfileComponent,
    MessageDetailComponent,
    MessageListComponent,
    LocationComponent,
    DoctorsDetailComponent,
    DoctorsListComponent,
    MedicineComponent,
    MedicineBoxComponent,
    PostsComponent
  ],

  providers: [{ provide: LocationStrategy, useClass: PathLocationStrategy }]
})
export class AdminModule {}
