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
import { Router } from '@angular/router';
import { jsPDF } from 'jspdf';
import { map } from 'rxjs/operators';
import { User } from 'src/app/models/login.model';
import { Post } from 'src/app/models/posts.model';
import { environment } from 'src/environments/environment.prod';
import { Appointment } from '../../../shared/models/appointment.model';
import { Marker } from '../../../shared/models/marker.model';
import { Poll } from '../../../shared/models/poll.model';
import { AppointmentService } from '../../../shared/services/appointment.service';
import { MarkerService } from '../../../shared/services/marker.service';
import { NotificationService } from '../../../shared/services/notification.service';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-patients-info-detailed',
  templateUrl: './patients-info-detailed.component.html',
  styleUrls: ['./patients-info-detailed.component.css'],
})
export class PatientsInfoDetailedComponent implements OnInit {
  displayedColumns: string[] = ['position', 'domain', 'message', 'date'];
  dataSource: Post[] = [];
  dataSourceAppointments: Appointment[] = [];
  posts: Post[] | undefined;
  @Input() user: User | undefined;
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
  appointments: Appointment[] | undefined;
  doctors: User[] = [];
  markers: Marker[] = [];
  firstName: string | undefined;
  lastName: string | undefined;

  constructor(
    private sanitizer: DomSanitizer,
    private appointmentService: AppointmentService,
    private notification: NotificationService,
    private userService: UserService,
    private markerService: MarkerService,
    private http: HttpClient,
    private route: Router
  ) {}

  createProfileImage(image: Blob): void {
    const objectURL = 'data:image/png;base64,' + image;
    this.profileImage = this.sanitizer.bypassSecurityTrustUrl(objectURL);
  }

  ngOnInit() {
    this.createProfileImage(this.user?.profilePicture!);

    let storedUser = JSON.parse(localStorage.getItem('userData')!);
    this.idLoggedUser = storedUser.userDetails.id;
    this.loggedUserRole = storedUser.userDetails.role;
    this.idUser = this.user?.id;
    this.firstName = this.user?.firstName;
    this.lastName = this.user?.lastName;
    this.userService.getUsers().subscribe((data) => {
      this.doctors = data.filter((user) => user.role === 'DOCTOR');
    });
    this.markerService.getUsers().subscribe((data) => {
      this.markers = data;
    });
    this.poll?.forEach((poll) => {
      if (poll.idPost.toString() === this.user?.id?.toString()) {
        this.results = this.getResult(poll).split(',').map(String);
      }
      if (this.results.length > 0 && this.loggedUserRole === 'PATIENT') {
        this.notification.show('You received a result of your problem!');
      }
    });

    this.http
      .get<Post[]>(`${environment.apiUrl}/post`)
      .pipe(
        map((responseData) => {
          this.posts = responseData.filter(
            (post) => post.idUser === this.user?.id
          );

          this.dataSource = this.posts.map((post, index) => ({
            position: index + 1,
            domain: post.domain,
            message: post.message,
            image: post.image,
            date: post.date,
            idUser: post.idUser,
          }));
        })
      )
      .toPromise();
    this.appointmentService.getAppointments().subscribe((responseData) => {
      this.appointments = responseData;
      this.appointments = this.appointments.filter((appointment) => {
        return appointment.idUser.toString() === this.user?.id?.toString();
      });
      this.dataSourceAppointments = this.appointments.map((post, index) => ({
        position: index + 1,
        date: post.date,
        idDoctor: post.idDoctor,
        idMarker: post.idMarker,
        status: post.status,
        idUser: post.idUser,
      }));
      this.appointments.forEach((appointment) => {
        if (appointment.date < new Date()) {
          this.appointmentService.deleteAppointment(appointment.id!);
        }

        if (appointment.idMarker === null) {
          this.notification.show(
            'You received an appointment from ' + appointment.idDoctor
          );
        }
      });
    });
  }

  generatePDF(): void {
    const doc = new jsPDF();
    doc.setFont('Helvetica');
    doc.setFontSize(12);

    const pageHeight = doc.internal.pageSize.height;
    const margin = 20;
    let yPosition = margin;
    let maxYPosition = yPosition;

    const leftColumnX = 10;
    const rightColumnX = 110;

    doc.setFontSize(16);
    doc.setTextColor(40, 40, 255);
    doc.text('Patient Details:', leftColumnX, yPosition);
    yPosition += 10;

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);

    doc.setFont('Helvetica', 'bold');
    doc.text('Name:', leftColumnX, yPosition);
    doc.setFont('Helvetica', 'normal');
    doc.text(
      this.user?.firstName + ' ' + this.user?.lastName || 'John Doe',
      40,
      yPosition
    );
    yPosition += 10;

