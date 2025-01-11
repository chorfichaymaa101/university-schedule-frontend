import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsHeaderComponent } from './notifications-header.component';

describe('NotificationsHeaderComponent', () => {
  let component: NotificationsHeaderComponent;
  let fixture: ComponentFixture<NotificationsHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationsHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotificationsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
