import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PatientRaport } from '../models/patient-raport.model';

@Injectable({ providedIn: 'root' })
export class PatientRaportService {
  constructor(private http: HttpClient) {}

  // Get all patient files
  getPatientRaports(): Observable<PatientRaport[]> {
    return this.http.get<PatientRaport[]>(
      `${environment.apiUrl}/patient-raport`
    );
  }

  // Get patient file by ID
  getPatientRaportById(id: string): Observable<PatientRaport> {
    return this.http.get<PatientRaport>(
      `${environment.apiUrl}/patient-raport/${id}`
    );
  }

  // Add a new patient file
  addPatientRaport(patientRaport: PatientRaport): Observable<PatientRaport> {
    const formData = new FormData();
    formData.append('idUser', patientRaport.idUser);
    formData.append('raport', patientRaport.raport);

    return this.http.post<PatientRaport>(
      `${environment.apiUrl}/patient-raport`,
      formData
    );
  }

  // Update an existing patient file
  updatePatientRaport(
    id: string,
    patientRaport: PatientRaport
  ): Observable<PatientRaport> {
    const formData = new FormData();
    formData.append('idUser', patientRaport.idUser);
    formData.append('raport', patientRaport.raport);

    return this.http.put<PatientRaport>(
      `${environment.apiUrl}/patient-raport/${id}`,
      formData
    );
  }

  // Delete a patient file
  deletePatientRaport(id: string): Observable<unknown> {
    return this.http.delete(`${environment.apiUrl}/patient-raport/${id}`);
  }
}
