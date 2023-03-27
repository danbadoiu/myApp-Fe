import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { User } from 'src/app/models/login.model';
import { Post } from 'src/app/models/posts.model';
import { MessageService } from 'src/app/shared/services/message.service';
import { PostService } from 'src/app/shared/services/post.service';

@Component({
  selector: 'app-post-detailed',
  templateUrl: './post-detailed.component.html',
  styleUrls: ['./post-detailed.component.css'],
})
export class PostDetailedComponent implements OnInit {
  posts: Post[] | undefined;
  @Input() post: Post | undefined;
  profileImage: SafeUrl | undefined;
  loggedUser: User | undefined;
  @ViewChild('formRef') myForm: any;

  medicinesBox: Post[] = [];
  searchTerm = '';
  filteredPosts: Post[] | undefined = [];
  message: string | undefined;
  idLoggedUser: string | undefined;
  selectedPostUserId: string | undefined;
  users: User[] | undefined = [];
  picture: File | undefined;
  loggedUserRole: string | undefined;
  @Output() savedChanges = new EventEmitter<boolean>();

  constructor(
    private sanitizer: DomSanitizer,
    private messageService: MessageService,
    private postService: PostService
  ) {}
  createProfileImage(image: Blob): void {
    const objectURL = 'data:image/png;base64,' + image;
    this.profileImage = this.sanitizer.bypassSecurityTrustUrl(objectURL);
  }

  ngOnInit() {
    this.createProfileImage(this.post?.image!);
    let storedUser = JSON.parse(localStorage.getItem('userData')!);
    this.idLoggedUser = storedUser.userDetails.id;
    this.loggedUserRole = storedUser.userDetails.role;
  }
  onSendMessage(idUser: string) {
    this.selectedPostUserId = idUser;
  }
  sendMessage(id: string) {
  
    this.messageService
    .addMessage({
      message: this.message!,
      idSender: this.post?.idUser!,
      idReceiver: this.idLoggedUser!,
      date: new Date(),
      picture: this.picture!,})
      .subscribe(() => {
        
        this.myForm.reset();
      });
  }

  onDelete(id: string) {
    this.postService
      .deletePost(id)
      .subscribe(() => this.savedChanges.emit(true));
  }
}
