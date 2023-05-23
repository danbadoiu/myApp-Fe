import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Marker } from '../models/marker.model';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {

  constructor(private http: HttpClient) {}

  getUsers(): Observable<Marker[]> {
    return this.http
      .get<Marker[]>(`${environment.apiUrl}/marker`)
      .pipe(
        map((responseData) => {
          return responseData;
        })
      );
  }
}
