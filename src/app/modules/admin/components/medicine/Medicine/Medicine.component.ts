import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Medicine } from 'src/app/models/medicine.model';
import { environment } from 'src/environments/environment';
import { MedicineService } from '../Medicine.service';

@Component({
  selector: 'app-Medicine',
  templateUrl: './Medicine.component.html',
  styleUrls: ['./Medicine.component.css'],
})
export class MedicineComponent implements OnInit {
  @Input() medicinesBox2: Medicine[] | undefined;

  medicines: Medicine[] | undefined;
  medicinesBox: Medicine[] = [];
  searchTerm = '';
  filteredMedicines: Medicine[] = [];

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
    private medicineService: MedicineService,
    private http: HttpClient
  ) {}

  async ngOnInit() {
    if (this.medicinesBox2) {
      this.medicines = this.medicinesBox2;
    } else {
      this.medicines = await this.http
        .get<{ items: Medicine[] }>(
          `${environment.apiUrl}/core/api/v1/medicines`
        )
        .pipe(
          map((responseData) => {
            return responseData.items;
          })
        )
        .toPromise();
    }
  }

  onAddToBox(id: string) {
    const medicine = this.medicines?.find((medicine) => medicine?.id === id);
    this.medicinesBox?.push(medicine!);
    this.medicineService.addMedicine(medicine!).subscribe(() => {});
  }
}
