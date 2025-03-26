import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { map } from 'rxjs';
import { User } from 'src/app/models/login.model';
import { Post } from 'src/app/models/posts.model';
import { environment } from 'src/environments/environment';
import { Poll } from '../../shared/models/poll.model';
import { MessageService } from '../../shared/services/message.service';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-patients-info',
  templateUrl: './patients-info.component.html',
  styleUrls: ['./patients-info.component.css']
})
export class PatientsInfoComponent implements OnInit {
  loggedUser: User | undefined;
  @ViewChild('formRef') myForm: any;
  posts: Post[] | undefined;
  medicinesBox: Post[] = [];
  searchTerm = '';
  filteredPosts: Post[] | undefined = [];
  message: string | undefined;
  idLoggedUser: string | undefined;
  selectedPostUserId: string | undefined;
  users: User[] | undefined = [];
  picture: File | undefined;
  profileImage: SafeUrl | undefined;
  loggedUserRole: string | undefined;
  keys: string[] | undefined = [];
  values: string[] = [];
  poll: Poll[] | undefined = [];

  search() {
    this.filteredPosts = this.posts!;
  }
  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private sanitizer: DomSanitizer,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.getData();
  }
  createProfileImage(image: Blob): void {
    const objectURL = 'data:image/png;base64,' + image;
    this.profileImage = this.sanitizer.bypassSecurityTrustUrl(objectURL);
  }
  onSendMessage(idUser: string) {
    this.selectedPostUserId = idUser;
  }
  sendMessage(id: string) {
    this.messageService
      .addMessage({
        id: '',
        message: this.message!,
        idReceiver: this.selectedPostUserId!,
        idSender: this.idLoggedUser!,
        date: new Date(),
        picture: this.picture!,
      })
      .subscribe(() => {
        this.myForm.reset();
      });
  }
  getData() {
    let storedUser = JSON.parse(localStorage.getItem('userData')!);
    this.idLoggedUser = storedUser.userDetails.id;
    this.loggedUserRole = storedUser.userDetails.role;
  this.userService.getUsers().subscribe((data) => {
      this.users = data.filter(user => user.role === 'PATIENT');;

    });
    
    this.filteredPosts = this.posts?.filter((obj) => {
      return (
        obj.idUser === this.idLoggedUser ||
        obj.domain === this.loggedUser?.domain
      );
    });
    if (this.loggedUserRole !== 'DOCTOR') {
      this.posts = this.filteredPosts;
    }

    this.http
      .get<Post[]>(`${environment.apiUrl}/post`)
      .pipe(
        map((responseData) => {
          this.posts = responseData;
        })
      )
      .toPromise();
    if (this.posts) {
      this.posts!.forEach((arrayItem) => {
        this.createProfileImage(arrayItem.image);
      });
    }
    this.http
      .get<Poll[]>(`${environment.apiUrl}/poll`)
      .pipe(
        map((responseData) => {
          this.poll = responseData;
        })
      )
      .toPromise();
  }
  onPostAction(refreshData: boolean) {
    this.getData();
  }

}
