import { Component, EventEmitter, HostListener, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/login.model';



@Component({
  selector: 'app-doctors-detail',
  templateUrl: './doctors-detail.component.html',
  styleUrls: ['./doctors-detail.component.css']
})
export class DoctorsDetailComponent implements OnInit, OnChanges, OnDestroy{


  @Input() selectedUser?: User | null;
  @Output() savedChanges = new EventEmitter<boolean>();
  mode?: 'ADD' | 'EDIT';
  form?: FormGroup;
  private readonly subscription = new Subscription();
  private updateSubscription = new Subscription();

  constructor(

    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    // this.subscription.add(
    //   this.service.getTeams().subscribe(data => {
    //     this.teams = data;

    //     this.teamList = this.teams.map(item => {
    //       return {
    //         value: item.id,
    //         label: item.name,
    //       };
    //     });
    //   })
    // );

    // this.subscription.add(
    //   this.form?.controls.role.valueChanges.subscribe(val => {
    //     if (val === 'HR') {
    //       const teamId = this.teamList?.find(team => team.label === val);
    //       this.form?.controls.teamId.setValue(teamId?.value);
    //       this.form?.controls.teamId.disable();
    //     } else {
    //       this.form?.controls.teamId.enable();
    //     }
    //   })
    // );
  }
  private initFormGroup(): void {
    this.form = this.formBuilder.group({
      firstName: this.formBuilder.control('', [

      ]),
      lastName: this.formBuilder.control('', [

      ]),
      username: this.formBuilder.control('', [

      ]),
      email: this.formBuilder.control('', [

      ]),
      role: this.formBuilder.control(''),
    
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedUser']) {
      if (changes['selectedUser'].firstChange) {
        this.initFormGroup();
      }
      this.handleNewSelectedEmployee();
      this.form?.disable();
      this.mode = this.selectedUser ? 'EDIT' : 'ADD';
      if (this.mode === 'EDIT') {
        this.form?.disable();
      }
      if (this.mode === 'ADD') {
        this.form?.enable();
        this.form?.get('totalVacationDays')?.disable();
        this.form?.get('contractStartDate')?.disable();
      }
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.updateSubscription?.unsubscribe();
  }

  @HostListener('window:beforeunload')
  canDeactivate(): boolean {
    return !this.form?.dirty;
  }

  onClear(): void {
    this.form?.reset();
    this.savedChanges.emit(false);
  }

  onEditModeOn() {
    this.form?.enable();
  }

  private handleNewSelectedEmployee(): void {
    if (this.selectedUser) {
      this.form?.patchValue({
        ...this.selectedUser
      });
     
    } else {
      this.form?.reset();
    }
  }
  onSendMessage() {
    
    }
    openModal() {
      
    }


  

}
