import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  content?: string;
  loggedUser: string = '';



  constructor(private user: UserService) { }

  ngOnInit(): void {
    this.loggedUser = this.user.getUsername();
   
  }
}
