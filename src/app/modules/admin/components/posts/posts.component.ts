import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { map } from 'rxjs';
import { User } from 'src/app/models/login.model';
import { Post } from 'src/app/models/posts.model';
import { MessageService } from 'src/app/shared/services/message.service';
import { PostService } from 'src/app/shared/services/post.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
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

  search() {
    // if (this.searchTerm === '') {
    this.filteredPosts = this.posts!;
    // } else {
    //   this.filteredMedicines = this.medicines!.filter((medicine) =>
    //     medicine.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    //   );
    // }
  }
  constructor(
    private postService: PostService,
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  async ngOnInit() {
    this.posts = await this.http
      .get<{ items: Post[] }>(`${environment.apiUrl}/core/api/v1/posts`)
      .pipe(
        map((responseData) => {
          return responseData.items;
        })
      )
      .toPromise();
    let storedUser = JSON.parse(localStorage.getItem('userData')!);
    this.idLoggedUser = storedUser.userDetails.userId;
    // this.users = await 
    this.http
      // .get<{ items: User[] }>(`${environment.apiUrl}/core/api/v1/users`)
      .get<User[]>('http://localhost:8080/user')
      .pipe(
        map((responseData) => {
          console.log(responseData);
          return responseData;
        })
      )
      .toPromise();
      this.loggedUser = this.users?.find(
        (employee) => employee.id === this.idLoggedUser
      );
      console.log(this.users)
  
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
        picture: this.picture!
      })
      .subscribe(() => {
        this.myForm.reset();
      });
  }
}
