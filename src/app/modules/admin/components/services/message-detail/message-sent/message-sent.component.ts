import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { User } from 'src/app/models/login.model';
import { Message } from 'src/app/modules/admin/shared/models/message.model';

@Component({
  selector: 'app-message-sent',
  templateUrl: './message-sent.component.html',
  styleUrls: ['./message-sent.component.css'],
})
export class MessageSentComponent implements OnInit {
  @Input() selectedUser?: User | null;
  @Input() message: Message | undefined;
  @Input() loggedUser: User | undefined;
  @Output() savedChanges = new EventEmitter<string>();
  selected: string | undefined = 'false';

  profilePic: any;
  messageDate: string | null = '';
  isHovered = false;

  email: string | undefined;
  password: string | undefined;
  picture: File | undefined;
  profileImage: SafeUrl | undefined;
  profileImageLoggedUser: SafeUrl | undefined;
  pictureMessage: SafeUrl | undefined;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.createProfileImage(this.message?.picture!);
    this.createProfileImage2(this.loggedUser?.profilePicture!);
  }
  createProfileImage(image: Blob): void {
    const objectURL = 'data:image/png;base64,' + image;
    this.pictureMessage = this.sanitizer.bypassSecurityTrustUrl(objectURL);
  }
  createProfileImage2(image: Blob): void {
    const objectURL = 'data:image/png;base64,' + image;
    this.profileImageLoggedUser =
      this.sanitizer.bypassSecurityTrustUrl(objectURL);
  }
  onSelectMessage() {
    this.selected = 'true';
  }
  onDeleteMessage() {
    this.selected = 'true';
    this.savedChanges.emit(this.message?.id)
  }
  onUnSelectMessage() {
    this.selected = 'false';
  }
}
