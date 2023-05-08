import { HttpClient } from '@angular/common/http';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from 'src/app/models/login.model';
import { Message } from 'src/app/modules/admin/shared/models/message.model';
import { MessageService } from 'src/app/modules/admin/shared/services/message.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
})
export class ServicesComponent implements OnInit, OnChanges {
  selectedUser?: User | null;
  loggedUser?: User;
  showUserDetails = false;
  username?: string;
  messages: Message[] | undefined = [];
  filteredMessages: Message[] | undefined = [];
  showList = true
  adauga() {}

  constructor(private message: MessageService, private http: HttpClient) {}
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
      console.log(this.filteredMessages)
    });
    

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
  onExit(refreshData: boolean) {
    // if(refreshData){
    //   this.selectedUser=null
    //   this.showUserDetails = false;
    // }
  }
}
