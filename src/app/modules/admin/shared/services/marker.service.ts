import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Marker } from '../models/marker.model';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {

  constructor(private http: HttpClient) {}

  getUsers(): Observable<Marker[]> {
    return this.http
      .get<Marker[]>('http://localhost:8080/marker')
      .pipe(
        map((responseData) => {
          return responseData;
        })
      );
  }
}
