import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/login/models/login.model';

@Component({
  selector: 'app-doctors-list',
  templateUrl: './doctors-list.component.html',
  styleUrls: ['./doctors-list.component.css']
})
export class DoctorsListComponent {

  @Input() users?: User[] | null;
  @Output() selectedUserChanged = new EventEmitter<User>();
  selectedUser?: User;

  selectUser(user: User): void {
    this.selectedUser= user;
    this.selectedUserChanged.emit(this.selectedUser);
  }
}
