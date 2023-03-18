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
  constructor(private messageService: MessageService,private sanitizer: DomSanitizer) {}

  ngOnInit() {
    console.log(this.messages)
    console.log(typeof this.messages)
  }
  createProfileImage(image: Blob): void {
    const objectURL = 'data:image/png;base64,' + image;
    this.profileImage = this.sanitizer.bypassSecurityTrustUrl(objectURL);
  }
  sendMessage() {
    this.messageService
      .addMessage({
        message: this.message!,
        idReceiver: this.selectedUser?.id!,
        idSender: this.loggedUser?.id!,
        date: new Date(),
        picture: this.picture!,
      })
      .subscribe(() => {
        // formRef.reset();
        console.log(this.message+"sfsfsfsfsdfd")
        this.savedChanges.emit(true);
        this.myForm.reset();
      });
  }
  onFileChanged(event: any) {
    const file = event.target.files[0];
    console.log(file);
    //  this.profilePicture = file.name
    this.picture = file;
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (reader.result != null) {
        this.profilePic = reader.result;
      }
    };
    console.log(event.target.files[0]);
  }
  expanded = false;

  toggleExpand() {
    this.expanded = !this.expanded;
  }
}
