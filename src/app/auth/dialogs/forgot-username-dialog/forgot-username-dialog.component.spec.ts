import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotUsernameDialogComponent } from './forgot-username-dialog.component';

describe('ForgotUsernameDialogComponent', () => {
  let component: ForgotUsernameDialogComponent;
  let fixture: ComponentFixture<ForgotUsernameDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForgotUsernameDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgotUsernameDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
