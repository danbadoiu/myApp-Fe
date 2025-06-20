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
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AdminRoutingModule } from './admin-routing.module';
import { AuthInterceptorService } from './auth-interceptor.service';
import * as components from './components/index';
import { DoctorNamePipe } from './shared/doctor-name.pipe';
import { MarkerNamePipe } from './shared/marker-name.pipe';
import { TimePipe } from './shared/time.pipe';

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
    MatTooltipModule,
    MatDialogModule
  ],
  declarations: [
    components.AdminDashbordComponent,
    components.FooterComponent,
    components.HeaderComponent,
    components.HomeComponent,
    components.ServicesComponent,
    components.ProfileComponent,
    components.MessageDetailComponent,
    components.MessageListComponent,
    components.LocationComponent,
    components.DoctorsDetailComponent,
    components.DoctorsListComponent,
    components.PostsComponent,
    components.DoctorsComponent,
    components.PostDetailedComponent,
    components.MessageSentComponent,
    components.MessageReceivedComponent,
    components.AppointmentDetailComponent,
    components.AppointmentsComponent,
    components.PatientsInfoComponent,
    components.PatientsInfoDetailedComponent,
    components.ModalForAppointmentComponent,
    components.ModalForAppointmentWithoutHospitalComponent,
    components.ModalComponent,
    DoctorNamePipe,
    MarkerNamePipe,
    TimePipe,
    components.PatientFileComponent,
    components.PatientRaportComponent,
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
