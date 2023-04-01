import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
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
  medicine: MedicineBox|undefined
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
    // this.loadMedicines();
    this.medicineService.getMedicines().subscribe((data) => {
      this.medicines = data;
    });

  }
  // loadMedicines():Observable<MedicineBox[]> {
  //   return this.http
  //   .get<MedicineBox[]|undefined>('http://localhost:8080/medicine')
  //   .pipe(
  //     map((responseData) => {
  //       return responseData;
  //     })
  //   );
    loadMedicines(): Observable<Medicine[]> {
      return this.http
      .get<Medicine[]>('http://localhost:8080/medicine')
      .pipe(
        map((responseData) => {
          return responseData;
        })
      );
    
      
   
    let storedUser = JSON.parse(localStorage.getItem('userData')!);
    this.loggedUserId = storedUser.userDetails.userId;
  }
  onDelete(id: string) {
    this.medicineService
      .deleteMedicine(id)
      .subscribe(() => this.loadMedicines());
  }
}
