import { Pipe, PipeTransform } from '@angular/core';
import { UserService } from './services/user.service';

@Pipe({
  name: 'doctorName',
  pure: false // Make it impure so it updates when data changes
})
export class DoctorNamePipe implements PipeTransform {
  doctors: any[] = [];

  constructor(private userService: UserService) {
    this.userService.getUsers().subscribe((data) => {
      this.doctors = data.filter(user => user.role === 'DOCTOR');
    });
  }

  transform(doctorId: string): string {
    const doctor = this.doctors.find(user => user.id === doctorId);
    return doctor ? `${doctor.firstName} ${doctor.lastName}` : 'Unknown Doctor';
  }
}
