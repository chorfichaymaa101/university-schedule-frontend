import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SemesterTableComponent } from './semester-table.component';

describe('SemesterTableComponent', () => {
  let component: SemesterTableComponent;
  let fixture: ComponentFixture<SemesterTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SemesterTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SemesterTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
