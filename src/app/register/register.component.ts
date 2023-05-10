import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UserService } from '../modules/admin/shared/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form: any = {
    username: null,
    email: null,
    password: null,
    firstName: null,
    lastName: null,
    role: null,
    profilePicture: null,
    domain: null,
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  profilePic: any;
  profilePicture: File | undefined;
  profileImage: SafeUrl | undefined;
  roles: string[] | undefined = ['DOCTOR', 'PATIENT'];
  domains: string[] | undefined = [
    'DERMATOLOGIE',
    'GINECOLOGIE',
    'PEDIATRIE',
    'GERIATRIE',
    'UROLOGIE',
    'CHIRURGIE',
    'FIZIOLOGIE',
    'CARDIOLOGIE',
    'BOLI INFECTIOASE',
    'ALERGOLOGIE',
  ];

  constructor(
    private userService: UserService,
    private router: Router,
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {}
  createProfileImage(image: Blob): void {
    const objectURL = 'data:image/png;base64,' + image;
    this.profileImage = this.sanitizer.bypassSecurityTrustUrl(objectURL);
  }

  onSubmit(): void {
    const { username, email, password } = this.form;
    this.userService
      .addUser({
        username: this.form.username,
        firstName: this.form.firstName,
        lastName: this.form.lastName,
        password: this.form.password,
        email: this.form.email,
        role: this.form.role,
        profilePicture: this.profilePicture!,
        domain: this.form.domain,
      })
      .subscribe(() => {
        this.router.navigate(['/login']);
      });
  }
  onFileChanged(event: any) {
    const file = event.target.files[0];

    this.profilePicture = file;
    let reader = new FileReader();
    reader.readAsDataURL(this.profilePicture!);
    reader.onload = () => {
      if (reader.result != null) {
        this.profilePic = reader.result;
      }
    };
  }
  goBack() {
    this.router.navigate(['/login']);
  }
}
