import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { User } from 'src/app/models/login.model';
import { MessageService } from 'src/app/shared/services/message.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css'],
})
export class DoctorsComponent implements OnInit {
  message: any;

  @Input() user: User | undefined;
  users: User[] | undefined;
  username?: string;
  loggedUser?: User;
  idLoggedUser: string | undefined;
  @ViewChild('formRef') myForm: any;
  picture: File | undefined;

  profileImage: SafeUrl | undefined;
  constructor(
    private userService: UserService,
    private sanitizer: DomSanitizer,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.createProfileImage(this.user?.profilePicture!);
    let storedUser = JSON.parse(localStorage.getItem('userData')!);
    this.idLoggedUser = storedUser.userDetails.id;
  }
  name: string | undefined;
  email = '';

  uploadFile(event: any) {
    const file = event.target.files[0];
  }
  setUser() {
    this.loggedUser = this.users?.find(
      (user) => user.username == this.userService.getUsername()
    );
  }
  createProfileImage(image: Blob): void {
    const objectURL = 'data:image/png;base64,' + image;
    this.profileImage = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    if (!image) {
      this.profileImage = './assets/user_image_placeholder.svg';
    }
  }

  openModal() {}
  onSendMessage(arg0: any) {
    this.messageService
      .addMessage({
        message: this.message!,
        idSender: this.idLoggedUser!,
        idReceiver: this.user?.id!,
        date: new Date(),
        picture: this.picture!,
      })
      .subscribe(() => {
        this.myForm.reset();
      });
  }
}
