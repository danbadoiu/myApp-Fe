import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/login/models/login.model';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css'],
})
export class MessageListComponent implements OnInit {
  @Input() data?: User[] | null;

  constructor() {}

  ngOnInit() {}

  @Output() selectedUserChanged = new EventEmitter<User>();
  @Input() usersSubject = new BehaviorSubject<User[]>([]);
  selectedUser?: User;

  selectUser(user: User): void {
    this.selectedUser = user;
    this.selectedUserChanged.emit(this.selectedUser);
  }
}
