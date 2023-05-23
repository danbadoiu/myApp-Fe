import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { map, Subscription } from 'rxjs';
import { User } from 'src/app/models/login.model';
import { Post } from 'src/app/models/posts.model';
import { Appointment } from 'src/app/modules/admin/shared/models/appointment.model';
import { AppointmentService } from 'src/app/modules/admin/shared/services/appointment.service';
import { MessageService } from 'src/app/modules/admin/shared/services/message.service';
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

  search() {
    this.filteredPosts = this.appointments!;
  }
  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private sanitizer: DomSanitizer,
    private appointmentService: AppointmentService,
    private notification: NotificationService,
    private userService: UserService
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
    this.appointmentService.getAppointments().subscribe((responseData) => {
      this.appointments = responseData;
      console.log(this.appointments,this.loggedUserRole,this.idLoggedUser)
      this.appointments = this.appointments.filter((appointment) => {
        return (
          (this.loggedUserRole === 'DOCTOR' &&
            this.idLoggedUser === appointment.idDoctor) ||
          appointment.idUser.toString() === this.idLoggedUser?.toString()
        );
      });
      console.log(this.appointments,this.loggedUserRole,this.idLoggedUser)
      this.appointments.forEach((appointment) => {
        if (appointment.date < new Date()) {
          this.appointmentService.deleteAppointment(appointment.id!);
        }

        if (appointment.idMarker === null) {
          this.notification.show(
            'You received an appointment from ' + appointment.idDoctor
          );
        }
      });
    });
    // this.http
    //   .get<Appointment[]>('http://localhost:8080/appointment')
    //   .pipe(
    //     map((responseData) => {
    //       this.appointments = responseData;
    //       this.appointments = this.appointments.filter((appointment) => {
    //         return (
    //           (this.loggedUserRole === 'DOCTOR' &&
    //             this.idLoggedUser === appointment.idDoctor) ||
    //           appointment.idUser === this.idLoggedUser
    //         );
    //       });

    //       this.appointments.forEach((appointment) => {
    //         if (appointment.date < new Date()) {
    //           this.appointmentService.deleteAppointment(appointment.id!);
    //         }

    //         if (appointment.idMarker === null) {
    //           this.notification.show(
    //             'You received an appointment from ' + appointment.idDoctor
    //           );
    //         }
    //       });
    //     })
    //   )

    //   .toPromise();

    let storedUser = JSON.parse(localStorage.getItem('userData')!);
    this.idLoggedUser = storedUser.userDetails.id;
    this.loggedUserRole = storedUser.userDetails.role;
    // this.userService.getUsers().subscribe()
    // this.http
    //   .get<User[]>('http://localhost:8080/user')
    //   .pipe(
    //     map((responseData) => {
    //       return responseData;
    //     })
    //   )
    //   .toPromise();
    // this.loggedUser = this.users?.find(
    //   (employee) => employee.id === this.idLoggedUser
    // );

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
}
