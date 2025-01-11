import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfModifierSeanceComponent } from './prof-modifier-seance.component';

describe('ProfModifierSeanceComponent', () => {
  let component: ProfModifierSeanceComponent;
  let fixture: ComponentFixture<ProfModifierSeanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfModifierSeanceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfModifierSeanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
