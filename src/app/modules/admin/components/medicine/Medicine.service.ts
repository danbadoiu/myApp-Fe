import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Medicine } from 'src/app/login/models/medicine.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MedicineService {

  private medicines: Medicine[] = [];
  constructor(private http: HttpClient){
    
  }

  addMedicine(medicine: Medicine) {
    this.medicines.push(medicine);
  }

  removeMedicine(medicine: Medicine) {
    const index = this.medicines.indexOf(medicine);
    if (index !== -1) {
      this.medicines.splice(index, 1);
    }
  }

  getMedicines2() {
    return this.medicines;
  }
  getMedicines() : Observable<Medicine[]>{
    return this.http
      .get<{ items: Medicine[] }>(`${environment.apiUrl}/core/api/v1/medicines`)
      .pipe(
        map((responseData) => {
          // console.log(responseData.items)
          return responseData.items;
          
        })
      );
  }

}
