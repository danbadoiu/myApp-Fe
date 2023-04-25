import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/models/login.model';
import { PostService } from 'src/app/shared/services/post.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  onCancel() {
    this.myForm.reset();
    
  }
  user?: User | undefined;
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
  imagePosted: File | undefined;
  loggedUserId: string | undefined;
  @ViewChild('formRef') myForm: any;
  domain: string | undefined = '';
  domains: string[] | undefined = ['DERMATOLOGIE', 'GINECOLOGIE','PEDIATRIE','GERIATRIE','UROLOGIE','CHIRURGIE','FIZIOLOGIE','CARDIOLOGIE','BOLI INFECTIOASE','ALERGOLOGIE'];

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
    private postService: PostService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }

    this.userSubscription = this.userService.getUsers().subscribe((data) => {
      this.users = data;
      this.filteredUsers = data;
    });

    let storedUser = JSON.parse(localStorage.getItem('userData')!);
    this.loggedUserId = storedUser.userDetails.id;
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
  }
  createPost() {
    this.postService
      .addPost({
        message: this.message!,
        idUser: this.loggedUserId!,
        image: this.imagePosted!,
        domain: this.domain!,
        date: new Date(),
      })
      .subscribe(this.myForm.reset());
  }
  onFileChanged(event: any) {
    this.image = '';
    const file = event.target.files[0];

    this.image = file;
    this.imagePosted = file;
    let reader = new FileReader();
    reader.readAsDataURL(this.image!);
    reader.onload = () => {
      if (reader.result != null) {
        this.image = reader.result;
      }
    };
  }
  onSearchDoctors() {
    this.router.navigate(['admin/doctors']);
  }
}
