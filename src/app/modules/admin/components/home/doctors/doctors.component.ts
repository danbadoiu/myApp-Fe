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
import { User } from 'src/app/models/login.model';
import { UserService } from 'src/app/modules/admin/shared/services/user.service';
import { FavoriteDoctors } from '../../../shared/models/favorite-doctors.model';
import { FavoriteDoctorsService } from '../../../shared/services/favorite-doctors.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css'],
})
export class DoctorsComponent implements OnInit {
  message: any;
  isHovered = false;
  exists=false;

  @Input() user: User | undefined;
  users: User[] | undefined;
  username?: string;
  loggedUser?: User;
  idLoggedUser: string | undefined;
  @ViewChild('formRef') myForm: any;
  picture: File | undefined;
  userId: string | undefined;
  @Output() sendMessage = new EventEmitter<User>();

  profileImage: SafeUrl | undefined;
  constructor(
    private userService: UserService,
    private sanitizer: DomSanitizer,
    private route: Router,
    private favoriteDoctorsService: FavoriteDoctorsService
  ) {}

  ngOnInit(): void {
    this.userId = this.user?.id;
    this.createProfileImage(this.user?.profilePicture!);
    let storedUser = JSON.parse(localStorage.getItem('userData')!);
    this.idLoggedUser = storedUser.userDetails.id;
    this.favoriteDoctorsService.getFavoriteDoctors().subscribe((data) => {
      let favDoc = data.find((favDoc) => {
        if (favDoc.idPatient.toString() === this.idLoggedUser?.toString()) {
          return favDoc;
        } else return undefined;
      });
      if(favDoc!==undefined){
        let doctorsArray = favDoc.doctors.split(',').map(String);
        let doctor = doctorsArray.find(
          (doctor) => doctor.toString() === this.user?.id!.toString()
        );
        if(doctor){
          this.exists = true
        }

       
      }
      
    });
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

  onSendMessage() {
    this.sendMessage.emit(this.user);
    this.route.navigate(['admin/messages']);
  }
  addToFavorites() {
    let exists = false;
    let favDoctor: FavoriteDoctors | undefined;
    this.favoriteDoctorsService.getFavoriteDoctors().subscribe((data) => {
      let favDoc;
      favDoc = data.find((favDoc) => {
        if (favDoc.idPatient.toString() === this.idLoggedUser?.toString()) {
          return favDoc;
        } else return undefined;
      });
      console.log(favDoc);
      if (favDoc) {
        this.favoriteDoctorsService
          .updateFavoriteDoctors(favDoc!.id!, {
            idPatient: favDoc?.idPatient!,
            doctors: favDoc?.doctors! + ',' + this.user?.id,
          })
          .subscribe(() => this.exists=true);
      } else {
        this.favoriteDoctorsService
          .addFavoriteDoctors({
            idPatient: this.idLoggedUser!,
            doctors: this.user?.id!,
          })
          .subscribe(() => {});
      }
    });
  }
  removeFavorites(doctorId: string) {
    // let exists = false;
    // let favDoctor: FavoriteDoctors | undefined;
    this.favoriteDoctorsService.getFavoriteDoctors().subscribe((data) => {
      let favDoc;
      favDoc = data.find((favDoc) => {
        if (favDoc.idPatient.toString() === this.idLoggedUser?.toString()) {
          return favDoc;
        } else return undefined;
      });
      if (favDoc) {
        let doctorsArray = favDoc.doctors.split(',').map(String);
        doctorsArray = doctorsArray.filter(
          (doctor) => doctor.toString() !== doctorId.toString()
        );

        this.favoriteDoctorsService
          .updateFavoriteDoctors(favDoc!.id!, {
            idPatient: favDoc?.idPatient!,
            doctors: doctorsArray!.toString(),
          })
          .subscribe(() => this.exists = false);
      }
    });
  }
}
