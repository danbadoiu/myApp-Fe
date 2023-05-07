import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { map } from 'rxjs';
import { User } from 'src/app/models/login.model';
import { Post } from 'src/app/models/posts.model';
import { MessageService } from 'src/app/modules/admin/shared/services/message.service';
import { PostService } from 'src/app/modules/admin/shared/services/post.service';
import { Poll } from '../../shared/models/poll.model';
import { PollService } from '../../shared/services/poll.service';

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
  profileImage: SafeUrl | undefined;
  loggedUserRole: string | undefined;
  keys: string[] | undefined = [];
  values: string[] = [];
  poll: Poll[] | undefined = [];

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
    private messageService: MessageService,
    private sanitizer: DomSanitizer,
    private cdRef: ChangeDetectorRef,
    private pollService: PollService
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
    this.http
      .get<User[]>('http://localhost:8080/user')
      .pipe(
        map((responseData) => {
          this.loggedUser = responseData.find(
            (employee) => employee.id === this.idLoggedUser
          );
          return responseData;
        })
      )
      .toPromise();
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
      .get<Post[]>('http://localhost:8080/post')
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
      .get<Poll[]>('http://localhost:8080/poll')
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
  // onPollAction(refreshData: { [key: string]: number }) {
  //   Object.values(refreshData).forEach((value) => {
  //     this.values?.push(value.toString());
  //   });
  //   console.log(this.values)
  //   this.pollService.updatePoll('1', {
  //     question: 'sd',
  //     keys: 'sdd',
  //     options: this.values.toString(),
  //   }).subscribe();
  // }
}
