import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionProgramComponent } from './gestion-program.component';

describe('GestionProgramComponent', () => {
  let component: GestionProgramComponent;
  let fixture: ComponentFixture<GestionProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionProgramComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GestionProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
