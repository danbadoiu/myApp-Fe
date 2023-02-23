import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/models/login.model';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  selectedUser?: User | null;
  usersObservable?: Observable<User[]>;
  filterUsersForm?: FormGroup;
  users: User[] = [];
  showUserDetails = false;
  private userSubscription = new Subscription();
  searchTerm = '';
  filteredUsers: User[] = [];

  search() {
    if (this.searchTerm === '') {
      this.filteredUsers = this.users;
    } else {
      this.filteredUsers = this.users.filter((user) =>
        user.firstName.toLowerCase().includes(this.searchTerm.toLowerCase()) || user.lastName.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  constructor(private userService: UserService) {}

  ngOnInit() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }

    this.userSubscription = this.userService.getUsers().subscribe((data) => {
      this.users = data;
      this.filteredUsers = data;
    });
    console.log(this.users);
  }
  onSelectedUser(user: User): void {
    this.selectedUser = user;
    this.showUserDetails = true;
  }
  onUserDetailAction(refreshData: boolean): void {
    this.showUserDetails = false;
    if (refreshData) {
      this.loadUsersObservable();
    }
  }
  private loadUsersObservable(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }

    this.userSubscription = this.userService.getUsers().subscribe((data) => {
      this.users = data;
    });
    console.log(this.users);
  }
}
