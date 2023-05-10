import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/models/login.model';
import { Marker } from 'src/app/modules/admin/shared/models/marker.model';
import { AppointmentService } from 'src/app/modules/admin/shared/services/appointment.service';
import { UserService } from 'src/app/modules/admin/shared/services/user.service';

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
  date: Date | undefined;
  loggedUser: string | undefined;
  options: string[] = [];
  @Input() idMarker: Marker | undefined;
  addedAppointment = 'false';

  onCancel() {
    this.date = undefined;
    this.myForm.reset();
  }

  constructor(
    private userService: UserService,
    private appointmentService: AppointmentService
  ) {}

  getDoctor(id: string): User | undefined {
    return this.users?.find((user) => {
      return user.id?.toString() === id;
    });
  }
  ngOnInit() {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
      let storedUser = JSON.parse(localStorage.getItem('userData')!);
      this.loggedUser = storedUser.userDetails.id;
      if (this.idMarker?.doctors) {
        let doctorsArray = this.idMarker?.doctors.split(',').map(String);

        this.doctors = doctorsArray;
      }
      this.doctors?.forEach((doctor) => {
        this.options?.push(
          this.getDoctor(doctor)?.firstName! +
            ' ' +
            this.getDoctor(doctor)?.lastName!
        );
      });
    });
  }

  createPost() {
    let doctorsArray = this.doctor!.split(' ').map(String);
    const doctorId = this.users?.find((user) => {
      return (
        user.firstName === doctorsArray[0] && user.lastName === doctorsArray[1]
      );
    })?.id;
    console.log(this.date);

    this.appointmentService
      .addAppointment({
        idUser: this.loggedUser!,
        idDoctor: doctorId!,
        idMarker: this.idMarker?.id!,
        date: this.date!,
        status: 'PENDING',
      })
      .subscribe(() => {
        this.addedAppointment = 'true';
      });
  }
}
