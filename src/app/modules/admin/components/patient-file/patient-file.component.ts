import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientFile } from '../../shared/models/patient-file.model';
import { PatientFileService } from '../../shared/services/patient-file.service';

@Component({
  selector: 'app-patient-file',
  templateUrl: './patient-file.component.html',
  styleUrls: ['./patient-file.component.css'],
})
export class PatientFileComponent implements OnInit {
  patientFile: PatientFile = {
    idUser: this.route.snapshot.paramMap.get('id')!,
    fullName: '',
    birthDate: '',
    gender: '',
    bloodType: '',
    allergies: '',
    chronicDiseases: '',
    currentMedications: '',
    emergencyContact: '',
    date:new Date().toISOString()
  };
  idLoggedUser: string | undefined;
  patientId: string | undefined;

  constructor(
    private patientFileService: PatientFileService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.patientId = this.route.snapshot.paramMap.get('id')!;
    console.log(this.patientId)

    let storedUser = JSON.parse(localStorage.getItem('userData')!);
    this.idLoggedUser = storedUser?.userDetails?.id;

    if (this.idLoggedUser) {
      this.patientFileService.getPatientFiles().subscribe((response) => {
        if (response) {
          const userFile = response.find(
            (file) => file.idUser.toString() === this.patientId?.toString()
          );

          if (userFile) {
            this.patientFile = userFile;
          } else {
            this.patientFile = {
              idUser: this.patientId!,
              fullName: '',
              birthDate: '',
              gender: '',
              bloodType: '',
              allergies: '',
              chronicDiseases: '',
              currentMedications: '',
              emergencyContact: '',
              date:new Date().toISOString()
            };
          }
        }
      });
    }
  }

  onSubmit(): void {
    if (this.patientFile.idUser === this.idLoggedUser) {
      this.patientFileService
        .updatePatientFile(this.patientFile.id!, this.patientFile!)
        .subscribe();
    } else {
      this.patientFileService
        .addPatientFile(this.patientFile)
        .subscribe((response) => {
          alert('Patient File Submitted Successfully!');
        });
    }
  }
}
