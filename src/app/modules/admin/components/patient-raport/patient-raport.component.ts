import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PatientRaport } from '../../shared/models/patient-raport.model';
import { PatientRaportService } from '../../shared/services/patient-raport.service';

@Component({
  selector: 'app-patient-raport',
  templateUrl: './patient-raport.component.html',
  styleUrls: ['./patient-raport.component.css'],
})
export class PatientRaportComponent {
  idUser: string | undefined;
  form: any = { raport: '' };
  existingRaport: PatientRaport | null = null; // Store existing report

  constructor(
    private patientRaportService: PatientRaportService,
    public dialogRef: MatDialogRef<PatientRaportComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { idUser: string }
  ) {
    this.idUser = data.idUser;
  }

  ngOnInit() {
    console.log('Received idUser:', this.idUser);
    this.loadExistingRaport();
  }

  loadExistingRaport() {
    this.patientRaportService.getPatientRaportById(this.idUser!).subscribe(
      (existingReport: PatientRaport | null) => {
        if (existingReport) {
          this.existingRaport = existingReport;
          this.form.raport = existingReport.raport; // Pre-fill textarea
        }
      },
      (error) => {
        console.error('Error fetching existing report:', error);
      }
    );
  }

  closeModal() {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.form.raport.trim()) {
      if (this.existingRaport) {
        // Update existing report
        const updatedRaport: PatientRaport = {
          ...this.existingRaport,
          raport: `${this.existingRaport.raport}\n${this.form.raport}`,
        };

        this.patientRaportService
          .updatePatientRaport(updatedRaport.id!, updatedRaport)
          .subscribe(
            () => {
              this.dialogRef.close(updatedRaport);
            },
            (error) => {
              console.error('Error updating report:', error);
            }
          );
      } else {
        // Create a new report if it doesn't exist
        const newRaport = {
          idUser: this.idUser!,
          raport: this.form.raport,
        };

        this.patientRaportService.addPatientRaport(newRaport).subscribe(
          () => {
            this.dialogRef.close(newRaport);
          },
          (error) => {
            console.error('Error creating report:', error);
          }
        );
      }
    } else {
      alert('Please fill in the report field.');
    }
  }
}
