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
import { Message } from 'src/app/shared/models/message.model';
import { MessageService } from 'src/app/shared/services/message.service';

@Component({
  selector: 'app-message-detail',
  templateUrl: './message-detail.component.html',
  styleUrls: ['./message-detail.component.css'],
})
export class MessageDetailComponent implements OnInit {
  @Input() selectedUser?: User | null;
  @Input() messages: Message[] | undefined;
  @Input() loggedUser: User | undefined;
  @Output() savedChanges = new EventEmitter<boolean>();
  @ViewChild('formRef') myForm: any;
  profilePic: any;
  messageDate: string | null = '';
  message: string | undefined;
  email: string | undefined;
  password: string | undefined;
  picture: File | undefined;
  profileImage: SafeUrl | undefined;
  profileImageLoggedUser: SafeUrl | undefined;
  pictureMessage: SafeUrl | undefined;
  constructor(
    private messageService: MessageService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.createProfileImage(this.selectedUser?.profilePicture!);
    this.createProfileImage2(this.loggedUser?.profilePicture!);
    this.messages!.forEach((arrayItem) => {
      this.createProfileImageMessage(arrayItem.picture);
    });
  }
  createProfileImage(image: Blob): void {
    const objectURL = 'data:image/png;base64,' + image;
    this.profileImage = this.sanitizer.bypassSecurityTrustUrl(objectURL);
  }
  createProfileImageMessage(image: Blob): void {
    const objectURL = 'data:image/png;base64,' + image;
    this.pictureMessage = this.sanitizer.bypassSecurityTrustUrl(objectURL);
  }
  createProfileImage2(image: Blob): void {
    const objectURL = 'data:image/png;base64,' + image;
    this.profileImageLoggedUser =
      this.sanitizer.bypassSecurityTrustUrl(objectURL);
  }
  sendMessage() {
    this.messageService
      .addMessage({
        message: this.message!,
        idSender: this.selectedUser?.id!,
        idReceiver: this.loggedUser?.id!,
        date: new Date(),
        picture: this.picture!,
      })
      .subscribe(() => {
        // formRef.reset();
        console.log(this.message + 'message sent');
        this.savedChanges.emit(true);
        this.myForm.reset();
      });
  }
  onFileChanged(event: any) {
    const file = event.target.files[0];
    //  this.profilePicture = file.name
    this.picture = file;
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (reader.result != null) {
        this.profilePic = reader.result;
      }
    };
  }
  expanded = false;

  toggleExpand() {
    this.expanded = !this.expanded;
  }
}
