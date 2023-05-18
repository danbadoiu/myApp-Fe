import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { FavoriteDoctors } from '../models/favorite-doctors.model';

@Injectable({
  providedIn: 'root',
})
export class FavoriteDoctorsService {
  constructor(private http: HttpClient) {}

  getFavoriteDoctors(): Observable<FavoriteDoctors[]> {
    return this.http
      .get<FavoriteDoctors[]>('http://localhost:8080/favorite_doctors')
      .pipe(
        map((responseData) => {
          return responseData;
        })
      );
  }
  public addFavoriteDoctors(
    favoriteDoctors: FavoriteDoctors
  ): Observable<FavoriteDoctors> {
    const formData = new FormData();

    formData.append('idPatient', favoriteDoctors.idPatient);
    formData.append('doctors', favoriteDoctors.doctors);

    return this.http.post<FavoriteDoctors>(
      // `${environment.apiUrl}/core/api/v1/users`,
      'http://localhost:8080/favorite_doctors',
      formData
    );
  }
  public deleteFavoriteDoctors(id: string): Observable<unknown> {
    return this.http.delete(`http://localhost:8080/favorite_doctors/${id}`);
  }
  public updateFavoriteDoctors(
    favId: string,
    favoriteDoctors: FavoriteDoctors
  ): Observable<unknown> {
    const formData = new FormData();

    formData.append('idPatient', favoriteDoctors.idPatient);
    formData.append('doctors', favoriteDoctors.doctors);
    return this.http.put<FavoriteDoctors>(
      // `${environment.apiUrl}/core/api/v1/users`,
      `http://localhost:8080/favorite_doctors/${favId}`,
      formData
    );
  }
}
