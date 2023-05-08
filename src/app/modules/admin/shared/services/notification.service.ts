import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}
  show(message: string, action: string = 'Close', duration: number = 5000) {
    this.snackBar.open(message, action, {
      duration,
      panelClass: ['custom-snackbar'],
    });
  }
}
