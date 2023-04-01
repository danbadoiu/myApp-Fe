import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/login.model';
import { Message } from 'src/app/shared/models/message.model';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css'],
})
export class MessageListComponent implements OnInit, OnChanges {
  @Input() data?: User[] | null;
  @Input() loggedUser: User | undefined;
  @Input() messages?: Message[] | undefined;
  searchTerm = '';
  filteredUsers: User[] | null = [];

  constructor() {
    this.filteredUsers = this.data!;
  }

  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] && changes['data'].currentValue) {
      this.filteredUsers = changes['data'].currentValue;
    }
  }

  getLastMessage(id: string): string {
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
    this.selectedUser = undefined
    this.selectedUserChanged.emit(this.selectedUser);
    if (this.searchTerm === '') {
      this.filteredUsers = this.data!;
    } else {
      const filtered = this.data!.filter(
        (user) =>
          user.firstName
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase()) ||
          user.lastName.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
      this.filteredUsers = filtered.length ? filtered : null;
    }
  }

  @Output() selectedUserChanged = new EventEmitter<User>();
  @Input() usersSubject = new BehaviorSubject<User[]>([]);
  selectedUser?: User;

  selectUser(user: User): void {
    this.selectedUser = user;
    this.selectedUserChanged.emit(this.selectedUser);
  }
}
