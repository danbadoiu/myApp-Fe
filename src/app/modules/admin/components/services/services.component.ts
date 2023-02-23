import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { User } from 'src/app/models/login.model';
import { Message } from 'src/app/shared/models/message.model';
import { MessageService } from 'src/app/shared/services/message.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
})
export class ServicesComponent implements OnInit {
  selectedUser?: User | null;
  loggedUser?: User;
  showUserDetails = false;
  username?: string;
  adauga() {
    console.log(this.users);
  }

  constructor(private message: MessageService, private http: HttpClient) {}

  users: User[] | undefined = [];

  async ngOnInit() {
    this.users = await this.http
      .get<{ items: User[] }>(`${environment.apiUrl}/core/api/v1/users`)
      .pipe(
        map((responseData) => {
          return responseData.items;
        })
      )
      .toPromise();
    this.getData2();
    let storedUser = JSON.parse(localStorage.getItem("userData")!);
    this.username = storedUser.userDetails.username;
    
    this.loggedUser = this.users?.find(
      (employee) => employee.username === this.username
    );

    console.log(this.loggedUser)
  }

  async getData2() {
    this.messages = await this.http
      .get<{ items: Message[] }>(`${environment.apiUrl}/core/api/v1/messages`)
      .pipe(
        map((responseData) => {
          return responseData.items;
        })
      )
      .toPromise();
      // console.log(this.messages)
  }

  messages: Message[] | undefined = [];
  onMessageAction(refreshData: boolean) {
    this.getData2();
  }
  onSelectedUser(user: User): void {
    this.selectedUser = user;
    this.showUserDetails = true;
  }
}
