import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/models/login.model';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  @Input() users: User[] | undefined;
  filteredUsers:User[]|undefined
  @Output() savedChanges = new EventEmitter<User[]>();
  showModal: boolean = false;
  form: any = {
    domain: null,
  };

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
  ngOnInit() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
  onFilterUsers() {
    this.filteredUsers = this.users?.filter((user) => {
      if (user && user.domain?.toString() === this.form.domain.toString()) return user;
      else return undefined
    });
    this.savedChanges.emit(this.filteredUsers)
    this.closeModal()
  }
}
