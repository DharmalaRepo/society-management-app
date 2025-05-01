import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmStatusDialogComponent } from './confirm-status-dialog.component';

describe('ConfirmStatusDialogComponent', () => {
  let component: ConfirmStatusDialogComponent;
  let fixture: ComponentFixture<ConfirmStatusDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmStatusDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmStatusDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
