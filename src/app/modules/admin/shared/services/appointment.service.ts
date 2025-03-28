import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Appointment } from '../models/appointment.model';
@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  constructor(private http: HttpClient) {}

  getAppointments(): Observable<Appointment[]> {
    return this.http
      .get<Appointment[]>(`${environment.apiUrl}/appointment`)
      .pipe(
        map((responseData) => {
          return responseData;
        })
      );
  }
  addAppointment(appointment: Appointment): Observable<Appointment> {
    const formData = new FormData();
    const selectedDate = appointment.date;
    const dateString = selectedDate
      ? moment(selectedDate).format('YYYY-MM-DD HH:mm:ss')
      : '';
    // const dateString = moment(date).toISOString().replace('T', ' ').slice(0, 19);
    formData.append('idUser', appointment.idUser);
    formData.append('idDoctor', appointment.idDoctor);
    formData.append('date', dateString);
    formData.append('idMarker', appointment.idMarker);
    formData.append('status', appointment.status);
    return this.http.post<Appointment>(
      // `${environment.apiUrl}/core/api/v1/users`,
      `${environment.apiUrl}/appointment`,
      formData
    );
  }

  public deleteAppointment(appointmentId: string): Observable<unknown> {
    return this.http.delete(
      `${environment.apiUrl}/appointment/${appointmentId}`
    );
  }
  public updateAppointment(
    appointmentId: string,
    appointment: Appointment
  ): Observable<unknown> {
    const formData = new FormData();
    const date = appointment.date;
    const dateString = date.toISOString().replace('T', ' ').slice(0, 19);
    formData.append('idUser', appointment.idUser);
    formData.append('idDoctor', appointment.idDoctor);
    formData.append('date', dateString);
    formData.append('idMarker', appointment.idMarker);
    formData.append('status', appointment.status);
    return this.http.put<Appointment>(
      // `${environment.apiUrl}/core/api/v1/users`,
      `${environment.apiUrl}/appointment/${appointmentId}`,
      formData
    );
  }
}
