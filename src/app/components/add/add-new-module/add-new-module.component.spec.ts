import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewModuleComponent } from './add-new-module.component';

describe('AddNewModuleComponent', () => {
  let component: AddNewModuleComponent;
  let fixture: ComponentFixture<AddNewModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNewModuleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddNewModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
