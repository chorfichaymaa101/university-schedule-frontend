import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueNotifsAdminComponent } from './historique-notifs-admin.component';

describe('HistoriqueNotifsAdminComponent', () => {
  let component: HistoriqueNotifsAdminComponent;
  let fixture: ComponentFixture<HistoriqueNotifsAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoriqueNotifsAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistoriqueNotifsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
