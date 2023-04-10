import { HttpClient } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { map } from 'rxjs';
import { User } from 'src/app/models/login.model';
import { Post } from 'src/app/models/posts.model';
import { Appointment } from 'src/app/shared/models/appointment.model';
import { AppointmentService } from 'src/app/shared/services/appointment.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { PostService } from 'src/app/shared/services/post.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-appointment-detail',
  templateUrl: './appointment-detail.component.html',
  styleUrls: ['./appointment-detail.component.css'],
})
export class AppointmentDetailComponent implements OnInit {
  @Input() appointment: Appointment | undefined;
  profileImage: SafeUrl | undefined;
  loggedUser: User | undefined;
  @ViewChild('formRef') myForm: any;

  medicinesBox: Post[] = [];
  searchTerm = '';
  // filteredPosts: Post[] | undefined = [];
  message: string | undefined;
  idLoggedUser: string | undefined;
  selectedPostUserId: string | undefined;
  users: User[] | undefined = [];
  picture: File | undefined;
  idUser: string | undefined;
  loggedUserRole: string | undefined;
  @Output() savedChanges = new EventEmitter<boolean>();
  doctor: User | undefined;

  constructor(
    private sanitizer: DomSanitizer,
    private messageService: MessageService,
    private postService: PostService,
    private appointmentService: AppointmentService,
    private userService: UserService,
    private http: HttpClient
  ) {}
  createProfileImage(image: Blob): void {
    const objectURL = 'data:image/png;base64,' + image;
    this.profileImage = this.sanitizer.bypassSecurityTrustUrl(objectURL);
  }

  async ngOnInit() {
    this.users = await this.http
      .get<User[]>('http://localhost:8080/user')
      .pipe(
        map((responseData) => {
          return responseData;
        })
      )
      .toPromise();
      this.idUser = this.appointment?.idUser;
      this.doctor = this.users?.find(
        (user) => user.id === this.appointment?.idDoctor
      );
  
      // this.createProfileImage(this.post?.image!);
      let storedUser = JSON.parse(localStorage.getItem('userData')!);
      this.idLoggedUser = storedUser.userDetails.id;
      this.loggedUserRole = storedUser.userDetails.role;
    this.loggedUser=this.users?.find(
      (user) => user.id === this.appointment?.idUser
    );}
  

  onSendMessage(id: string) {
    this.selectedPostUserId = id;

    this.messageService
      .addMessage({
        message: this.message!,
        idSender: this.selectedPostUserId!,
        idReceiver: this.idLoggedUser!,
        date: new Date(),
        picture: this.picture!,
      })
      .subscribe(() => {
        this.myForm.reset();
      });
  }
  sendMessage(idUser: string) {
    console.log(this.idUser);
    this.messageService
      .addMessage({
        message: this.message!,
        idSender: this.selectedPostUserId!,
        idReceiver: this.idLoggedUser!,
        date: new Date(),
        picture: this.picture!,
      })
      .subscribe(() => {
        this.myForm.reset();
      });
  }

  onDelete(id: string) {
    this.appointmentService
      .deleteAppointment(id)
      .subscribe(() => this.savedChanges.emit(true));
  }
}
