import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from 'src/app/models/login.model';

@Component({
  selector: 'app-doctors-list',
  templateUrl: './doctors-list.component.html',
  styleUrls: ['./doctors-list.component.css'],
})
export class DoctorsListComponent {
  @Input() users?: User[] | null;
  @Output() selectedUserChanged = new EventEmitter<User>();
  selectedUser?: User;

  selectUser(user: User): void {
    this.selectedUser = user;
    this.selectedUserChanged.emit(this.selectedUser);
  }
}
