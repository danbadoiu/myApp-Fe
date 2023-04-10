import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/models/login.model';
import { Marker } from 'src/app/shared/models/marker.model';
import { AppointmentService } from 'src/app/shared/services/appointment.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-modal-for-appointment',
  templateUrl: './modal-for-appointment.component.html',
  styleUrls: ['./modal-for-appointment.component.css'],
})
export class ModalForAppointmentComponent implements OnInit {
  @ViewChild('formRef') myForm: any;
  doctor: string | undefined = '';
  doctors: string[] | undefined = [];
  message: string | undefined;
  users: User[] | undefined;
  date: Date|undefined
  loggedUser: string | undefined;
  @Input() idMarker: Marker | undefined;

  onCancel() {
    throw new Error('Method not implemented.');
  }

  constructor(
    private userService: UserService,
    private appointmentService: AppointmentService
  ) {}

  ngOnInit() {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
      // this.users?.forEach((user)=>user.role==='DOCTOR'?this.doctors?.push(user.firstName!):null)

      // doctorsArray?.forEach((id) => {
      //   const user = this.users?.find((user) => user.id === id);
      //   console.log(user)
      //   console.log(id)
      //   if (user) {
      //     this.doctors?.push(user.firstName);
      //   }
      // });
    });
    let storedUser = JSON.parse(localStorage.getItem('userData')!);
    this.loggedUser = storedUser.userDetails.id;

    let doctorsArray = this.idMarker?.doctors.split(',').map(String);

    this.doctors = doctorsArray;
  }
  createPost() {
    // const user = this.users?.find((user) => user.firstName === this.doctor);
    this.appointmentService
      .addAppointment({
        idUser: this.loggedUser!,
        idDoctor: this.doctor!,
        idMarker: this.idMarker?.id!,
        date: new Date(),
      })
      .subscribe(() => {
        console.log('dasdsdasd');
      });
  }
}
