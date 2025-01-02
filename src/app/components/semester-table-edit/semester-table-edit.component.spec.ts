import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SemesterTableEditComponent } from './semester-table-edit.component';

describe('SemesterTableEditComponent', () => {
  let component: SemesterTableEditComponent;
  let fixture: ComponentFixture<SemesterTableEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SemesterTableEditComponent]
    });
    fixture = TestBed.createComponent(SemesterTableEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
