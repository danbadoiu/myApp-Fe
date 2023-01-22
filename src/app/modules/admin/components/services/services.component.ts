import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/shared/services/message.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  messages2:any;

  constructor(private message: MessageService, private http: HttpClient) { }

  ngOnInit() {
    this.message.getMessages().subscribe((data) => {
      this.messages2 = data;

  });
  this.getData();
  console.log(this.messages2)

  
  }
  async getData() {
    const data = await this.http.get(`${environment.apiUrl}/core/api/v1/messages`).toPromise();
    this.messages2= data;
    
  }

  messages:string[] = [];
  newMessage = '';

  sendMessage() {
    this.messages.push(this.newMessage);
    this.newMessage = '';
  }
}
