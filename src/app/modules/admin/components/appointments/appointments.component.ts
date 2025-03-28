import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/login.model';
import { Post } from 'src/app/models/posts.model';
import { Appointment } from 'src/app/modules/admin/shared/models/appointment.model';
import { AppointmentService } from 'src/app/modules/admin/shared/services/appointment.service';
import { MessageService } from 'src/app/modules/admin/shared/services/message.service';
import { Marker } from '../../shared/models/marker.model';
import { MarkerService } from '../../shared/services/marker.service';
import { NotificationService } from '../../shared/services/notification.service';
import { UserService } from '../../shared/services/user.service';
@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css'],
})
export class AppointmentsComponent implements OnInit {
  loggedUser: User | undefined;
  @ViewChild('formRef') myForm: any;

  appointments: Appointment[] | undefined;
  medicinesBox: Post[] = [];
  searchTerm = '';
  filteredPosts: Appointment[] | undefined = [];
  message: string | undefined;
  idLoggedUser: string | undefined;
  selectedPostUserId: string | undefined;
  users: User[] | undefined;
  picture: File | undefined;
  profileImage: SafeUrl | undefined;
  loggedUserRole: string | undefined;
  notificationDoctor: User | undefined;
  messageSubscription = new Subscription();
  markers: Marker[] | undefined;
  doctors: User[] = [];


  search() {
    this.filteredPosts = this.appointments!;
  }
  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private sanitizer: DomSanitizer,
    private appointmentService: AppointmentService,
    private notification: NotificationService,
    private userService: UserService,
    private markerService: MarkerService
  ) {}

  ngOnInit() {
    this.getData();
  }
  createProfileImage(image: Blob): void {
    const objectURL = 'data:image/png;base64,' + image;
    this.profileImage = this.sanitizer.bypassSecurityTrustUrl(objectURL);
  }
  onSendMessage(idUser: string) {
    this.selectedPostUserId = idUser;
  }
  sendMessage(id: string) {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
    this.messageSubscription = this.messageService
      .addMessage({
        id: '',
        message: this.message!,
        idReceiver: this.selectedPostUserId!,
        idSender: this.idLoggedUser!,
        date: new Date(),
        picture: this.picture!,
      })
      .subscribe(() => {
        this.myForm.reset();
      });
  }
  getData() {
    this.markerService.getUsers().subscribe((data) => {
      this.markers = data;
    });
    this.userService.getUsers().subscribe((data) => {
      this.doctors = data.filter((user) => user.role === 'DOCTOR');
    });
    this.appointmentService.getAppointments().subscribe((responseData) => {
      this.appointments = responseData;
      this.appointments = this.appointments.filter((appointment) => {
        return (
          (this.loggedUserRole === 'DOCTOR' &&
            this.idLoggedUser === appointment.idDoctor) ||
          appointment.idUser.toString() === this.idLoggedUser?.toString()
        );
      });
      this.appointments.forEach((appointment) => {
        if (appointment.date < new Date()) {
          this.appointmentService.deleteAppointment(appointment.id!);
        }

        if (appointment.idMarker === null) {
          this.notification.show(
            'You received an appointment from ' + this.getDoctorName(appointment.idDoctor)
          );
        }
      });
    });

    let storedUser = JSON.parse(localStorage.getItem('userData')!);
    this.idLoggedUser = storedUser.userDetails.id;
    this.loggedUserRole = storedUser.userDetails.role;

    this.filteredPosts = this.appointments?.filter((obj) => {
      return obj.idUser === this.idLoggedUser;
    });
    if (this.loggedUserRole !== 'DOCTOR') {
      this.appointments = this.filteredPosts;
    }
  }
  onPostAction(refreshData: boolean) {
    this.getData();
  }
  getDoctorName(idDoctor: string): string {
    const doctor = this.doctors.find((user) => user.id === idDoctor);
    return doctor ? `${doctor.firstName} ${doctor.lastName}` : 'Unknown Doctor';
  }
}
