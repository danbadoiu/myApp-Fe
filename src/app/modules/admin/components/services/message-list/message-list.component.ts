import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  @Output() selectedUserChanged = new EventEmitter<User>();
  @Input() usersSubject = new BehaviorSubject<User[]>([]);
  selectedUser?: User;

  selectUser(user: User): void {
    this.selectedUser = user;
    this.selectedUserChanged.emit(this.selectedUser);
  }
}
