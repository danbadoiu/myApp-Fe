import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  messages:string[] = [];
  newMessage = '';

  sendMessage() {
    this.messages.push(this.newMessage);
    this.newMessage = '';
  }
}
