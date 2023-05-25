import { HttpClient } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { map, Subscription } from 'rxjs';
import { User } from 'src/app/models/login.model';
import { Post } from 'src/app/models/posts.model';
import { Appointment } from 'src/app/modules/admin/shared/models/appointment.model';
import { AppointmentService } from 'src/app/modules/admin/shared/services/appointment.service';
import { MessageService } from 'src/app/modules/admin/shared/services/message.service';
import { environment } from 'src/environments/environment';
import { Marker } from '../../../shared/models/marker.model';
import { MarkerService } from '../../../shared/services/marker.service';
import { SendEmailService } from '../../../shared/services/send-email.service';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-appointment-detail',
  templateUrl: './appointment-detail.component.html',
  styleUrls: ['./appointment-detail.component.css'],
})
export class AppointmentDetailComponent implements OnInit {
  onCancel() {
    this.onDelete(this.appointment?.id!);
  }
  @Input() appointment: Appointment | undefined;
  @Input() markers: Marker[] | undefined;
  profileImage: SafeUrl | undefined;
  loggedUser: User | undefined;
  @ViewChild('formRef') myForm: any;
  marker: string | undefined;
  markersList: Marker[] | undefined;
  showCancelButton = false;

  options: string[] = [];
  appointmentDate: string | undefined;
  medicinesBox: Post[] = [];
  searchTerm = '';
  message: string | undefined;
  idLoggedUser: string | undefined;
  selectedPostUserId: string | undefined;
  users: User[] | undefined = [];
  picture: File | undefined;
  idUser: string | undefined;
  loggedUserRole: string | undefined;
  @Output() savedChanges = new EventEmitter<boolean>();
  doctor: User | undefined;
  appointmentSubscription = new Subscription();
  appointmentUser: User | undefined;

  constructor(
    private sanitizer: DomSanitizer,
    private messageService: MessageService,
    private appointmentService: AppointmentService,
    private http: HttpClient,
    private markerService: MarkerService,
    private userService: UserService,
    private emailService: SendEmailService
  ) {}
  createProfileImage(image: Blob): void {
    const objectURL = 'data:image/png;base64,' + image;
    this.profileImage = this.sanitizer.bypassSecurityTrustUrl(objectURL);
  }

   async ngOnInit() {
    this.users = await this.http
      .get<User[]>(`${environment.apiUrl}/user`)
      .pipe(
        map((responseData) => {
          let date;
          if (this.appointment?.date) {
            date = new Date(this.appointment?.date);
            const dateString = date
              ?.toISOString()
              .replace('T', ' ')
              .slice(0, 19);
            this.appointmentDate = dateString!;
          }
          return responseData;
        })
      )
      .toPromise();
    this.idUser = this.appointment?.idUser;
    this.doctor = this.users?.find(
      (user) => user.id === this.appointment?.idDoctor
    );
    let storedUser = JSON.parse(localStorage.getItem('userData')!);
    this.idLoggedUser = storedUser.userDetails.id;
    this.loggedUserRole = storedUser.userDetails.role;
    this.loggedUser = this.users?.find(
      (user) => user.id === this.appointment?.idUser
    );
    this.appointmentUser = this.users?.find(
      (user) => user.id === this.appointment?.idUser
    );
    this.getMarkers();
    let date =
      new Date(this.appointment?.date!).getTime() - new Date().getTime();
    if (date < 0) {
      this.showCancelButton = true;
    }
  }

  onSendMessage(id: string) {
    this.selectedPostUserId = id;

    this.messageService
      .addMessage({
        message: this.message!,
        idSender: this.selectedPostUserId!,
        idReceiver: this.idLoggedUser!,
        date: new Date(),
        picture: this.picture!,
      })
      .subscribe(() => {
        this.myForm.reset();
      });
  }
  sendMessage(idUser: string) {
    this.messageService
      .addMessage({
        message: this.message!,
        idSender: this.selectedPostUserId!,
        idReceiver: this.idLoggedUser!,
        date: new Date(),
        picture: this.picture!,
      })
      .subscribe(() => {
        this.myForm.reset();
      });
  }

  onDelete(id: string) {
    if (this.appointmentSubscription) {
      this.appointmentSubscription.unsubscribe();
    }
    this.appointmentSubscription = this.appointmentService
      .deleteAppointment(id)
      .subscribe(() => this.savedChanges.emit(true));
  }
  onAccept(id: string) {
    this.emailService
      .sendEmail(
        this.appointmentUser?.email.toString()!,
        this.appointmentUser?.email.toString()!,
        'Appointment accepted',
        'The appointment was accepted!'
      )
      .subscribe();
    if (this.appointment?.idMarker === null) {
      this.markerService.getUsers().subscribe((data) => {
        data.forEach((marker) => {
          if (marker.name.toString() === this.marker?.toString()) {
            this.marker = marker.id;
            const dateObject = new Date(this.appointment?.date!);
            if (this.appointmentSubscription) {
              this.appointmentSubscription.unsubscribe();
            }
            this.appointmentSubscription = this.appointmentService
              .updateAppointment(id, {
                idUser: this.appointment?.idUser!,
                idDoctor: this.appointment?.idDoctor!,
                idMarker: this.marker!,
                date: dateObject,
                status: 'ACCEPTED',
              })
              .subscribe(() => {
                this.savedChanges.emit(true);
              });
          }
        });
      });
    } else {
      const dateObject = new Date(this.appointment?.date!);
      if (this.appointmentSubscription) {
        this.appointmentSubscription.unsubscribe();
      }
      this.appointmentSubscription = this.appointmentService
        .updateAppointment(id, {
          idUser: this.appointment?.idUser!,
          idDoctor: this.appointment?.idDoctor!,
          idMarker: this.appointment?.idMarker!,
          date: dateObject,
          status: 'ACCEPTED',
        })
        .subscribe(() => {
          this.savedChanges.emit(true);
        });
    }
  }
  onRefuse(id: string) {
    const dateObject = new Date(this.appointment?.date!);
    if (this.appointmentSubscription) {
      this.appointmentSubscription.unsubscribe();
    }
    this.appointmentSubscription = this.appointmentService
      .updateAppointment(id, {
        idUser: this.appointment?.idUser!,
        idDoctor: this.appointment?.idDoctor!,
        idMarker: this.appointment?.idMarker!,
        date: dateObject,
        status: 'REJECTED',
      })
      .subscribe(() => {
        this.savedChanges.emit(true);
        this.emailService
          .sendEmail(
            this.appointmentUser?.email.toString()!,
            this.appointmentUser?.email.toString()!,
            'Appointment rejected',
            'The appointment was rejected'
          )
          .subscribe();
      });
  }
  getMarkers() {
    this.markersList = this.markers;
      this.markersList = this.markersList?.filter((marker) => {
        let doctorsArray = marker.doctors.split(',').map(String);
        doctorsArray?.forEach((doctor) => {
          if (doctor.toString() === this.appointment?.idDoctor.toString()) {
            this.options?.push(marker.name);
          }
        });
      });
    // this.markerService.getUsers().subscribe((data) => {
    //   this.markersList = data;
    //   this.markersList = this.markersList?.filter((marker) => {
    //     let doctorsArray = marker.doctors.split(',').map(String);
    //     doctorsArray?.forEach((doctor) => {
    //       if (doctor.toString() === this.appointment?.idDoctor.toString()) {
    //         this.options?.push(marker.name);
    //       }
    //     });
    //   });
    // });
  }
}
