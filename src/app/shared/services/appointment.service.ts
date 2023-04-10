import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Appointment } from '../models/appointment.model';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  constructor(private http: HttpClient) {}

  getAppointments(): Observable<Appointment[]> {
    return this.http
      .get<Appointment[]>('http://localhost:8080/appointment')
      .pipe(
        map((responseData) => {
          return responseData;
        })
      );
  }
  addAppointment(appointment: Appointment): Observable<Appointment> {
    const formData = new FormData();
    const date = new Date();
    const dateString = date.toISOString().replace('T', ' ').slice(0, 19);
    formData.append('idUser', appointment.idUser);
    formData.append('idDoctor', appointment.idDoctor);
    formData.append('date', dateString);
    formData.append('idMarker', appointment.idMarker);
    return this.http.post<Appointment>(
      // `${environment.apiUrl}/core/api/v1/users`,
      'http://localhost:8080/appointment',
      formData
    );
  }

  public deleteAppointment(appointmentId: string): Observable<unknown> {
    return this.http.delete(
      `http://localhost:8080/appointment/${appointmentId}`
    );
  }
}
