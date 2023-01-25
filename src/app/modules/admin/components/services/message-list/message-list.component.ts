import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/login/models/login.model';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css'],
})
export class MessageListComponent implements OnInit {
  @Input() data?: User[] | null;

  constructor() {}

  ngOnInit() {}

  @Output() selectedEmployeeChanged = new EventEmitter<User>();
  @Input() employeesSubject = new BehaviorSubject<User[]>([]);
  selectedEmployee?: User;

  selectEmployee(employee: User): void {
    this.selectedEmployee = employee;
    this.selectedEmployeeChanged.emit(this.selectedEmployee);
  }
}
