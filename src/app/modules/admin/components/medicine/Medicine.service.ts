import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Medicine, MedicineBox } from 'src/app/models/medicine.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MedicineService {
  private medicines: Medicine[] = [];
  constructor(private http: HttpClient) {}

  // addMedicine(medicine: Medicine) {
  //   this.medicines.push(medicine);
  // }

  removeMedicine(medicine: Medicine) {
    const index = this.medicines.indexOf(medicine);
    if (index !== -1) {
      this.medicines.splice(index, 1);
    }
  }

  getMedicines2() {
    return this.medicines;
  }
  getMedicines(): Observable<MedicineBox[]> {
    return this.http
    .get<MedicineBox[]>('http://localhost:8080/medicine')
    .pipe(
      map((responseData) => {
        return responseData;
      })
    );
  }
  // getMessages(): Observable<Message[]> {
  //   return this.http.get<Message[]>(
  //     `${environment.apiUrl}/core/api/v1/messages`
  //   );
  // }
  public addMedicine(medicine: MedicineBox): Observable<Medicine> {
    return this.http.post<MedicineBox>(
      `${environment.apiUrl}/core/api/v1/medicinesBox`,
      medicine
    );
  }
  deleteMedicine(medicineId: string): Observable<unknown> {
    return this.http.delete(
      `${environment.apiUrl}/core/api/v1/medicinesBox/${medicineId}`
    );
  }
}
