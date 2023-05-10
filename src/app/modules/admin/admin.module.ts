import {
  CommonModule,
  LocationStrategy,
  PathLocationStrategy,
} from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AdminRoutingModule } from './admin-routing.module';
import { AuthInterceptorService } from './auth-interceptor.service';
import { AdminDashbordComponent } from './components/admin-dashbord/admin-dashbord.component';
import { AppointmentDetailComponent } from './components/appointments/appointment-detail/appointment-detail.component';
import { AppointmentsComponent } from './components/appointments/appointments.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { DoctorsDetailComponent } from './components/home/doctors-detail/doctors-detail.component';
import { DoctorsListComponent } from './components/home/doctors-list/doctors-list.component';
import { DoctorsComponent } from './components/home/doctors/doctors.component';
import { HomeComponent } from './components/home/home.component';
import { LocationComponent } from './components/location/location.component';
import { ModalForAppointmentWithoutHospitalComponent } from './components/location/modal-for-appointment-without-hospital/modal-for-appointment-without-hospital.component';
import { ModalForAppointmentComponent } from './components/location/modal-for-appointment/modal-for-appointment.component';
import { PostDetailedComponent } from './components/posts/post-detailed/post-detailed.component';
import { PostsComponent } from './components/posts/posts.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MessageDetailComponent } from './components/services/message-detail/message-detail.component';
import { MessageReceivedComponent } from './components/services/message-detail/message-received/message-received.component';
import { MessageSentComponent } from './components/services/message-detail/message-sent/message-sent.component';
import { MessageListComponent } from './components/services/message-list/message-list.component';
import { ServicesComponent } from './components/services/services.component';


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
    MatChipsModule,
    MatExpansionModule,
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
    ModalForAppointmentWithoutHospitalComponent,
  ],

  providers: [
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
})
export class AdminModule {}
