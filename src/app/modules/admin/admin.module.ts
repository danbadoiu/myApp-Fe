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
import * as modules from './index'
import * as components from './components/index';

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
    components.ModalForAppointmentComponent,
    components.ModalForAppointmentWithoutHospitalComponent,
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
