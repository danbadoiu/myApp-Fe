import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Medicine } from 'src/app/login/models/medicine.model';
import { environment } from 'src/environments/environment';
import { MedicineService } from '../Medicine.service';

@Component({
  selector: 'app-medicine-box',
  templateUrl: './medicine-box.component.html',
  styleUrls: ['./medicine-box.component.css'],
})
export class MedicineBoxComponent implements OnInit {
  medicines: Medicine[] | undefined;
  medicinesBox: Medicine[] = [];
  constructor(
    private http: HttpClient,
    private medicineService: MedicineService
  ) {}

  ngOnInit() {
    this.loadMedicines();
  }
  async loadMedicines() {
    this.medicines = await this.http
      .get<{ items: Medicine[] }>(
        `${environment.apiUrl}/core/api/v1/medicinesBox`
      )
      .pipe(
        map((responseData) => {
          return responseData.items;
        })
      )
      .toPromise();
    console.log(this.medicines);
  }
  onDelete(id: string) {
    this.medicineService
      .deleteMedicine(id)
      .subscribe(() => this.loadMedicines());
  }
}
