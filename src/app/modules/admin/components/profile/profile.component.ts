import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { map } from 'rxjs';
import { User } from 'src/app/models/login.model';
import { LoginService } from 'src/app/modules/admin/shared/services/login.service';
import { UserService } from 'src/app/modules/admin/shared/services/user.service';
import { environment } from 'src/environments/environment';
import { FavoriteDoctorsService } from '../../shared/services/favorite-doctors.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  users: User[] | undefined;
  username?: string;
  loggedUser?: User;
  profilePicture?: any;
  profilePic: any;
  profileImage: SafeUrl | undefined;
  doctors: User[] = [];
  constructor(
    private http: HttpClient,
    private loginService: LoginService,
    private userService: UserService,
    private sanitizer: DomSanitizer,
    private favoriteDoctorsService: FavoriteDoctorsService
  ) {}

  async ngOnInit() {
    this.users = await this.http
      .get<User[]>(`${environment.apiUrl}/user`)
      .pipe(
        map((responseData) => {
          return responseData;
        })
      )
      .toPromise();
    this.setUser();
    let storedUser = JSON.parse(localStorage.getItem('userData')!);
    this.username = storedUser.userDetails.username;

    this.loggedUser = this.users?.find(
      (employee) => employee.username === this.username
    );
    this.name = this.users?.find(
      (employee) => employee.username === this.username
    )?.firstName;

    this.profilePicture = this.loggedUser?.profilePicture;

    this.createProfileImage(this.loggedUser?.profilePicture!);

    this.getFavDocs();
  }
  getFavDocs() {
    this.favoriteDoctorsService.getFavoriteDoctors().subscribe((data) => {
      let favDoc;
      favDoc = data.find((favDoc) => {
        if (favDoc.idPatient.toString() === this.loggedUser?.id?.toString()) {
          return favDoc;
        } else return undefined;
      });
      if (favDoc) {
        let doctorsArray = favDoc.doctors.split(',').map(String);
        doctorsArray?.forEach((doctor) => {
          if (doctor !== '') {
            let foundDoctor = this.users?.find(
              (employee) => employee.id?.toString() === doctor.toString()
            );

            this.doctors?.push(foundDoctor!);
          }
        });
      }
    });
  }

  name: string | undefined;
  email = '';

  updateProfile() {
    // code to update the user's information
  }
  uploadFile(event: any) {
    const file = event.target.files[0];
    this.profilePic = file;
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
  onCancel(id: string) {
    this.removeFavorites(id);
  }
  removeFavorites(doctorId: string) {
    this.favoriteDoctorsService.getFavoriteDoctors().subscribe((data) => {
      let favDoc;
      favDoc = data.find((favDoc) => {
        if (favDoc.idPatient.toString() === this.loggedUser!.id!.toString()) {
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
          .subscribe(() => {
            this.doctors = [];
            this.getFavDocs();
          });
      }
    });
  }
}
