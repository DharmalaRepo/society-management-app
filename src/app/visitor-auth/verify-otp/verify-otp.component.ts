import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { VisitorAuthService } from 'src/app/core/services/visitor-auth/visitor-auth.service';
import { OtpVerificationRequest } from 'src/app/core/models/visitor-auth/otp-verification-request.model';

@Component({
  selector: 'app-verify-otp',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './verify-otp.component.html'
})
export class VerifyOtpComponent {
  private fb = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);
  private visitorService = inject(VisitorAuthService);

  form: FormGroup = this.fb.group({
    otp: ['', Validators.required],
    entryGate: ['', Validators.required]
  });

  verifying = false;

  verifyOtp() {
    if (this.form.invalid) return;

    const payload: OtpVerificationRequest = this.form.value;
    this.verifying = true;

    this.visitorService.verifyOtp(payload).subscribe(
      (success: boolean) => {
        this.verifying = false;
        if (success) {
          this.snackBar.open('OTP Verified. Visitor Checked-in.', 'Close', { duration: 3000 });
          this.form.reset();
        } else {
          this.snackBar.open('Invalid OTP or Already Used.', 'Close', { duration: 3000 });
        }
      },
      (error) => {
        this.verifying = false;
        console.error('OTP verification error:', error);
        this.snackBar.open('Verification failed. Try again.', 'Close', { duration: 3000 });
      }
    );
  }
}
