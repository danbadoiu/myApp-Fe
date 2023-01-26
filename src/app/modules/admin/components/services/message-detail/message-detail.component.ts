import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/login/models/login.model';
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
  @Output() savedChanges = new EventEmitter<boolean>();
  messageDate: string | null = '';
  message: string | undefined;
  email: string|undefined;
  password: string|undefined;
  constructor(private messageService: MessageService) {}

  ngOnInit() {}
  sendMessage() {

    this.messageService
      .addMessage({id:'',
        message: this.message,
        idReceiver:this.selectedUser?.id,
        idSender: this.selectedUser?.id,
        date: new Date()
      })
      .subscribe(() => {
        // formRef.reset();
        this.savedChanges.emit(true);
      });
  }
}
