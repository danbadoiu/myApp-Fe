import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/login/models/login.model';

@Component({
  selector: 'app-message-detail',
  templateUrl: './message-detail.component.html',
  styleUrls: ['./message-detail.component.css']
})
export class MessageDetailComponent implements OnInit {
  @Input() selectedEmployee?: User | null;
  constructor() { }

  ngOnInit() {
  }

}
