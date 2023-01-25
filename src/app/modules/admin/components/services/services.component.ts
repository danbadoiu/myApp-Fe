import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { User } from 'src/app/login/models/login.model';
import { MessageService } from 'src/app/shared/services/message.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
})
export class ServicesComponent implements OnInit {
onSelectedEmployee(user: User):void {
  this.selectedEmployee = user;
  this.showEmployeeDetails = true;
}

selectedEmployee?: User | null;
showEmployeeDetails = false;
  adauga() {this.getData();
  console.log(this.data)}
  messages2: any;

  constructor(private message: MessageService, private http: HttpClient) {}

  data: User[] | undefined=[];
 
  async ngOnInit() {
    this.data = await this.http
      .get<{ items: User[] }>(`${environment.apiUrl}/core/api/v1/users`)
      .pipe(
        map((responseData) => {
          // console.log(responseData.items)
          return responseData.items;
        })
      )
      .toPromise();

  }

  data2: any;

  getData() {
    this.http
      .get(`${environment.apiUrl}/core/api/v1/messages`)
      .subscribe((data) => {
        this.data2 = data;
      });
  }

  messages: string[] = [];
  newMessage = '';

  sendMessage() {
    this.messages.push(this.newMessage);
    this.newMessage = '';
  }
}
