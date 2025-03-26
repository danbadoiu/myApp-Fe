import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PatientFile } from '../models/patient-file.model';

@Injectable({
  providedIn: 'root',
})
export class PatientFileService {
  constructor(private http: HttpClient) {}

  // Get all patient files
  getPatientFiles(): Observable<PatientFile[]> {
    return this.http.get<PatientFile[]>(`${environment.apiUrl}/patient-file`);
  }

  // Get patient file by ID
  getPatientFileById(id: string): Observable<PatientFile> {
    return this.http.get<PatientFile>(
      `${environment.apiUrl}/patient-file/${id}`
    );
  }
  getPatientFileByUserId(idUser: string): Observable<PatientFile> {
    return this.http.get<PatientFile>(
      `${environment.apiUrl}/patient-file/${idUser}`
    );
  }

  // Add a new patient file
  addPatientFile(patientFile: PatientFile): Observable<PatientFile> {
    const formData = new FormData();
    formData.append('idUser', patientFile.idUser);

    formData.append('fullName', patientFile.fullName);
    formData.append('birthDate', patientFile.birthDate);
    formData.append('gender', patientFile.gender);
    formData.append('bloodType', patientFile.bloodType);
    formData.append('allergies', patientFile.allergies);
    formData.append('chronicDiseases', patientFile.chronicDiseases);
    formData.append('currentMedications', patientFile.currentMedications);
    formData.append('emergencyContact', patientFile.emergencyContact);
    formData.append('date', patientFile.date);

    return this.http.post<PatientFile>(
      `${environment.apiUrl}/patient-file/upload`,
      formData
    );
  }

  // Update an existing patient file
  updatePatientFile(
    id: string,
    patientFile: PatientFile
  ): Observable<PatientFile> {
    const formData = new FormData();
    formData.append('idUser', patientFile.idUser);
    formData.append('fullName', patientFile.fullName);
    formData.append('birthDate', patientFile.birthDate);
    formData.append('gender', patientFile.gender);
    formData.append('bloodType', patientFile.bloodType);
    formData.append('allergies', patientFile.allergies);
    formData.append('chronicDiseases', patientFile.chronicDiseases);
    formData.append('currentMedications', patientFile.currentMedications);
    formData.append('emergencyContact', patientFile.emergencyContact);
    formData.append('date', patientFile.date);

    return this.http.put<PatientFile>(
      `${environment.apiUrl}/patient-file/${id}`,
      formData
    );
  }

  // Delete a patient file
  deletePatientFile(id: string): Observable<unknown> {
    return this.http.delete(`${environment.apiUrl}/patient-file/${id}`);
  }
}
