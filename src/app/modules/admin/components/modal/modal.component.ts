import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { User } from 'src/app/models/login.model';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit,OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    if(this.showModal2){
      this.showModal = this.showModal2
    }
  }
  @Input() users: User[] | undefined;
  filteredUsers:User[]|undefined
  @Output() savedChanges = new EventEmitter<User[]>();
  showModal: boolean = false;
  @Input() showModal2:boolean|undefined
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
    // this.showModal = true;
    const hasShownModal = localStorage.getItem('hasShownModal');

    if (hasShownModal==='false') {
      this.showModal = true;

      localStorage.setItem('hasShownModal', 'true');
  }
  
  
}

  closeModal() {
    this.showModal = false;
    this.showModal2 = false;
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
