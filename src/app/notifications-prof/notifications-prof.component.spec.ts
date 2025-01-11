import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsProfComponent } from './notifications-prof.component';

describe('NotificationsProfComponent', () => {
  let component: NotificationsProfComponent;
  let fixture: ComponentFixture<NotificationsProfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationsProfComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotificationsProfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
