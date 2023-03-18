import { Component, Input, OnInit } from '@angular/core';
import { MedicineBox } from 'src/app/models/medicine.model';
import { MedicineService } from '../../Medicine.service';

@Component({
  selector: 'app-shopping-cart-medicine',
  templateUrl: './shopping-cart-medicine.component.html',
  styleUrls: ['./shopping-cart-medicine.component.css'],
})
export class ShoppingCartMedicineComponent implements OnInit {
  medicines: MedicineBox[] | undefined;
  @Input() medicine: MedicineBox | undefined;

  constructor(private medicineService: MedicineService) {}

  ngOnInit() {}

  onDelete(id: string) {
    this.medicineService.deleteMedicine(id).subscribe();
  }
}
