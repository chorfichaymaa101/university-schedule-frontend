import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionClassComponent } from './gestion-class.component';

describe('GestionClassComponent', () => {
  let component: GestionClassComponent;
  let fixture: ComponentFixture<GestionClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionClassComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GestionClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
