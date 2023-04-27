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
import { PostsComponent } from './components/posts/posts.component';
import { MatSelectModule } from '@angular/material/select';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './auth-interceptor.service';
import { DoctorsComponent } from './components/home/doctors/doctors.component';
import { PostDetailedComponent } from './components/posts/post-detailed/post-detailed.component';
import { MessageSentComponent } from './components/services/message-detail/message-sent/message-sent.component';
import { MessageReceivedComponent } from './components/services/message-detail/message-received/message-received.component';
import { AppointmentsComponent } from './components/appointments/appointments.component';
import { AppointmentDetailComponent } from './components/appointments/appointment-detail/appointment-detail.component';
import { ModalForAppointmentComponent } from './components/location/modal-for-appointment/modal-for-appointment.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { PollComponent } from './shared/components/Poll/Poll.component';
import { MatChipsModule } from '@angular/material/chips';




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
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
        MatInputModule,
        MatChipsModule
    

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
    PostsComponent,
    DoctorsComponent,
    PostDetailedComponent,
    MessageSentComponent,
    MessageReceivedComponent,
    AppointmentsComponent,
    AppointmentDetailComponent,
    ModalForAppointmentComponent,
    PollComponent
    
  ],

  providers: [{ provide: LocationStrategy, useClass: PathLocationStrategy },{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }]
})
export class AdminModule {}
