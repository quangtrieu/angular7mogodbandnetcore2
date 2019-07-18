import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeChangepasswordComponent } from './employee-changepassword.component';

describe('EmployeeChangepasswordComponent', () => {
  let component: EmployeeChangepasswordComponent;
  let fixture: ComponentFixture<EmployeeChangepasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeChangepasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeChangepasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
