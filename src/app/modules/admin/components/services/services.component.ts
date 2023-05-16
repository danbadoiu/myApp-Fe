import { HttpClient } from '@angular/common/http';
import {
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from 'src/app/models/login.model';
import { Message } from 'src/app/modules/admin/shared/models/message.model';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
})
export class ServicesComponent implements OnInit, OnChanges, OnDestroy {
  selectedUser?: User | null;
  loggedUser?: User;
  showUserDetails = false;
  username?: string;
  messages: Message[] | undefined = [];
  filteredMessages: Message[] | undefined = [];
  showList = true;
  adauga() {}

  constructor(private http: HttpClient) {}
  ngOnDestroy(): void {
    localStorage.removeItem('sendMessageTo');
  }
  ngOnChanges(changes: SimpleChanges): void {}

  users: User[] | undefined = [];

  async ngOnInit() {
    this.users = await this.http
      .get<User[]>('http://localhost:8080/user')
      .pipe(
        map((responseData) => {
          return responseData;
        })
      )
      .toPromise();
    this.getData2().subscribe((responseData) => {
      this.messages = responseData;

      this.filteredMessages = this.messages?.filter((obj) => {
        return (
          obj.idReceiver === this.loggedUser?.id ||
          obj.idSender === this.loggedUser?.id
        );
      });
    });
    if (localStorage.getItem('sendMessageTo')) {
      this.selectedUser = this.users?.find((user) => {
        return user.id?.toString() === localStorage.getItem('sendMessageTo');
      });
      this.showUserDetails = true;
    }

    let storedUser = JSON.parse(localStorage.getItem('userData')!);
    this.username = storedUser.userDetails.username;

    this.loggedUser = this.users?.find(
      (employee) => employee.username === this.username
    );
  }

  getMessage(idUser: string | undefined): Message[] {
    return this.messages!.filter(
      (obj) => obj.idReceiver === idUser || obj.idSender === idUser
    );
  }
  getData2(): Observable<Message[] | undefined> {
    return this.http
      .get<Message[] | undefined>('http://localhost:8080/message')
      .pipe(
        map((responseData) => {
          return responseData;
        })
      );
  }

  onMessageAction(refreshData: boolean) {
    this.getData2().subscribe((responseData) => {
      this.messages = responseData;

      this.filteredMessages = this.messages?.filter((obj) => {
        return (
          obj.idReceiver === this.loggedUser?.id ||
          obj.idSender === this.loggedUser?.id
        );
      });
      this.filteredMessages!.sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
    });
  }
  onSelectedUser(user: User): void {
    this.selectedUser = user;
    this.showUserDetails = true;
  }
  onExit(refreshData: boolean) {}
}
