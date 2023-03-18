import { HttpClient } from '@angular/common/http';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DH_UNABLE_TO_CHECK_GENERATOR } from 'constants';
import { map, Observable } from 'rxjs';
import { User } from 'src/app/models/login.model';
import { Message } from 'src/app/shared/models/message.model';
import { MessageService } from 'src/app/shared/services/message.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
})
export class ServicesComponent implements OnInit, OnChanges{
  selectedUser?: User | null;
  loggedUser?: User;
  showUserDetails = false;
  username?: string;
  adauga() {
    console.log(this.users);
  }

  constructor(private message: MessageService, private http: HttpClient) {}
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.messages+"sfsdfdfdsffsfdsfds")
  }

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
    this.getData2().subscribe((responseData)=>{console.log(responseData)
    console.log( responseData?.length)
  this.messages = responseData});
    
    
    let storedUser = JSON.parse(localStorage.getItem('userData')!);
    this.username = storedUser.userDetails.username;

    this.loggedUser = this.users?.find(
      (employee) => employee.username === this.username
    );
  }

   getData2():Observable<Message[]|undefined> {
    // this.messages = await this.http
    //   .get<{ items: Message[] }>(`${environment.apiUrl}/core/api/v1/messages`)
    //   .pipe(
    //     map((responseData) => {
    //       return responseData.items;
    //     })
    //   )
    //   .toPromise();
      // this.messages = 
      return this.http
      .get<Message[]|undefined>('http://localhost:8080/message')
      .pipe(
        map((responseData) => {
          return responseData;
        })
      )

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