    doc.setFont('Helvetica', 'bold');
    doc.text('Email:', leftColumnX, yPosition);
    doc.setFont('Helvetica', 'normal');
    doc.text(this.user?.email || 'john.doe@example.com', 40, yPosition);
    yPosition += 10;

    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.5);
    doc.line(10, yPosition, 200, yPosition);
    yPosition += 10;

    doc.setFontSize(14);
    doc.setTextColor(0, 102, 204);
    doc.text('Posts:', leftColumnX, yPosition);
    doc.text('Appointments:', rightColumnX, yPosition);
    yPosition += 10;

    let postsY = yPosition;
    let appointmentsY = yPosition;

    if (this.posts && this.posts.length > 0) {
      this.posts.forEach((post, index) => {
        if (postsY > pageHeight - 40 || appointmentsY > pageHeight - 40) {
          doc.addPage();
          postsY = margin;
          appointmentsY = margin;
        }

        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.setFont('Helvetica', 'bold');
        doc.text(`Post ${index + 1}:`, leftColumnX, postsY);
        doc.setFont('Helvetica', 'normal');
        doc.text(`Domain: ${post.domain}`, leftColumnX, postsY + 10);
        doc.text(`Message:`, leftColumnX, postsY + 20);
        doc.setFont('Helvetica', 'italic');
        doc.text(post.message, leftColumnX, postsY + 30, { maxWidth: 80 });
        doc.setFont('Helvetica', 'normal');
        doc.setFontSize(10);
        doc.text(
          `Date: ${new Date(post.date).toLocaleDateString()}`,
          leftColumnX,
          postsY + 40
        );

        postsY += 50;
        maxYPosition = Math.max(postsY, appointmentsY);
      });
    } else {
      doc.setFontSize(12);
      doc.text('No posts available.', leftColumnX, postsY);
      postsY += 10;
    }

    if (this.appointments && this.appointments.length > 0) {
      this.appointments.forEach((appointment, index) => {
        if (postsY > pageHeight - 40 || appointmentsY > pageHeight - 40) {
          doc.addPage();
          postsY = margin;
          appointmentsY = margin;
        }

        const doctorName = this.getDoctorName(appointment.idDoctor);
        const hospitalName = this.getMarkerName(appointment.idMarker);

        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.setFont('Helvetica', 'bold');
        doc.text(`Appointment ${index + 1}:`, rightColumnX, appointmentsY);
        doc.setFont('Helvetica', 'normal');
        doc.text(`Doctor: ${doctorName}`, rightColumnX, appointmentsY + 10);
        doc.text(`Hospital: ${hospitalName}`, rightColumnX, appointmentsY + 20);
        doc.text(
          `Date: ${new Date(appointment.date).toLocaleDateString()}`,
          rightColumnX,
          appointmentsY + 30
        );
        doc.text(
          `Status: ${appointment.status}`,
          rightColumnX,
          appointmentsY + 40
        );

        appointmentsY += 50;
        maxYPosition = Math.max(postsY, appointmentsY);
      });
    } else {
      doc.setFontSize(12);
      doc.text('No appointments available.', rightColumnX, appointmentsY);
      appointmentsY += 10;
    }

    yPosition = maxYPosition;

    doc.save(`${this.user?.firstName}-${this.user?.lastName}-profile.pdf`);
  }

  getResult(poll: Poll): string {
    let answers = poll.answer.split(',').map(String);
    this.answers = answers;

    const words = answers.join(' ').toLowerCase().split(' ');

    const frequency: Record<string, number> = {};

    words.forEach((word) => {
      if (word in frequency) {
        frequency[word]++;
      } else {
        frequency[word] = 1;
      }
    });

    const wordFrequency = Object.entries(frequency);

    wordFrequency.sort((a, b) => b[1] - a[1]);

    const mostFrequentFrequency = wordFrequency[0][1];

    const mostFrequentWords = wordFrequency
      .filter(([word, frequency]) => frequency === mostFrequentFrequency)
      .map(([word, frequency]) => word);

    if (mostFrequentWords.length > 0) {
      return mostFrequentWords.join(',');
    } else {
      return '';
    }
  }

  toggleExpanded() {
    this.isExpanded = !this.isExpanded;
  }
  getDoctorName(idDoctor: string): string {
    const doctor = this.doctors.find((user) => user.id === idDoctor);
    return doctor ? `${doctor.firstName} ${doctor.lastName}` : 'Unknown Doctor';
  }
  getMarkerName(idMarker: string): string {
    const marker = this.markers.find((marker) => marker.id === idMarker);
    return marker ? `${marker.name}` : 'Unknown hospital';
  }
  patientFile() {
    this.route.navigate(['admin/patient-file', this.user?.id]);
  }
}
