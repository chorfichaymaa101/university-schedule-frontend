import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamTableEditComponent } from './exam-table-edit.component';

describe('ExamTableEditComponent', () => {
  let component: ExamTableEditComponent;
  let fixture: ComponentFixture<ExamTableEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExamTableEditComponent]
    });
    fixture = TestBed.createComponent(ExamTableEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
