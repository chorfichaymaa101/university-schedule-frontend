import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsStudentComponent } from './notifications-student.component';

describe('NotificationsStudentComponent', () => {
  let component: NotificationsStudentComponent;
  let fixture: ComponentFixture<NotificationsStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationsStudentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotificationsStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
