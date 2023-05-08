import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { User } from 'src/app/models/login.model';
import { Message } from 'src/app/modules/admin/shared/models/message.model';
import { MessageService } from 'src/app/modules/admin/shared/services/message.service';

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
  @ViewChildren('messages') messages2: QueryList<any> | undefined;
  @ViewChild('content') content: ElementRef | undefined;
  profilePic: any;
  messageDate: string | null = '';
  message: string | undefined;
  email: string | undefined;
  password: string | undefined;
  picture: File | undefined;
  profileImage: SafeUrl | undefined;
  profileImageLoggedUser: SafeUrl | undefined;
  pictureMessage: SafeUrl | undefined;
  selected: string | undefined = 'false';
  show = true;
  @Output() exited = new EventEmitter<boolean>();
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
    this.scrollToBottom();
    
    this.messages!.sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
    console.log(this.messages)
    
  }
  ngOnChanges(changes: SimpleChanges) {
    this.show = true;
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
    let mesaj = this.message;
    if (!this.message) {
      mesaj = '';
    }
    this.messageService
      .addMessage({
        message: mesaj!,
        idSender: this.selectedUser?.id!,
        idReceiver: this.loggedUser?.id!,
        date: new Date(),
        picture: this.picture!,
      })
      .subscribe(() => {
        this.savedChanges.emit(true);
        this.picture = undefined;
        this.expanded = false;
        this.myForm.reset();
      });
  }
  onFileChanged(event: any) {
    const file = event.target.files[0];
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
    this.picture = undefined;
  }
  onDeleteAction(id: string) {
    this.messageService
      .deleteMessage(id)
      .subscribe(() => this.savedChanges.emit(true));
  }

  ngAfterViewInit() {
    this.scrollToBottom();
    this.messages2?.changes.subscribe(this.scrollToBottom);
  }

  scrollToBottom = () => {
    try {
      this.content!.nativeElement.scrollTop =
        this.content!.nativeElement.scrollHeight;
    } catch (err) {}
  };

  onCancel() {
    this.exited.emit(true)
    this.show = false;
  }
}
