import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientFile } from '../../shared/models/patient-file.model';
import { PatientFileService } from '../../shared/services/patient-file.service';

@Component({
  selector: 'app-patient-file',
  templateUrl: './patient-file.component.html',
  styleUrls: ['./patient-file.component.css'],
})
export class PatientFileComponent implements OnInit {
  patientFile: PatientFile = {
    idUser: '',
    fullName: '',
    birthDate: '',
    gender: '',
    bloodType: '',
    allergies: '',
    chronicDiseases: '',
    currentMedications: '',
    emergencyContact: '',
    date: new Date().toISOString(),
  };

  patientHistory: PatientFile[] = [];  // To hold multiple patient files
  isHistoryView: boolean = false;  // Flag to check if we're viewing history
  isNewRecord: boolean = false;  // Flag to determine if it's a new record
  idLoggedUser: string | undefined;
  patientId: string | undefined;
  idFile: string | null = '';
  constructor(
    private patientFileService: PatientFileService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.patientId = this.route.snapshot.paramMap.get('id')!;
    this.idFile = this.route.snapshot.paramMap.get('idFile');
    let storedUser = JSON.parse(localStorage.getItem('userData')!);
    this.idLoggedUser = storedUser?.userDetails?.id;
  
    // Determine if this is history mode
    this.isHistoryView = this.router.url.includes('history') && !this.idFile;
  
    if (!this.idLoggedUser) return;
  
    if (this.idFile) {
      // 👀 Specific file view (form with data)
      this.isHistoryView = false;
      this.patientFileService.getPatientFileById(this.idFile).subscribe((file) => {
        if (file) {
          this.patientFile = file;
        }
      });
    } else if (this.isHistoryView) {
      // 📜 Show all file history
      this.patientFileService.getPatientFiles().subscribe((response) => {
        if (response) {
          this.patientHistory = response
            .filter((file) => file.idUser.toString() === this.patientId)
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        }
      });
    } else {
      // 🆕 Or latest/new file for edit/create
      this.patientFileService.getPatientFiles().subscribe((response) => {
        if (response) {
          const userFiles = response.filter((file) => file.idUser.toString() === this.patientId);
          if (userFiles.length > 0) {
            const latestFile = userFiles.reduce((latest, current) =>
              new Date(current.date) > new Date(latest.date) ? current : latest
            );
            this.patientFile = latestFile;
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
              date: new Date().toISOString(),
            };
          }
        }
      });
    }
  }
  
  onSubmit(): void {
    if (this.isNewRecord) {
      const newFile = { ...this.patientFile, id: undefined };
      this.patientFileService.addPatientFile(newFile).subscribe((response) => {
        alert('New Patient File Created Successfully!');
        // Optionally, navigate back to the patient file view after submission
        this.router.navigate([`/admin/patient-file/${this.patientId}`]);
      });
    } else {
        this.patientFileService
          .updatePatientFile(this.patientFile.id!, this.patientFile!)
          .subscribe(() => {
            alert('Patient File Updated Successfully!');
          });
     
    }
  }
  navigateToFileHistory(idUser: string, idFile: string): void {
    this.router.navigate(['/admin/patient-file', idUser, 'history', idFile]);
  }
}
