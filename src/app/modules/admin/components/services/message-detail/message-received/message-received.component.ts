import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { User } from 'src/app/models/login.model';
import { Message } from 'src/app/shared/models/message.model';

@Component({
  selector: 'app-message-received',
  templateUrl: './message-received.component.html',
  styleUrls: ['./message-received.component.css']
})
export class MessageReceivedComponent implements OnInit {

  @Input() selectedUser?: User | null;
  @Input() message: Message | undefined;
  @Input() loggedUser: User | undefined;

  profilePic: any;
  messageDate: string | null = '';

  email: string | undefined;
  password: string | undefined;
  picture: File | undefined;
  profileImage: SafeUrl | undefined;
  profileImageLoggedUser: SafeUrl | undefined;
  pictureMessage: SafeUrl | undefined;
  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.createProfileImage(this.selectedUser?.profilePicture!)
    this.createProfileImage2(this.message?.picture!)
  }
  createProfileImage(image: Blob): void {
    const objectURL = 'data:image/png;base64,' + image;
    this.profileImage = this.sanitizer.bypassSecurityTrustUrl(objectURL);
  }
  createProfileImage2(image: Blob): void {
    const objectURL = 'data:image/png;base64,' + image;
    this.pictureMessage =
      this.sanitizer.bypassSecurityTrustUrl(objectURL);
  }

}
