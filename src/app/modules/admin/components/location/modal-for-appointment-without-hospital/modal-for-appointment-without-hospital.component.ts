import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/models/login.model';
import { Marker } from '../../../shared/models/marker.model';
import { AppointmentService } from '../../../shared/services/appointment.service';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-modal-for-appointment-without-hospital',
  templateUrl: './modal-for-appointment-without-hospital.component.html',
  styleUrls: ['./modal-for-appointment-without-hospital.component.css'],
})
export class ModalForAppointmentWithoutHospitalComponent implements OnInit {
  @ViewChild('formRef') myForm: any;
  doctor: string | undefined = '';
  doctors: string[] | undefined = [];
  message: string | undefined;
  users: User[] | undefined;
  date: Date | undefined;
  loggedUser: string | undefined;
  options: string[] = [];
  doctorOptions: string[] = [];
  idMarker: Marker | undefined;
  addedAppointment = 'false';
  marker: string | undefined;
  @Input() markersList: Marker[] | undefined;

  selectedHospital: string | undefined;

  onHospitalSelect() {
    let markerFinal: Marker | undefined;
    this.markersList?.forEach((marker) => {
      if (marker.name.toString() === this.marker!.toString()) {
        markerFinal = marker;
      }
    });
    if (markerFinal?.doctors) {
      let doctorsArray = markerFinal.doctors.split(',').map(String);
      doctorsArray.forEach((doctor) => {
        this.doctorOptions?.push(
          this.getDoctor(doctor)?.firstName! +
            ' ' +
            this.getDoctor(doctor)?.lastName!
        );
      });
    }
  }
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

      this.markersList?.forEach((marker) => {
        this.options?.push(marker.name);
      });

      let doctorsArray = this.doctor!.split(' ').map(String);
      const doctorId = this.users?.find((user) => {
        return (
          user.firstName === doctorsArray[0] &&
          user.lastName === doctorsArray[1]
        );
      })?.id;
    });
  }

  createPost() {
    let doctorsArray = this.doctor!.split(' ').map(String);
    const doctorId = this.users?.find((user) => {
      return (
        user.firstName === doctorsArray[0] && user.lastName === doctorsArray[1]
      );
    })?.id;

    this.markersList?.forEach((marker) => {
      if (marker.name.toString() === this.marker!.toString()) {
        this.marker = marker.id;
      }
    });
    this.appointmentService
      .addAppointment({
        idUser: this.loggedUser!,
        idDoctor: doctorId!,
        idMarker: this.marker!,
        date: this.date!,
        status: 'PENDING',
      })
      .subscribe(() => {
        this.addedAppointment = 'true';
      });
  }
}
