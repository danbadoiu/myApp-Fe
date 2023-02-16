import { Component, Input, OnInit } from '@angular/core';
import { Medicine } from 'src/app/login/models/medicine.model';
import { MedicineService } from '../Medicine.service';

@Component({
  selector: 'app-Medicine',
  templateUrl: './Medicine.component.html',
  styleUrls: ['./Medicine.component.css'],
})
export class MedicineComponent implements OnInit {
  @Input() medicine: Medicine | undefined;
  medicines: Medicine[] | undefined;
  medicinesBox: string[] | undefined;
  constructor(private medicineService: MedicineService) {}

  ngOnInit() {
    this.medicineService.getMedicines().subscribe((data) => {
      this.medicines = data;
      console.log(data);
    });
  }

  onAddToBox(id: string) {
    console.log(id)
    const medicine = this.medicines?.find((medicine) => medicine?.id === id);
    console.log(medicine)
    this.medicinesBox?.push(id);
    console.log(this.medicinesBox);
  }
}
