/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ModalForAppointmentWithoutHospitalComponent } from './modal-for-appointment-without-hospital.component';

describe('ModalForAppointmentWithoutHospitalComponent', () => {
  let component: ModalForAppointmentWithoutHospitalComponent;
  let fixture: ComponentFixture<ModalForAppointmentWithoutHospitalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalForAppointmentWithoutHospitalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalForAppointmentWithoutHospitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
