import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/login/models/login.model';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users: User[] = [];
  private userSubscription = new Subscription();

  constructor(private userService: UserService) { }

  ngOnInit() {
    if(this.userSubscription){
      this.userSubscription.unsubscribe()
    }
   
    this.userSubscription = this.userService.getUsers().subscribe((data)=>{this.users = data
    console.log(this.users)});
    console.log(this.users)
  }

}
