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
import { Message } from 'src/app/modules/admin/shared/models/message.model';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css'],
})
export class MessageListComponent implements OnInit, OnChanges {
  @Input() data?: User[] | null;
  @Input() loggedUser: User | undefined;
  @Input() messages?: Message[] | undefined;
  users: User[] | undefined;
  searchTerm = '';
  filteredUsers: User[] | null = [];

  constructor() {}

  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] && changes['data'].currentValue) {
      this.filteredUsers = changes['data'].currentValue;
    }
  }

  messageBetweenUsers(idSender: string, idReceiver: string): boolean {
    const filteredList = this.messages!.filter(
      (obj) =>
        (obj.idReceiver === idReceiver && obj.idSender === idSender) ||
        (obj.idReceiver === idSender && obj.idSender === idReceiver)
    );
    if (filteredList && filteredList.length > 0) {
      return true;
    } else {
      return false;
    }
  }
  getLastMessage(id: string): string {
    const filteredList = this.messages!.filter(
      (obj) => obj.idReceiver === id || obj.idSender === id
    );
    if (filteredList && filteredList.length > 0) {
      if(filteredList[filteredList.length - 1].message===''){
        return 'Image';
      }
      else{return filteredList[filteredList.length - 1].message!;}
      
    } else {
      return '';
    }
  }
  getMessage(idUser: string | undefined): Message[] {
    return this.messages!.filter(
      (obj) => obj.idReceiver === idUser || obj.idSender === idUser
    );
  }
  search() {
    this.selectedUser = undefined;
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
    // this.selectedUserChanged.emit(this.selectedUser);
    this.selectedUserChanged.emit({...this.selectedUser});
  }
}
