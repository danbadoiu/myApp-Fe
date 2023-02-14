import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/login/models/login.model';
import { Message } from 'src/app/shared/models/message.model';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css'],
})
export class MessageListComponent implements OnInit {
  @Input() data?: User[] | null;
  @Input() loggedUser: User | undefined;
  @Input() messages?: Message[] | undefined;
  filterUsersForm?: FormGroup;
  searchTerm = '';
  filteredUsers: User[] = [];

  constructor() {}

  ngOnInit() {
  }
  getLastMessage(id: string): string{
    const filteredList = this.messages!.filter(
      (obj) => obj.idReceiver === id || obj.idSender === id
    );
    if (filteredList && filteredList.length > 0) {
      return filteredList[filteredList.length - 1].message!;
    } else {
      return '';
    }
    
  }
  search() {
    if (this.searchTerm === '') {
      this.filteredUsers = this.data!;
    } else {
      this.filteredUsers = this.data!.filter((user) =>
        user.firstName.toLowerCase().includes(this.searchTerm.toLowerCase()) || user.lastName.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    this.data = this.filteredUsers
  }


  @Output() selectedUserChanged = new EventEmitter<User>();
  @Input() usersSubject = new BehaviorSubject<User[]>([]);
  selectedUser?: User;

  selectUser(user: User): void {
    this.selectedUser = user;
    this.selectedUserChanged.emit(this.selectedUser);
  }
}
