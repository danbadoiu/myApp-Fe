import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/models/login.model';
import { PostService } from 'src/app/shared/services/post.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
onCancel() {
this.myForm.reset();
}
  selectedUser?: User | null;
  usersObservable?: Observable<User[]>;
  filterUsersForm?: FormGroup;
  users: User[] = [];
  showUserDetails = false;
  private userSubscription = new Subscription();
  searchTerm = '';
  filteredUsers: User[] = [];
  message: string | undefined;
  image: any;
  loggedUserId: string | undefined;
  @ViewChild('formRef') myForm: any;
  domain: string | undefined = '';
  domains: string[] | undefined = ['Dermatologie', 'Ortopedie'];

  search() {
    if (this.searchTerm === '') {
      this.filteredUsers = this.users;
    } else {
      this.filteredUsers = this.users.filter(
        (user) =>
          user.firstName
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase()) ||
          user.lastName.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  constructor(
    private userService: UserService,
    private postService: PostService
  ) {}

  ngOnInit() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }

    this.userSubscription = this.userService.getUsers().subscribe((data) => {
      this.users = data;
      this.filteredUsers = data;
    });
    console.log(this.users);
    let storedUser = JSON.parse(localStorage.getItem('userData')!);
    this.loggedUserId = storedUser.userDetails.userId;
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
  createPost() {
    this.postService
      .addPost({
        id: '',
        message: this.message!,
        idUser: this.loggedUserId!,
        image: this.image,
        domain: this.domain!,
        date: new Date(),
      })
      .subscribe();
  }
  onFileChanged(event: any) {
    this.image = '';
    const file = event.target.files[0];

    this.image = file;
    let reader = new FileReader();
    reader.readAsDataURL(this.image!);
    reader.onload = () => {
      if (reader.result != null) {
        this.image = reader.result;
      }
    };
  }
}
