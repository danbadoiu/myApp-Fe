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
import { MessageService } from 'src/app/modules/admin/shared/services/message.service';
import { PostService } from 'src/app/modules/admin/shared/services/post.service';
import { Poll } from '../../../shared/models/poll.model';
import { AppointmentService } from '../../../shared/services/appointment.service';
import { NotificationService } from '../../../shared/services/notification.service';
import { PollService } from '../../../shared/services/poll.service';

@Component({
  selector: 'app-post-detailed',
  templateUrl: './post-detailed.component.html',
  styleUrls: ['./post-detailed.component.css'],
})
export class PostDetailedComponent implements OnInit {
  posts: Post[] | undefined;
  @Input() post: Post | undefined;
  @Input() poll: Poll[] | undefined;
  profileImage: SafeUrl | undefined;
  loggedUser: User | undefined;
  @ViewChild('formRef') myForm: any;
  isHovered = false;
  answer: string | undefined;
  medicinesBox: Post[] = [];
  searchTerm = '';
  filteredPosts: Post[] | undefined = [];
  message: string | undefined;
  idLoggedUser: string | undefined;
  selectedPostUserId: string | undefined;
  users: User[] | undefined = [];
  picture: File | undefined;
  idUser: string | undefined;
  loggedUserRole: string | undefined;
  date: Date | undefined;
  @Output() savedChanges = new EventEmitter<boolean>();
  results: string[] = [];
  answers: string[] = [];
  isExpanded = false;

  constructor(
    private sanitizer: DomSanitizer,
    private messageService: MessageService,
    private postService: PostService,
    private appointmentService: AppointmentService,
    private pollService: PollService,
    private notification: NotificationService
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
    this.idUser = this.post?.idUser;
    this.poll?.forEach((poll) => {
      if (poll.idPost.toString() === this.post?.id?.toString())
        this.results = this.getResult(poll).split(',').map(String);
      if (this.results.length > 0 && this.loggedUserRole === 'PATIENT') {
        this.notification.show('You received a result of your problem!');
      }
    });
  }

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
    this.postService
      .deletePost(id)
      .subscribe(() => this.savedChanges.emit(true));
  }
  onCloseModal() {}

  onSolicitaProgramare(idUser: string) {
    this.appointmentService
      .addAppointment({
        idUser: idUser,
        idDoctor: this.idLoggedUser!,
        idMarker: '',
        date: this.date!,
        status: 'PENDING',
      })
      .subscribe();
  }

  onSendPoll(idPost: string) {
    let idPoll = null;
    let answer = '';
    this.poll?.forEach((poll) => {
      if (poll.idPost.toString() === idPost.toString()) {
        idPoll = poll.id;
        answer = poll.answer;
      }
    });

    if (idPoll) {
      this.pollService
        .updatePoll(idPoll, {
          idPost: idPost,
          answer: answer + ',' + this.answer,
        })
        .subscribe(() => this.savedChanges.emit(true));
    } else {
      this.pollService
        .addPoll({
          idPost: idPost,
          answer: this.answer!,
        })
        .subscribe(() => {});
    }
  }

  getResult(poll: Poll): string {
    let answers = poll.answer.split(',').map(String);
    this.answers = answers;

    // Convert the sentences into an array of words
    const words = answers.join(' ').toLowerCase().split(' ');

    // Create an object to store the frequency of each word
    const frequency: Record<string, number> = {};

    // Loop through the words array and update the frequency object
    words.forEach((word) => {
      if (word in frequency) {
        frequency[word]++;
      } else {
        frequency[word] = 1;
      }
    });

    // Convert the frequency object into an array of [word, frequency] pairs
    const wordFrequency = Object.entries(frequency);

    // Sort the wordFrequency array by frequency in descending order
    wordFrequency.sort((a, b) => b[1] - a[1]);

    const mostFrequentFrequency = wordFrequency[0][1];

    // Get an array of all the words with the most frequent frequency
    const mostFrequentWords = wordFrequency
      .filter(([word, frequency]) => frequency === mostFrequentFrequency)
      .map(([word, frequency]) => word);

    // Display the most frequent words
    if (mostFrequentWords.length > 0) {
      return mostFrequentWords.join(',');
    } else {
      return '';
    }
  }
  toggleExpanded() {
    this.isExpanded = !this.isExpanded;
  }
}
