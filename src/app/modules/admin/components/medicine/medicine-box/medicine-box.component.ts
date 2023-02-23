import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Medicine, MedicineBox } from 'src/app/models/medicine.model';
import { environment } from 'src/environments/environment';
import { MedicineService } from '../Medicine.service';

@Component({
  selector: 'app-medicine-box',
  templateUrl: './medicine-box.component.html',
  styleUrls: ['./medicine-box.component.css'],
})
export class MedicineBoxComponent implements OnInit {
  medicines: MedicineBox[] | undefined;
  medicinesBox: Medicine[] = [];
  searchTerm = '';
  filteredMedicines: Medicine[] = [];
  loggedUserId: string | undefined;

  search() {
    if (this.searchTerm === '') {
      this.filteredMedicines = this.medicines!;
    } else {
      this.filteredMedicines = this.medicines!.filter((medicine) =>
        medicine.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }
  constructor(
    private http: HttpClient,
    private medicineService: MedicineService
  ) {}

  ngOnInit() {
    this.loadMedicines();
  }
  async loadMedicines() {
    this.medicines = await this.http
      .get<{ items: MedicineBox[] }>(
        `${environment.apiUrl}/core/api/v1/medicinesBox`
      )
      .pipe(
        map((responseData) => {
          return responseData.items;
        })
      )
      .toPromise();
    let storedUser = JSON.parse(localStorage.getItem('userData')!);
    this.loggedUserId = storedUser.userDetails.userId;
  }
  onDelete(id: string) {
    this.medicineService
      .deleteMedicine(id)
      .subscribe(() => this.loadMedicines());
  }
}
