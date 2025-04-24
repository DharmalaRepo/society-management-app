import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocietyDialogComponent } from './society-dialog.component';

describe('SocietyDialogComponent', () => {
  let component: SocietyDialogComponent;
  let fixture: ComponentFixture<SocietyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SocietyDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocietyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
